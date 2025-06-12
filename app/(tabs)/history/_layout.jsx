import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="index" options={{ title: "History" }} />
            <Stack.Screen name="result" options={{ title: "Result" }} />
        </Stack>
    );
}