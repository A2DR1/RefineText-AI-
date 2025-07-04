import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedLoader from "../../components/ThemedLoader"; // Import ThemedLoader
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedView from "../../components/ThemedView";
import { useUser } from "../../hooks/useUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const { user, register } = useUser();

  const handleSubmit = async () => {
    setError(null); // Reset error state
    setIsLoading(true); // Set loading state to true
    try {
      if (!email || !password || !confirmPassword) {
        setError("Please fill in all fields");
        setIsLoading(false); // Reset loading state
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false); // Reset loading state
        return;
      }
      await register(email, password);
      setIsLoading(false);
      router.replace("/home");
    } catch (error) {
      console.log("Registration error:", error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to home");
      router.replace("/home");
    } else {
      console.log("No user logged in, showing register form");
    }
  }, [user]);

  if (isLoading) {
    return <ThemedLoader />; // Show loader when loading
  }

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

      <ThemedButton onPress={handleSubmit} style={styles.btn}>
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
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 30,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",  
    width: "80%",
    height: 50,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.8,
  },
});
