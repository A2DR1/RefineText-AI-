import { Stack } from "expo-router";
import UserOnly from "../../../components/auth/UserOnly";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "History" }} />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
