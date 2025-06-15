import {
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Spacer from "../../../components/Spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedTextInput from "../../../components/ThemedTextInput";
import { Link } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import ThemedCard from "../../../components/ThemedCard";
import ThemedButton from "../../../components/ThemedButton";
import { useUser } from "../../../hooks/useUser";
import { auth } from "../../../lib/firebase";
import ThemedLoader from "../../../components/ThemedLoader";
import { useHistory } from "../../../hooks/useHistory";

const Create = () => {
  const [category, setCategory] = useState("option1");
  const [tone, setTone] = useState("option1");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const { currentUser } = auth;
  const { createHistory } = useHistory();

  const onSubmit = async() => {
    try {
      // await createHistory(category, tone, text, title);
      // console.log("History created successfully");
      router.push("/home/result");
    } catch (error) {
      console.error("Error creating history:", error);  
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ThemedScrollView>
        <ThemedView safe={true} style={styles.container}>
          <Spacer height={20} />
          <ThemedText title={true} style={styles.title}>
            Refine New Texts!
          </ThemedText>

          <ThemedText style={styles.text}>This is the create page.</ThemedText>
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
              marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />

          <ThemedText style={styles.text}>Refinement Category:</ThemedText>

          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>

          <Spacer height={150} />

          <ThemedText style={styles.text}>Refinement Tone:</ThemedText>

          <Picker
            selectedValue={tone}
            onValueChange={(itemValue) => setTone(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>

          <Spacer height={150} />

          <ThemedButton
            onPress={onSubmit}
            style={{ 
              marginTop: 20,
              marginHorizontal: 20,
              width: 200,
              height: 80,
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText title={true} style={{ fontSize: 28 }}>
              Refine
            </ThemedText>
          </ThemedButton>

          <Spacer height={20} />
        </ThemedView>

      </ThemedScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
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
});
