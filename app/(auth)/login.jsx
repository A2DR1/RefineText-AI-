import { Ionicons } from "@expo/vector-icons";
import {
  GoogleLogoButton
} from '@react-native-google-signin/google-signin';
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import ThemedView from "../../components/ThemedView";
import { Colors } from "../../constants/Colors";
import { useUser } from "../../hooks/useUser";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Access the user context
  const { user, login, loginWithGoogle } = useUser();

  const handleSubmit = async () => {
    setError(null); // Reset error state
    // Handle login logic here
    try {
      await login(email, password);
      router.replace("/history");
    } catch (error) {
      console.log("Login error:", error);
      setError(error.message);
    }
  };

  // const { promptAsync, request } = useGoogleAuth();

  const handleGoogleLogin = async () => {
    setError(null); // Reset error state
    try {
      // await promptAsync();
      await loginWithGoogle();
      router.replace("/history");
    } catch (error) {
      console.log("Google login error:", error);
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
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

        <ThemedButton onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Login</Text>
        </ThemedButton>

        <ThemedButton onPress={handleGoogleLogin}>
          <View style={{ 
            flexDirection: "row",
            
          }}> 
          <Ionicons name="logo-google" color="white" size={15}></Ionicons> 
          <Text style={{ color: "white" }}>   Login with Google</Text>
          </View>
        </ThemedButton>

        <GoogleLogoButton onPress={handleGoogleLogin} label="Sign in with Google"/>

        <Spacer size={10} />
        {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}
        <Spacer size={10} />

        <Link href="/register" replace>
          <ThemedText style={styles.text}>Register Instead</ThemedText>
        </Link>

        <ThemedButton onPress={() => router.replace("/history")}>
          <Text style={{ color: "white" }}>Stay not signed in</Text>
        </ThemedButton>
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
