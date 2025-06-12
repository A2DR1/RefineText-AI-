import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";

const Result = () => {
    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title} title={true}>Result</ThemedText>
            <ThemedText style={styles.text}>This is the Result page.</ThemedText>
            
        </ThemedView>
    );
}
export default Result;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
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
});