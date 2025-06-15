import {
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedButton from "../../../components/ThemedButton";
import ThemedLoader from "../../../components/ThemedLoader";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import ThemedScrollView from "../../../components/ThemedScrollView";
import { useHistory } from "../../../hooks/useHistory";

const Result = () => {
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [title, setTitle] = useState("default title");
  const [loading, setLoading] = useState(false);

  const { history } = useHistory();

  useEffect(() => {
    setResult(history?.content || "");
    setTitle(history?.title || "default title");

    if (history){
        console.log("History found:", history.title);
    }
    else {
        console.log("No history found, redirecting to index.");
    }
    
  }, [history])

  const onUpdate = async() => {
    try {
    } catch (error) {
      console.error("Error updating history:", error);
    }
  }

  const onRefine = async() => {
    try {

    }catch (error) {
      console.error("Error refining history:", error);
    }
  }

  if (loading) return <ThemedLoader />;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedScrollView
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <ThemedView style={styles.container}>
          <ThemedText style={styles.title} title={true}>
            {title}
          </ThemedText>

          <ThemedText style={styles.text}>This is the Result page.</ThemedText>

          <ThemedTextInput
            placeholder="Result"
            editable={true}
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
            <ThemedButton onPress={onUpdate}>
              <Text style={{ color: "white" }}>Update Results</Text>
            </ThemedButton>
            <ThemedButton onPress={onRefine}>
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
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
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
  },
});
