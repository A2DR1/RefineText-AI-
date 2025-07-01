import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";
import ThemedButton from "../../../components/ThemedButton";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";

const Detail = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.title}>
        Detail Page
      </ThemedText>
      <Text style={styles.text}>
        This is a new page that provides detailed information.
      </Text>
      <ThemedButton onPress={handleBack} style={styles.btn}>
        <Text style={{ color: "white" }}>Go Back</Text>
      </ThemedButton>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    marginTop: 20,
  },
});

export default Detail;
