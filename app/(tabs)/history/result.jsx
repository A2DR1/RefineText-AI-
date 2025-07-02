import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import ThemedButton from "../../../components/ThemedButton";
import ThemedLoader from "../../../components/ThemedLoader";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import { useHistory } from "../../../hooks/useHistory";
import { useRefine } from "../../../hooks/useRefine";

const Result = () => {
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [title, setTitle] = useState("default title");
  const [loading, setLoading] = useState(false);

  const { history, updateHistory, deleteHistory } = useHistory();
  const {
    toneContext,
    categoryContext,
    textContext,
    setTextContext,
    titleContext,
    suggestionContext,
    setSuggestionContext,
  } = useRefine();

  // update textcontext with the result
  useEffect(() => {
    setTextContext(result);
  }, [result]);

  useEffect(() => {
    setResult(history?.content || "");
    setTitle(history?.title || "default title");

    if (history) {
      console.log("History found:", history.title);
    } else {
      console.log("No history found, redirecting to index.");
    }
  }, [history]);

  useEffect(() => {
    setSuggestionContext(suggestions);
  }, [suggestions]);

  const onDelete = async () => {
    try {
      setLoading(true);
      console.log("Deleting history with ID:", history.id);
      await deleteHistory(history.id);
      setLoading(false);
      router.replace("history");
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  // not working yet, but might not need it after all
  const onUpdate = async () => {
    try {
      setLoading(true);
      console.log("Update text");
      await updateHistory(history.id, textContext, suggestionContext);
      setLoading(false);
      router.replace("history");
    } catch (error) {
      console.error("Error updating history:", error);
    }
  };

  const onRefineAgain = async () => {
    setLoading(true);
    console.log("Category:", categoryContext);
    console.log("Tone:", toneContext);
    console.log("Text:", textContext);
    console.log("Suggestion:", suggestionContext);

    try {
      const res = await fetch(
        "https://us-central1-refinetext-ai.cloudfunctions.net/RefineAgain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: textContext,
            category: categoryContext,
            tone: toneContext,
            suggestion: suggestionContext,
          }),
        }
      );

      const data = await res.json();
      setResult(data);
      console.log("Response from server:", data);
    } catch (error) {
      console.error("Error in useEffect:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ThemedLoader />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ThemedView style={styles.container}>

          <ThemedView style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <ThemedText style={styles.title} title={true}>
              {title}
            </ThemedText>

          {/* <ThemedButton onPress={onDelete}>
            <AntDesign name="delete" size={30} color="white" />
          </ThemedButton> */}
          </ThemedView>


          <ThemedTextInput
            placeholder="Result"
            editable={false}
            onChangeText={setResult}
            multiline={true}
            numberOfLines={10}
            maxLength={10000}
            value={result}
            style={styles.resultBox}
          />

          <ThemedText style={styles.text}>Suggestions:</ThemedText>
          <ThemedTextInput
            placeholder="Suggestions"
            onChangeText={setSuggestions}
            value={suggestions}
            multiline
            style={styles.suggestionBox}
          />

          <ThemedView style={styles.buttonRow}>
            <ThemedButton onPress={onUpdate} style={styles.btn}>
            <MaterialIcons name="update" size={24} color="white" />
              <Text style={{ color: "white" }}>Update Result</Text>
            </ThemedButton>
            <ThemedButton onPress={onRefineAgain} style={styles.btn}>
            <Entypo name="text-document" size={24} color="white" />
              <Text style={{ color: "white" }}>Refine Again</Text>
            </ThemedButton>

          </ThemedView>
        </ThemedView>
      </ThemedScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 40,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  resultBox: {
    height: 300,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    textAlignVertical: "top",
  },
  suggestionBox: {
    height: 100,
    width: "90%",
    alignSelf: "center",
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginHorizontal: 10,
  },
  btn: {
    width: "45%",
  }
});
