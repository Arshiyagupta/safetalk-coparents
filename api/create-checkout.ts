import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { db } from "./_lib/firebase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const TIER_PRICES: Record<string, string | undefined> = {
  lite: process.env.STRIPE_PRICE_LITE,
  plus: process.env.STRIPE_PRICE_PLUS,
  pro: process.env.STRIPE_PRICE_PRO,
};

const TRIAL_DAYS: Record<string, number> = {
  lite: 30,
  plus: 30,
  pro: 0,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { tier, email, userId, checkoutId, consent } = req.body || {};

    if (!tier || !email || !userId) {
      return res.status(400).json({ error: "Missing required fields: tier, email, userId" });
    }

    if (typeof userId === "string" && (userId.includes("/") || userId.includes("\\"))) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const priceId = TIER_PRICES[tier];
    if (!priceId) {
      return res.status(400).json({ error: "Invalid tier. Must be lite, plus, or pro." });
    }

    const trialDays = TRIAL_DAYS[tier] || 0;
    const origin = `https://${req.headers.host}`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/subscribe/success?tier=${tier}&userId=${encodeURIComponent(userId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscribe?tier=${tier}&userId=${encodeURIComponent(userId)}`,
      metadata: {
        tier,
        userId,
        checkoutId: checkoutId || "",
        consent: consent ? "true" : "false",
      },
    };

    if (trialDays > 0) {
      sessionParams.subscription_data = {
        trial_period_days: trialDays,
        metadata: { tier, userId },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Save pending checkout to Firestore
    await db.collection("coachCheckouts").doc(session.id).set({
      sessionId: session.id,
      tier,
      email,
      userId,
      checkoutId: checkoutId || null,
      consent: !!consent,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("create-checkout error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
