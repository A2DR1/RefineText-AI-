import { StripeProvider } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";

export default function MyStripeProvider({ props, children }) {
  return (
    <StripeProvider 
    publishableKey= {process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
    merchantIdentifier="merchant.com.austinshen.refinetextai"
    urlScheme={Linking.createURL("/")?.split(":")[0]}
    {...props}
    >
      {children}
    </StripeProvider>
  );
}