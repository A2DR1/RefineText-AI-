import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="index" options={{ title: "Create New Texts" }} />
            <Stack.Screen name="result" options={{ title: "Result" }} />
        </Stack>
    );
}