import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedLoader from "../../components/ThemedLoader";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedView from "../../components/ThemedView";
import { useUser } from "../../hooks/useUser";
import GoogleLoginWithReact from "./googleLoginWithReact";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Access the user context
  const { user, login } = useUser();

  const handleSubmit = async () => {
    setError(null); // Reset error state
    setIsLoading(true);
    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    try {
      await login(email, password);
      router.replace("/home");
      setIsLoading(false);
    } catch (error) {
      console.log("Login error:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    router.replace("/googleLoginWithReact");
  };

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  if (isLoading) {
    return <ThemedLoader />;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Welcome Back!
        </ThemedText>

        <ThemedText style={styles.text}>
          Sign in to continue
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

        <ThemedButton onPress={handleSubmit} style={styles.btn}>
          <Text style={{ color: "white" }}>Login with Email & Password</Text>
        </ThemedButton>

        <GoogleLoginWithReact />

        <Spacer size={10} />
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
        <Spacer size={10} />

        <Link href="/register" replace>
          <ThemedText style={styles.text}>Register Instead</ThemedText>
        </Link>

      </ThemedView>
    </TouchableWithoutFeedback>
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
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    height: 60,
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
