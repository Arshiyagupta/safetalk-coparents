# SafeTalk SMS Opt-In Implementation for Twilio Compliance

## 🎯 Purpose

This implementation addresses Twilio toll-free verification errors:
- **Error 30506**: Opt-ins must clearly reflect the end business
- **Error 30513**: Explicit SMS consent at point of collection

## 📸 Twilio Screenshot Requirements

When taking screenshots for Twilio verification, capture:

1. **Full viewport** showing SafeTalk branding and logo
2. **Visible consent text** next to checkbox (not hidden behind links)
3. **Checkbox states**: Both unchecked and checked states
4. **Submit button** disabled/enabled states
5. **Mobile responsive** version

### Screenshot Checklist
- ✅ SafeTalk name prominently displayed
- ✅ "SMS text messages from SafeTalk" visible in consent
- ✅ Frequency, rates, STOP/HELP all visible
- ✅ Checkbox unchecked by default
- ✅ Submit disabled until consent checked
- ✅ Terms and Privacy links functional

## 🚀 Quick Start

### Next.js App Router (Current Implementation)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit the opt-in page
open http://localhost:3000/opt-in
```

### Pages Router Adaptation

If your project uses Pages Router instead of App Router, move files as follows:

```
pages/opt-in/index.tsx          ← app/opt-in/page.tsx
pages/opt-in/success.tsx        ← app/opt-in/success/page.tsx
pages/api/opt-in.ts             ← app/api/opt-in/route.ts
pages/terms.tsx                 ← app/terms/page.tsx
pages/privacy.tsx               ← app/privacy/page.tsx
```

Update API route for Pages Router:
```typescript
// pages/api/opt-in.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Copy logic from app/api/opt-in/route.ts POST function
}
```

## 📁 File Structure

```
app/
├── opt-in/
│   ├── page.tsx                 # Main SMS opt-in form
│   └── success/
│       └── page.tsx             # Success confirmation
├── api/
│   └── opt-in/
│       └── route.ts             # Consent API endpoint
├── terms/
│   └── page.tsx                 # Terms of Service
├── privacy/
│   └── page.tsx                 # Privacy Policy
components/
├── ConsentCheckbox.tsx          # Reusable consent component
└── Input.tsx                    # Form input component
```

## 🔧 Key Features

### 1. TCPA Compliance
- **Express written consent** collected via web form
- **Exact consent copy** visible (not hidden)
- **Server-side IP tracking** for audit trail
- **Consent versioning** and timestamping

### 2. Accessibility
- Semantic HTML with proper ARIA attributes
- Label associations and focus management
- Error states with aria-live regions
- Keyboard navigation support

### 3. Validation
- **E.164 phone format** required
- **Real-time validation** with helpful errors
- **Server-side validation** for security
- **Progressive enhancement**

## 📝 Consent Copy (Verbatim)

The exact consent text that appears next to the checkbox:

> SMS Consent (SafeTalk): I agree to receive SMS text messages from SafeTalk to help organize and clarify co-parenting communication. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Terms and Privacy.

**🚨 Do not modify this text** - it's specifically crafted for Twilio compliance.

## 🔒 API Payload Structure

```typescript
{
  // Client-provided data
  name: string,
  phoneE164: string,
  email?: string,
  tzIana: string,
  userAgent: string,
  referer: string,
  consentVersion: "v1-2025-09-15",
  webFormShownCopy: "<exact consent string>",
  submittedAtUtcIso: string,

  // Server-added data
  ip: string,                    // Extracted from headers
  receivedAtUtcIso: string      // Server timestamp
}
```

## 🧪 Testing the Implementation

### Manual Testing Checklist

1. **Load `/opt-in`**
   - ✅ SafeTalk branding visible
   - ✅ Consent text fully visible
   - ✅ Checkbox unchecked by default
   - ✅ Submit button disabled

2. **Form Validation**
   - ✅ Name required (2+ chars)
   - ✅ Phone E.164 format enforced
   - ✅ Email optional but validated if provided
   - ✅ Consent checkbox required

3. **Submission Flow**
   - ✅ Form submits to `/api/opt-in`
   - ✅ Record logged to console
   - ✅ JSON file created in `/tmp`
   - ✅ Redirects to success page

4. **Success Page**
   - ✅ Confirmation message displayed
   - ✅ STOP/HELP instructions included
   - ✅ Navigation back to home

5. **Legal Pages**
   - ✅ `/terms` accessible from consent text
   - ✅ `/privacy` accessible from consent text
   - ✅ Real links (not placeholders)

### Console Output Example

```json
{
  "timestamp": "2025-09-15T14:30:00.000Z",
  "phone": "+14155551234",
  "name": "John Doe",
  "ip": "192.168.1.100",
  "consentVersion": "v1-2025-09-15",
  "userAgent": "Mozilla/5.0..."
}
```

## 🔄 Database Integration (Future)

The current implementation writes to `/tmp/sms_optins.json`. To integrate with a real database:

1. **Uncomment Supabase example** in `/app/api/opt-in/route.ts`
2. **Add environment variables**:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   ```
3. **Install Supabase client**: `npm install @supabase/supabase-js`

## 🚨 Common Issues

### Checkbox Not Working
- Ensure `ConsentCheckbox` component is properly imported
- Check that `useState` is managing checkbox state
- Verify `onChange` handler is connected

### Validation Errors
- E.164 format: Must start with `+` and contain only digits
- Name length: Minimum 2 characters required
- Email format: Standard email validation if provided

### API Errors
- Check console logs for detailed error messages
- Verify `/tmp` directory is writable (serverless functions)
- Ensure proper JSON payload structure

## 📊 Deployment

### Vercel Deployment
```bash
# Deploy to Vercel
vercel --prod

# Environment setup
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

### Other Platforms
- Ensure `/tmp` directory is available for file writes
- Configure environment variables for database integration
- Test SMS opt-in flow in production environment

## 📋 Acceptance Criteria

- [x] SafeTalk branding prominently displayed
- [x] Consent text visible without scrolling
- [x] Checkbox unchecked by default
- [x] Submit disabled until consent given
- [x] Server-side IP tracking implemented
- [x] Complete audit trail maintained
- [x] Mobile responsive design
- [x] Accessibility compliant
- [x] Real Terms/Privacy links functional

## 🎉 Success Metrics

After deployment, you should be able to:

1. **Screenshot** the opt-in page for Twilio verification
2. **Show clear business identity** (SafeTalk)
3. **Demonstrate explicit consent** collection
4. **Provide audit trail** of consent records
5. **Pass Twilio verification** for toll-free numbers

---

**Ready for Twilio verification!** 🚀