import { Stack } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../context/UserContext";
import { HistoryProvider } from "../context/HistoryContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <UserProvider>
      <HistoryProvider>
        <StatusBar value="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: theme.navBackground },
            headerTintColor: theme.title,
          }}
        >
          <Stack.Screen name="(auth)" options={{ title: "Login" }} />
          <Stack.Screen name="(tabs)" options={{ title: "Tabs" }} />
          <Stack.Screen name="index" options={{ title: "home" }} />
        </Stack>
      </HistoryProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
