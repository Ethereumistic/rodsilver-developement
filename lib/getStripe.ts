import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    if (!key) {
      throw new Error('Stripe publishable key is not set');
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripe;