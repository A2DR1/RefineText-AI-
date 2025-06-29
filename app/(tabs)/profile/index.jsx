import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { Colors } from "../../../constants/Colors";
import { useHistory } from "../../../hooks/useHistory";
import { useUser } from "../../../hooks/useUser";

const Profile = () => {
  const { user, logout } = useUser();
  const { histories, fetchHistories, fetchHistoryById } = useHistory();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const handleLogout = async () => {
    await logout();
    console.log("Logout button pressed");
  };

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        // console.log("User not logged in, redirecting to needLogin");
        router.replace("profile/needLogin");
      } else {
        // to do?
      }
    }, [user])
  );

  return (
    <ThemedScrollView>
      <ThemedView
        safe={true}
        style={[styles.container, { backgroundColor: theme.background }]}
      >

       {/* <ThemedText>Profile</ThemedText> */}
       
       <View style={{flexDirection: "row", marginTop: 20}}>
        <View style={{
            backgroundColor: "grey",
            height: 80,
            width: 80,
            borderRadius: 50,
        }}></View>

        <View style={{marginLeft: 10}}>
            <ThemedText title={true} style={styles.title}>
                {user?.email || "No user logged in"}
            </ThemedText>
            <ThemedText style={styles.text}>
                {user?.name || "No name available"}
            </ThemedText>
        </View>
       </View>

       {/* <ThemedCard> </ThemedCard> */}

      </ThemedView>
    </ThemedScrollView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  link: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
