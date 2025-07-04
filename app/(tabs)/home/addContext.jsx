import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ThemedButton from "../../../components/ThemedButton";
import ThemedScrollView from "../../../components/ThemedScrollView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedView from "../../../components/ThemedView";
import { useRefine } from "../../../hooks/useRefine";

export default function AddContext() {
    const router = useRouter();
    const { setTextContext, textContext } = useRefine();
    const [covContext, setCovContext] = useState("");

    const handleNavigate = () => {
        setTextContext(textContext + "\n\n" + " Please refine the text before in response to the following context: " + covContext);
        router.push("/home/result");
    };

    return (
        <ThemedScrollView>
        <ThemedView style={styles.container} safe={true}>
            <ThemedText title={true} style={styles.title}>
                Add Context To Your Text :)
            </ThemedText>

            <ThemedTextInput
            placeholder="Enter text to refine"
            editable={true}
            onChangeText={(text) => setCovContext(text)}
            multiline={true}
            numberOfLines={10}
            maxLength={10000}
            value={covContext}
            style={{
              height: 480,
              width: "90%",
              marginHorizontal: 20,
              // marginBottom: 20,
              alignSelf: "center",
              textAlignVertical: "top",
            }}
          />
          <ThemedText style={[styles.text, { textAlign: "right" }]}>
            {covContext.length} / {10000} characters
          </ThemedText>

          <ThemedButton onPress={handleNavigate} style={styles.btn}>
            <ThemedText title={true} style={{ color: "white", fontSize: 16 }}>
              Refine Now
            </ThemedText>
          </ThemedButton>
        </ThemedView>
        </ThemedScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
    //   marginHorizontal: 40,
    paddingLeft: 20,
    paddingRight: 20,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
      paddingHorizontal: 20,
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
