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
import { useState } from "react";
import { router } from "expo-router";
import ThemedScrollView from "../../../components/ThemedScrollView";
import { useHistory } from "../../../hooks/useHistory";

const Result = () => {
  const [result, setResult] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const { createHistory } = useHistory();

  const onSubmit = async() => {
    try {
      await createHistory("category", "tone", result, "title");
      console.log("History created successfully");
        router.replace("/history");
    } catch (error) {
      console.error("Error creating history:", error);  
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
            Result
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
            <ThemedButton onPress={onSubmit}>
              <Text style={{ color: "white" }}>Save Results</Text>
            </ThemedButton>
            <ThemedButton onPress={() => {}}>
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
