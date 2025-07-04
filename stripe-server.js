import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
    appInfo: {
        name: "RefineText AI",
        version: "1.0.0",
    },
});

export default stripe;