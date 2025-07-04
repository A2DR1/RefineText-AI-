import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ThemedButton from "../../../components/ThemedButton";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import { useRefine } from "../../../hooks/useRefine";

const Detail = () => {
  const [category, setCategory] = useState("professional");
  const [tone, setTone] = useState("polite");
  const [customCategory, setCustomCategory] = useState("");
  const [customTone, setCustomTone] = useState("");
  const { setCategoryContext, setToneContext, setTextContext, setTitleContext } = useRefine();

  const handleBack = () => {
    router.back();
  };

  const onSubmit = () => {
    console.log("onSubmit");
    if (category === "custom") {
      setCategoryContext(customCategory);
    } else {
      setCategoryContext(category);
    }
    if (tone === "custom") {
      setToneContext(customTone);
    } else {
      setToneContext(tone);
    }
    router.push("/home/result");
  };

  return (
    <ThemedScrollView>
      <ThemedView style={styles.container} safe={true}>
        <ThemedText title={true} style={styles.title}>
          Details of your refinement
        </ThemedText>

        <ThemedText style={styles.subtitle}>Category:</ThemedText>

        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Professional" value="professional" />
          <Picker.Item label="Romantic/Dating" value="romantic" />
          <Picker.Item label="Workplace" value="workplace" />
          <Picker.Item label="Parenting" value="parenting" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>

        {/* <Spacer height={150} /> */}

        {category === "custom" && (
          <ThemedTextInput
            placeholder="Enter your category"
            editable={true}
            onChangeText={(text) => setCustomCategory(text)}
            maxLength={50}
            value={customCategory}
            style={{
              width: "100%",
              marginHorizontal: 20,
              marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />
        )}

        <ThemedText style={styles.subtitle}>Tone:</ThemedText>

        <Picker
          selectedValue={tone}
          onValueChange={(itemValue) => setTone(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Make it more polite" value="polite" />
          <Picker.Item label="Add humor or charm" value="humorous" />
          <Picker.Item label="make it more concise" value="concise" />
          <Picker.Item label="Add emotional warmth" value="emotional warmth" />
          <Picker.Item
            label="professional but empathetic"
            value="professional but empathetic"
          />
          <Picker.Item label="Custom" value="custom" />
        </Picker>

        {/* <Spacer height={150} /> */}

        {tone === "custom" && (
          <ThemedTextInput
            placeholder="Enter your tone"
            editable={true}
            onChangeText={(text) => setCustomTone(text)}
            maxLength={50}
            value={customTone}
            style={{
              width: "100%",
              marginHorizontal: 20,
              marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

        <ThemedButton onPress={() => router.push("/home/addContext")} style={styles.btn}>
          <ThemedText title={true} style={{ color: "white", fontSize: 16 }}>
            Add Context
          </ThemedText>
        </ThemedButton>

        <ThemedButton onPress={onSubmit} style={styles.btn}>
          <ThemedText title={true} style={{ color: "white", fontSize: 16 }}>
            Refine Now
          </ThemedText>
        </ThemedButton>

        </View>



      </ThemedView>
    </ThemedScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    // textAlign: "center",
    // marginBottom: 20,
    paddingHorizontal: 20,
  },
  btn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 50,
    // marginTop: 20,
  },
  picker: {
    height: 220,
    width: "100%",
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: "#d6d5e1", // darker purple
    borderRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Detail;
