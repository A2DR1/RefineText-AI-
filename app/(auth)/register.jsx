import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedView from "../../components/ThemedView";
import { Colors } from "../../constants/Colors";
import { useUser } from "../../hooks/useUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { user, register } = useUser();

  const handleSubmit = async () => {
    // Handle register logic here
    setError(null); // Reset error state
    try {
      await register(email, password);
    } catch (error) {
      console.log("Registration error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to history");
      router.replace("/history");
    } else {
      console.log("No user logged in, showing register form");
    }
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Create Your Account
        </ThemedText>

      <ThemedTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        style={styles.textinput}
        keyboardType="email-address"

      />

      <ThemedTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
        style={styles.textinput}
      />

      <ThemedTextInput
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        placeholder="Confirm Your Password"
        secureTextEntry
        style={styles.textinput}
      />

      <ThemedButton onPress={handleSubmit}>
        <Text style={{ color: "white" }}>Register</Text>
      </ThemedButton>

        <Spacer size={10} />
        {error && (
          <ThemedText style={{ color: "red" }}>{error}</ThemedText>
        )}
        <Spacer size={10} />

      <Link href="/login" replace>
        <ThemedText style={styles.text}>Login Instead</ThemedText>
      </Link>

      <ThemedButton
          onPress={() => router.replace("/history")}
        >
          <Text style={{ color: "white" }}>Stay not signed in</Text>
        </ThemedButton>
    </ThemedView>
    </TouchableWithoutFeedback>
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
  textinput: {
    fontSize: 16,
    marginTop: 20,
    width: "80%",
    height: 60,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
