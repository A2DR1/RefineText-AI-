import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { Alert, Text } from "react-native";
import ThemedButton from "./ThemedButton";

async function fetchPaymentSheetParams(amount) {
    return fetch("/api/payment-sheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
    }).then((res) => res.json());
}

export default function CheckOutFormNative({ amount }) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const initializePaymentSheet = async () => {
        const { paymentIntent, ephemeralKey, customer, publishableKey } = await fetchPaymentSheetParams(amount);

        const { error } = await initPaymentSheet({
            merchantDisplayName: "RefineText AI",
            paymentIntentClientSecret: paymentIntent,
            ephemeralKeySecret: ephemeralKey,
            customerId: customer,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+1234567890",
                address: {
                    line1: "123 Main St",
                    city: "Anytown",
                    state: "CA",
                    postal_code: "12345",
                    country: "US",
                },
            },
            returnURL: Linking.createURL("stripe-redirect"),
            applePay: {
                merchantCountryCode: "US",
            },
        });

        if (error) {
            console.error(error);
        }
        else {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            console.error(error);
        }
        else {
            Alert.alert("Payment successful");
            setLoading(false);
        }
    }

    useEffect(() => {
        initializePaymentSheet();
      }, []);

    const Pay = async () => {
        try {
            await openPaymentSheet();
            await initializePaymentSheet();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <ThemedButton
            onPress={Pay}
            disabled={!loading}
            style={({ pressed }) => [
                {
                },
                pressed && {
                    opacity: 0.8,
                },
            ]}
        >
            <Text>Check Out</Text>
        </ThemedButton>

        </>
    );
}