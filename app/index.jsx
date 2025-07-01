import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet
} from "react-native";
import Spacer from "../components/Spacer";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";

const home = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(1); // starting at 3 seconds

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/login"); // or wherever you want to go
      return;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000); // decrement every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, [countdown]);

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedLogo style={styles.img} />

      <ThemedText style={styles.title} title={true}>
        Refine Your Texts
      </ThemedText>
      <ThemedText style={styles.text}>AI-Powered Text Refinemet</ThemedText>
      <ThemedText style={styles.text}>
        Welcome to RefineText — your personal AI-powered writing assistant.
        {"\n"}
        {"\n"}
        Whether you’re refining a message, rephrasing a sentence, or exploring
        better ways to express yourself, RefineText helps you write with
        confidence and clarity. {"\n"}
        {"\n"}
        Powered by GPT-4o and designed for mobile, RefineText makes smart,
        context-aware suggestions that elevate your writing — anytime, anywhere.
      </ThemedText>
      <ThemedText style={styles.text}>Powered by InnovationAI</ThemedText>

      <Spacer height={20} />

      <ThemedText style={{ textAlign: "right" }}>
        Leaving in {countdown} seconds
      </ThemedText>

      {/* <Link href="/home">
        <ThemedText style={{ textAlign: "right" }}>Create New</ThemedText>
      </Link> */}

    </ThemedView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  img: {
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
