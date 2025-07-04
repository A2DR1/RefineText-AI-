import { Stack } from "expo-router";
import MyStripeProvider from "../../../components/stripe-provider";

export default function Layout() {
  return (

    <MyStripeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
      }}
    >
        <Stack.Screen name="index" options={{ title: "Profile" }} />
      </Stack>
    </MyStripeProvider>
  );
}
