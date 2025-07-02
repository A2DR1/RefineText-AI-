import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
      }}
    >
      <Stack.Screen name="index" options={{ title: "History" }} />
      <Stack.Screen
        name="result"
        options={{
          title: "Result",
          headerShown: true,
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      />
    </Stack>
  );
}
