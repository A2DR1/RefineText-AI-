import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import { StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import ThemedButton from "../../components/ThemedButton";

const Register = () => {

  const handleSubmit = () => {
    // Handle register logic here
    console.log("Register button pressed");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Register
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "white" }}>Register</Text>
      </ThemedButton>

      <Spacer height={100} />
      <Link href="/login">
        <ThemedText style={styles.text}>Login Instead</ThemedText>
      </Link>
    </ThemedView>
  );
};
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
// This code defines a simple registration page for a React Native application using Expo Router.
