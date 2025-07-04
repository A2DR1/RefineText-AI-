// app/api/create-subscription.js
import stripe from "../../stripe-server";

export async function POST(req) {
    const { email, priceId, uid } = await req.json();

    console.log("uid at create-subscription:", uid);

    // Try to find an existing customer by email
    // const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    // let customer;
    // if (existingCustomers.data.length > 0) {
    //     customer = existingCustomers.data[0];
    // } else {
        const customer = await stripe.customers.create({ email, metadata: { uid: uid } });
    // }

    // console.log("Created customer metadata:", customer.metadata);

    // 2. Create subscription
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: "default_incomplete",
        expand: ["latest_invoice.payment_intent"],
    });

    // 3. Create ephemeral key
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: "2024-06-20" }
    );

    // 4. Get PaymentIntent from the subscription's latest invoice
    const paymentIntent = subscription.latest_invoice.payment_intent;

    return Response.json({
        customer: customer.id,
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        publishableKey: process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        subscriptionId: subscription.id,
    });
}