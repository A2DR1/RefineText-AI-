import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";
import { HistoryProvider } from "../context/HistoryContext";
import { RefineProvider } from "../context/RefineContext";
import { UserProvider } from "../context/UserContext";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <HistoryProvider>
          <RefineProvider>
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
          </RefineProvider>
        </HistoryProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
