import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useUser } from "../../hooks/useUser";
import { useGoogleAuth } from "../../lib/expoGoogleAuth";

export default function GoogleLogin() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { signInWithGoogle, signOut, isLoading: authLoading, isInitialized } = useGoogleAuth();

  useEffect(() => {
    // If user is already logged in, redirect to history
    if (user) {
      router.replace("/history");
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    if (isLoading || authLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    setError();
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success) {
        setUserInfo(result.user);
        console.log("Google Sign-In successful:", result.user);
        // You can add Firebase authentication here if needed
        router.replace("/history");
      } else {
        setError(result.error);
      }
    } catch (e) {
      console.log("Google login error:", e);
      setError(e.message || "Google Sign-In failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUserInfo();
      setError();
    } catch (e) {
      console.log("Logout error:", e);
      setError("Logout failed");
    }
  };

  const isButtonDisabled = isLoading || authLoading || !isInitialized;

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Google Sign-In</Text>
        <Text style={styles.loading}>Initializing Google Sign-In...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In</Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      {userInfo ? (
        <View>
          <Text style={styles.success}>Signed in successfully!</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Name: {userInfo.name}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Button 
          title={isLoading ? "Signing in..." : "Sign in with Google"}
          onPress={handleGoogleSignIn}
          disabled={isButtonDisabled}
          style={[styles.googleButton, isButtonDisabled && styles.disabledButton]}
        />
      )}
      
      <Button 
        title="Back to Login" 
        onPress={() => router.back()} 
        style={styles.backButton}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  error: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  success: {
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  loading: {
    color: "blue",
    marginBottom: 20,
    textAlign: "center",
  },
  googleButton: {
    marginBottom: 20,
    backgroundColor: "#4285F4",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  backButton: {
    marginTop: 20,
  },
});
