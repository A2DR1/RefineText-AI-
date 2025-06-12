import { StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Spacer from "../../../components/Spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedScrollView from "../../../components/ThemedScrollView";
import { Link } from "expo-router";
import { useState } from "react";

const Create = () => {
  const [category, setCategory] = useState("option1");
  const [tone, setTone] = useState("option1");

  return (
    <ThemedScrollView>
      <ThemedView safe={true} style={styles.container}>
        <Spacer height={20} />
        <ThemedText title={true} style={styles.title}>
          Refine New Texts!
        </ThemedText>

        <ThemedText style={styles.text}>This is the create page.</ThemedText>
        <Spacer height={20} />

        <ThemedText style={styles.text}>
        Refinement Category:
      </ThemedText>

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

        <ThemedText style={styles.text}>
          Refinement Tone:
        </ThemedText>

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

      <Link href="/home/result">
        <ThemedText style={styles.text}>Go to Result Page</ThemedText>
      </Link>

      <Spacer height={20} />
      <Spacer height={2000} />
        <ThemedText style={styles.text}>
            This is the  page.
        </ThemedText>
    </ThemedView>
    </ThemedScrollView>
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
    paddingHorizontal: 20
  },
    picker: {
        height: 30,
        width: "90%",
        marginBottom: 20,
        alignSelf: "center",
    },
});
