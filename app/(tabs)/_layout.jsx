import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

const DashBoardLayout = () => {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Tabs 
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90,
          },
          tabBarActiveTintColor: theme.iconColorFocused,
          tabBarInactiveTintColor: theme.iconColor,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Refine", tabBarIcon: ({ color, focused }) => <Entypo size={24} name={focused ? "text-document-inverted" : "text-document"} color={color} /> }} />
        <Tabs.Screen name="history" options={{ title: "History", tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? "time" : "time-outline"} color={color} /> }} />
        <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? "person" : "person-outline"} color={color} /> }} />
      </Tabs>
  );
}
export default DashBoardLayout;