import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import Spacer from "../../../components/Spacer";
import ThemedButton from "../../../components/ThemedButton";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import { useHistory } from "../../../hooks/useHistory";
import { useRefine } from "../../../hooks/useRefine";
import { useUser } from "../../../hooks/useUser";
import { auth } from "../../../lib/firebase";

const Create = () => {
  const [category, setCategory] = useState("option1");
  const [tone, setTone] = useState("option1");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const { currentUser } = auth;
  const { createHistory } = useHistory();
  const { setCategoryContext, setToneContext, setTextContext, setTitleContext } = useRefine();

  const onSubmit = async () => {
    try {
      if (!title || !text) {
        Alert.alert("Please fill in all fields");
        return;
      }
      // setCategoryContext(category);
      // setToneContext(tone);
      setTextContext(text);
      setTitleContext(title);
      router.push("/home/detail");
    } catch (error) {
      console.error("Error creating history:", error);
    }
  };

  const testPostman = async () => {
    fetch("https://us-central1-refinetext-ai.cloudfunctions.net/testPostman", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Austin" }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  const testOpenAI = async () => {
    fetch("https://us-central1-refinetext-ai.cloudfunctions.net/testOpenAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ThemedScrollView>
        <ThemedView safe={true} style={styles.container}>
          {/* <Spacer height={20} /> */}
          <ThemedText title={true} style={styles.title}>
            What would you like to say?
          </ThemedText>

          <ThemedText style={styles.text}>Write your message and we will help you refine it.</ThemedText>
          <Spacer height={20} />

          <ThemedTextInput
            placeholder="Title"
            editable={true}
            onChangeText={(text) => setTitle(text)}
            maxLength={50}
            value={title}
            style={{
              width: "90%",
              marginHorizontal: 20,
              marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />

          <ThemedTextInput
            placeholder="Enter text to refine"
            editable={true}
            onChangeText={(text) => setText(text)}
            multiline={true}
            numberOfLines={10}
            maxLength={10000}
            value={text}
            style={{
              height: 300,
              width: "90%",
              marginHorizontal: 20,
              // marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />
          <ThemedText style={[styles.text, { textAlign: "right" }]}>
            {text.length} / {10000} characters
          </ThemedText>

          {/* <ThemedText style={styles.text}>Refinement Category:</ThemedText>

          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Professional" value="professional" />
            <Picker.Item label="Romantic/Dating" value="romantic" />
            <Picker.Item label="Workplace" value="workplace" />
            <Picker.Item label="Parenting" value="parenting" />
          </Picker>

          <Spacer height={150} />

          <ThemedText style={styles.text}>Refinement Tone:</ThemedText>

          <Picker
            selectedValue={tone}
            onValueChange={(itemValue) => setTone(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Make it more polite" value="polite" />
            <Picker.Item label="Add humor or charm" value="humorous" />
            <Picker.Item label="make it more concise" value="concise" />
            <Picker.Item label="Add emotional warmth" value="emotional warmth" />
            <Picker.Item label="professional but empathetic" value="professional but empathetic" />
          </Picker>

          <Spacer height={150} /> */}

          <ThemedButton
            onPress={onSubmit}
            style={styles.btn}
          >
            <ThemedText title={true} style={{ color: "white", fontSize: 28 }}>
              Refine
            </ThemedText>
          </ThemedButton>

          {/* <Spacer height={20} /> */}

        </ThemedView>
      </ThemedScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    // textAlign: "center",
    fontSize: 30,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  picker: {
    height: 30,
    width: "70%",
    marginBottom: 20,
    alignSelf: "center",
  },
  btn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",  
    width: "90%",
    height: 80,
    marginTop: 20,
  },
});
