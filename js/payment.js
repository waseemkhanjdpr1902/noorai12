/* ============================================================
   NoorAI — Payment Module (Razorpay)
   js/payment.js
   Test Key: rzp_test_1DP5mmOlF5G5ag
   ⚠️ Replace with live key + backend verification before launch
   ============================================================ */

const Payment = (() => {

  /* ── Plan config with Razorpay amounts ───────────────────── */
  const PLANS = {
    pro_monthly: {
      key:         'pro_monthly',
      planId:      'pro',
      name:        'NoorAI Hidayah Pro',
      description: 'Monthly subscription — Unlimited Islamic AI companion',
      amount:      39900,   // ₹399 in paise
      currency:    'INR',
      billingLabel:'₹399/month',
      type:        'subscription',
    },
    pro_annual: {
      key:         'pro_annual',
      planId:      'pro',
      name:        'NoorAI Hidayah Pro (Annual)',
      description: 'Annual subscription — Unlimited Islamic AI companion',
      amount:      309900,  // ₹3,099 in paise
      currency:    'INR',
      billingLabel:'₹3,099/year (save 35%)',
      type:        'subscription',
    },
    lifetime: {
      key:         'lifetime',
      planId:      'lifetime',
      name:        'NoorAI Barakah Lifetime',
      description: 'Lifetime access — one-time payment, no recurring charges',
      amount:      799900,  // ₹7,999 in paise
      currency:    'INR',
      billingLabel:'₹7,999 one-time',
      type:        'one_time',
    },
  };

  /* ── Check Razorpay is loaded ─────────────────────────────── */
  function isRazorpayLoaded() {
    return typeof window.Razorpay !== 'undefined';
  }

  /* ── Load Razorpay SDK dynamically ────────────────────────── */
  function loadRazorpay() {
    return new Promise((resolve, reject) => {
      if (isRazorpayLoaded()) { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload  = resolve;
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.head.appendChild(script);
    });
  }

  /* ── Main initiate payment ────────────────────────────────── */
  async function initiatePayment(planKey, buttonEl) {
    const plan = PLANS[planKey];
    if (!plan) { console.error('Unknown plan:', planKey); return; }

    const user = Auth.getCurrentUser();
    if (!user) { window.location.href = '/login'; return; }

    if (buttonEl) UI.setButtonLoading(buttonEl, true, 'Opening payment…');

    try {
      await loadRazorpay();
    } catch (err) {
      UI.Toast.error('Payment Error', 'Could not load payment gateway. Please try again.');
      if (buttonEl) UI.setButtonLoading(buttonEl, false);
      return;
    }

    const options = {
      key:      CONFIG.RAZORPAY_KEY,
      amount:   plan.amount,
      currency: plan.currency,
      name:     'NoorAI',
      description: plan.description,

      // Brand logo (SVG data URI — replace with real URL)
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgZmlsbD0iIzA4MGQxYSIvPjx0ZXh0IHg9IjQwIiB5PSI1MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2M5YTIyNyIgZm9udC1zaXplPSIzNiIgZm9udC1mYW1pbHk9InNlcmlmIj7Yhzwvc3ZnPg==',

      prefill: {
        name:    user.name,
        email:   user.email,
        contact: user.phone || '',
      },

      notes: {
        userId:  user.id,
        planKey: planKey,
        planId:  plan.planId,
      },

      theme: {
        color:           '#c9a227',
        hide_topbar:     false,
        backdrop_color:  '#080d1a',
      },

      modal: {
        confirm_close: true,
        animation:     true,
        ondismiss: () => {
          if (buttonEl) UI.setButtonLoading(buttonEl, false);
          UI.Toast.warning('Payment Cancelled', 'Your payment was not completed.');
        },
      },

      handler: (response) => {
        handlePaymentSuccess(response, plan, buttonEl);
      },
    };

    const rzp = new Razorpay(options);

    rzp.on('payment.failed', (response) => {
      if (buttonEl) UI.setButtonLoading(buttonEl, false);
      console.error('Payment failed:', response.error);
      UI.Toast.error(
        'Payment Failed',
        response.error?.description || 'Payment could not be processed. Please try again.'
      );
      // Track failed payment
      logPaymentEvent('failed', plan, response.error);
    });

    if (buttonEl) UI.setButtonLoading(buttonEl, false);
    rzp.open();
  }

  /* ── Handle successful payment ────────────────────────────── */
  async function handlePaymentSuccess(response, plan, buttonEl) {
    console.log('Payment Success:', response);

    // IMPORTANT: In production, verify payment on your backend:
    // POST /api/verify-payment { razorpay_payment_id, razorpay_order_id, razorpay_signature }
    // Only update plan AFTER backend verification

    // For demo: update plan directly in localStorage
    Auth.updatePlan(plan.planId);

    // Store payment record
    storePaymentRecord(response, plan);

    // Update UI
    if (buttonEl) {
      buttonEl.innerHTML = '✓ Payment Successful';
      buttonEl.disabled  = true;
      setTimeout(() => UI.setButtonLoading(buttonEl, false), 3000);
    }

    UI.Toast.success(
      'JazakAllah Khair! 🌟',
      `Your ${plan.name} subscription is now active. Payment ID: ${response.razorpay_payment_id.substring(0,16)}…`
    );

    logPaymentEvent('success', plan, response);

    // Redirect to dashboard after delay
    setTimeout(() => {
      window.location.href = '/dashboard?subscribed=1';
    }, 2500);
  }

  /* ── Store payment record ─────────────────────────────────── */
  function storePaymentRecord(response, plan) {
    const records = JSON.parse(localStorage.getItem('noorai_payments') || '[]');
    records.unshift({
      paymentId: response.razorpay_payment_id,
      planKey:   plan.key,
      planName:  plan.name,
      amount:    plan.amount,
      currency:  plan.currency,
      date:      new Date().toISOString(),
    });
    localStorage.setItem('noorai_payments', JSON.stringify(records.slice(0, 20)));
  }

  /* ── Get payment history ─────────────────────────────────── */
  function getPaymentHistory() {
    return JSON.parse(localStorage.getItem('noorai_payments') || '[]');
  }

  /* ── Log payment events (for analytics) ──────────────────── */
  function logPaymentEvent(type, plan, data) {
    console.log(`[Payment ${type}]`, { plan: plan.key, amount: plan.amount, data });
    // In production: send to your analytics (Mixpanel, Amplitude, etc.)
  }

  /* ── Check if current user has active plan ────────────────── */
  function getUserPlan() {
    const user = Auth.getCurrentUser();
    if (!user) return 'free';
    return user.plan || 'free';
  }

  function isPro() {
    const plan = getUserPlan();
    return plan === 'pro' || plan === 'lifetime';
  }

  /* ── Format amount for display ────────────────────────────── */
  function formatAmount(paise) {
    return '₹' + (paise / 100).toLocaleString('en-IN');
  }

  return {
    PLANS,
    initiatePayment,
    handlePaymentSuccess,
    getPaymentHistory,
    getUserPlan,
    isPro,
    formatAmount,
  };

})();
