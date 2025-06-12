import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";

const Profile = () => {
    return (
        <ThemedView safe={true} style={styles.container}>
            <ThemedText style={styles.title} title={true}>Profile</ThemedText>
            <ThemedText style={styles.text}>This is the profile page.</ThemedText>
            <Link href="/login" style={styles.link}>
                <ThemedText>Login to view your profile</ThemedText>
            </Link>
        </ThemedView>
    );
}
export default Profile;
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