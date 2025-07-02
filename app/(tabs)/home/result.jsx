import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Clipboard,
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
import { auth } from "../../../lib/firebase";

const Result = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [result, setResult] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  const { createHistory } = useHistory();
  const {
    toneContext,
    categoryContext,
    textContext,
    setTextContext,
    titleContext,
    suggestionContext,
    setSuggestionContext,
  } = useRefine();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Loading...");
      console.log("Category:", categoryContext);
      console.log("Tone:", toneContext);
      console.log("Text:", textContext);

      try {
        const res = await fetch(
          "https://us-central1-refinetext-ai.cloudfunctions.net/Refine",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: textContext,
              category: categoryContext,
              tone: toneContext,
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

    fetchData();
  }, []);

  useEffect(() => {
    setTextContext(result);
  }, [result]);

  useEffect(() => {
    setSuggestionContext(suggestion);
  }, [suggestion, setSuggestionContext]);

  const onSave = async () => {
    try {
      if (!auth.currentUser) {
        console.error("User is not authenticated");
        return;
      }
      setLoading(true);
      await createHistory(categoryContext, toneContext, result, titleContext);
      console.log("History created successfully");
      setLoading(false);
      router.replace("/history");
    } catch (error) {
      console.error("Error creating history:", error);
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

  const onCopyToClipboard = async () => {
    try {
      await Clipboard.setString(result);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
      console.log("Result copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
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
        <ThemedView style={styles.container} safe={true}>
          <ThemedText style={styles.title} title={true}>
            {titleContext || "Result"}
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
          <ThemedText style={[styles.wordCount, { textAlign: "right" }]}>
            {result.length} / {10000} characters
          </ThemedText>

          <ThemedText style={styles.text}>Suggestions:</ThemedText>
          <ThemedTextInput
            placeholder="Suggestions"
            onChangeText={setSuggestion}
            value={suggestion}
            multiline
            numberOfLines={10}
            maxLength={5000}
            style={styles.suggestionBox}
          />
          <ThemedText style={[styles.wordCount, { textAlign: "right" }]}>
            {suggestion.length} / {5000} characters
          </ThemedText>

          <ThemedView style={styles.buttonRow}>
            <ThemedButton onPress={onSave} style={styles.btn}>
              <AntDesign name="save" size={24} color="white" />
              <Text style={{ color: "white" }}>Save</Text>
            </ThemedButton>

            <ThemedButton onPress={onRefineAgain} style={styles.btn}>
              <Entypo name="text-document" size={24} color="white" />
              <Text style={{ color: "white" }}>Refine</Text>
            </ThemedButton>
            <ThemedButton onPress={onCopyToClipboard} style={styles.btn}>
              <AntDesign name="copy1" size={24} color="white" />
              <Text style={{ color: "white" }}>
                {copySuccess ? "Copied!" : "Copy"}
              </Text>
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
    marginHorizontal: 30,
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
    width: "100%",
    alignSelf: "center",
    // marginBottom: 20,
    textAlignVertical: "top",
  },
  suggestionBox: {
    height: 100,
    width: "100%",
    alignSelf: "center",
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  btn: {
    width: "30%",
  }
});
