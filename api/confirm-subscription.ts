import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { db } from "./_lib/firebase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const TIER_PRICES: Record<string, number> = {
  lite: 9,
  plus: 19,
  pro: 29,
};

const TRIAL_TIERS: Record<string, boolean> = {
  lite: true,
  plus: true,
  pro: false,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { sessionId, tier, userId } = req.body || {};

    if (!sessionId || !tier || !userId) {
      return res.status(400).json({ error: "Missing required fields: sessionId, tier, userId" });
    }

    if (typeof userId === "string" && (userId.includes("/") || userId.includes("\\"))) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // Retrieve and verify the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid" && !session.subscription) {
      // For trial subscriptions, payment_status may be "no_payment_required"
      if (session.payment_status !== "no_payment_required") {
        return res.status(400).json({ error: "Payment not completed" });
      }
    }

    // Verify userId matches session metadata
    if (session.metadata?.userId !== userId) {
      return res.status(403).json({ error: "User mismatch" });
    }

    const now = new Date();
    const renewsAt = new Date(now);
    renewsAt.setMonth(renewsAt.getMonth() + 1);

    const coachSubscription: Record<string, any> = {
      tier,
      status: "active",
      startedAt: now.toISOString(),
      renewsAt: renewsAt.toISOString(),
      stripeSessionId: sessionId,
      price: TIER_PRICES[tier] || 0,
    };

    if (TRIAL_TIERS[tier]) {
      const trialEndsAt = new Date(now);
      trialEndsAt.setDate(trialEndsAt.getDate() + 30);
      coachSubscription.trialEndsAt = trialEndsAt.toISOString();
    }

    // Write subscription to user document
    await db.collection("users").doc(userId).set(
      { coachSubscription },
      { merge: true }
    );

    // Update checkout status
    await db.collection("coachCheckouts").doc(sessionId).update({
      status: "completed",
      completedAt: now.toISOString(),
    });

    return res.status(200).json({
      success: true,
      email: session.customer_email || null,
    });
  } catch (err: any) {
    console.error("confirm-subscription error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
