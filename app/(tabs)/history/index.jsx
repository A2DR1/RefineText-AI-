import { StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../../constants/Colors";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";

const History = () => {

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light;

    return (
        <ThemedView safe={true} style={[styles.container, { backgroundColor: theme.background }]}>
            <ThemedText style={[styles.title, {}]} title={true}>History</ThemedText>
            <ThemedText style={styles.text}>This is the history page.</ThemedText>
            <Link href="/login" style={styles.link}>
                <ThemedText>Login to view your history</ThemedText>
            </Link>
        </ThemedView>
    );
}
export default History;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        margin: 10,
    },
    text: {
        fontSize: 20,
        margin: 10,
    },
    link: {
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    }
});