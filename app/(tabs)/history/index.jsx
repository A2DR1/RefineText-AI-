import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import ThemedHistoryCard from "../../../components/ThemedHistoryCard";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import { Colors } from "../../../constants/Colors";
import { useHistory } from "../../../hooks/useHistory";
import { useUser } from "../../../hooks/useUser";

const History = () => {
  const { user, logout } = useUser();
  const { histories, fetchHistories, fetchHistoryById } = useHistory();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  const findHistory = async (id) => {
    console.log("Finding history with ID:", id);
    try {
      await fetchHistoryById(id);
      router.push("history/result");
    } catch (error) {
      console.error("Error finding history:", error);
    }
  }

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
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          {/* <View style={{ width: 80, marginLeft: 20 }}></View> */}

          <ThemedText style={[styles.title]} title={true}>
            History
          </ThemedText>

          
        </View>

        {/* <ThemedText style={[styles.title, { fontSize: 30 }]} title={true}>
          Hello, {user ? user?.email?.split("@")[0] : ""}!
        </ThemedText> */}

        {histories.length <= 0 ? (
          <ThemedText>No history found.</ThemedText>
        ) : (
          histories.map((history) => (
            <ThemedHistoryCard
              key={history.id}
              id={history.id}
              title={history.title}
              content={history.content}
              date={history.lastmodified.toDate()}
              onPress={() => findHistory(history.id)}
              refresh={fetchHistories}
              category={history.category}
              style={{
                width: 350,
              }}
            >
              
            </ThemedHistoryCard>
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
