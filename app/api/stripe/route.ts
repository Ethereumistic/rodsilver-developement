import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { ProductType } from '@/types/product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
});

interface CartItem extends ProductType {
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const cartItems: CartItem[] = await request.json();

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1Pxv4bKi7q0TSYq3eGt0oaKP' },
        { shipping_rate: 'shr_1Pxv9gKi7q0TSYq3JlTo3uMP' },
      ],
      shipping_address_collection: {
        allowed_countries: ['BG'], // Add other countries if needed
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/kxlmj7gw/production/').replace('-webp', '.webp');

        return {
          price_data: { 
            currency: 'bgn',
            product_data: { 
              name: item.name,
              images: [newImage],
            },
            unit_amount: Math.round(item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity
        }
      }),
      success_url: `${request.headers.get('origin')}/success`,
      cancel_url: `${request.headers.get('origin')}/canceled`,
    }

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json(session, { status: 200 });
  } catch (err) {
    if (err instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ message: err.message }, { status: err.statusCode || 500 });
    } else {
      return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}