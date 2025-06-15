import { StyleSheet, Text, View } from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import Ionicons from "react-native-vector-icons/Ionicons";
import ThemedButton from "../../../components/ThemedButton";
import { router } from "expo-router";
import { useUser } from "../../../hooks/useUser";
import { useEffect } from "react";

const NeedLogin = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("User already logged in, redirecting to history");
      router.replace("/history");
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
      <ThemedText style={styles.text}>
        Please login to view your history.
      </ThemedText>
      {/* <ThemedButton
        onPress={() => console.log(user ? user.email : "No user logged in")}
      >
        <Text style={{ color: "white" }}>Log Current User</Text>
      </ThemedButton> */}
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
    fontSize: 40,
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
});
