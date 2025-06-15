import { ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import ThemedView from "./ThemedView";

const ThemedLoader = () => {

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;
    
    return (
        <ThemedView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
        }}>
            <ActivityIndicator
                size="large"
                color={theme.text}
                style={{ justifyContent: "center", alignItems: "center" }}
            />
        </ThemedView>
    );
};

export default ThemedLoader;