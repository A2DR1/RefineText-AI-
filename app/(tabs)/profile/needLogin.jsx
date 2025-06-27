import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemedButton from "../../../components/ThemedButton";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { useUser } from "../../../hooks/useUser";

const NeedLogin = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to history");
      router.replace("/profile");
    } else {
      console.log("No user logged in, showing login prompt");
    }
  }, [user]);
  return (
    <ThemedView style={styles.container}>
      <Ionicons name="person-sharp" size={100} color="black" />
      <ThemedButton
        onPress={() => {
          router.replace("/login");
        }}
        style={{ margin: 20 }}
      >
        <ThemedText style={styles.title} title={true}>
          Login
        </ThemedText>
      </ThemedButton>

    </ThemedView>
  );
};
export default NeedLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: "white",
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});
