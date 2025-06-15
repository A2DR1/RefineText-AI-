import { StyleSheet, useColorScheme, Text, View } from "react-native";
import { Colors } from "../../../constants/Colors";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedButton from "../../../components/ThemedButton";
import ThemedHistoryCard from "../../../components/ThemedHistoryCard";
import { router } from "expo-router";
import { useUser } from "../../../hooks/useUser";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import ThemedScrollView from "../../../components/ThemedScrollView";
import { useHistory } from "../../../hooks/useHistory";

const History = () => {
  const { user, logout } = useUser();
  const { histories, fetchHistories } = useHistory();
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
        router.replace("history/needLogin");
      } else {
        // would it too frequent to fetch histories?
        fetchHistories().catch(console.error);
        console.log("Fetching histories for user:", user.email);
      }
    }, [user])
  );

  return (
    <ThemedScrollView>
      <ThemedView
        safe={true}
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: 80, marginLeft: 20 }}></View>

          <ThemedText style={[styles.title, {}]} title={true}>
            History
          </ThemedText>

          <ThemedButton
            onPress={handleLogout}
            style={{ width: 80, marginRight: 20 }}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </ThemedButton>
        </View>

        <ThemedText style={[styles.title, { fontSize: 30 }]} title={true}>
          Hello, {user ? user?.email?.split("@")[0] : ""}!
        </ThemedText>

        {histories.length <= 0 ? (
          <ThemedText>No history found.</ThemedText>
        ) : (
          histories.map((history) => (
            <ThemedHistoryCard
              key={history.id}
              title={history.title}
              content={history.content}
              date={history.lastmodified.toDate().toLocaleString()
              }
            />
          ))
        )}
      </ThemedView>
    </ThemedScrollView>
  );
};
export default History;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
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
  link: {
    fontSize: 20,
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
