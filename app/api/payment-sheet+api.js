import stripe from "../../stripe-server";

export async function POST(req) {
    const { amount } = await req.json();
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2024-11-20.acacia" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    return Response.json({
        customer: customer.id,
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    });
}