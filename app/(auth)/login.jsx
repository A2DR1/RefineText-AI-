import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { StyleSheet, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/Colors";
import ThemedButton from "../../components/ThemedButton";

const login = () => {
  const handleSubmit = () => {
    // Handle login logic here
    console.log("Login button pressed");
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Login
      </ThemedText>

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "white" }}>Login</Text>
      </ThemedButton>

      <Spacer height={100} />
      <Link href="/register">
        <ThemedText style={styles.text}>Register Instead</ThemedText>
      </Link>
    </ThemedView>
  );
};
export default login;
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
  btn: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    // width: 80,
    // height: 40,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
