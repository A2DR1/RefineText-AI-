import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ThemedLoader from "../../components/ThemedLoader";
import { useUser } from "../../hooks/useUser";
import { auth } from "../../lib/firebase";

export default function GoogleLoginWithReact() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "402521905574-42elgonmacmrims5l51s5musnafqkqqk.apps.googleusercontent.com",
      iosClientId:
        "402521905574-b4etqfmvskcljdl5tm8345ir94or26cu.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (!user) return;
      if (user.type === "cancelled"){
        setIsLoading(false);
        console.log("user cancelled");
        return;
      }
      console.log("user: ", user.data.user.givenName);
      const { idToken } = user.data;
      console.log("idToken: ", idToken);
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);

      setUserInfo(userCredential.user);
      setError();
      console.log("Successfully logged in with Google");
      setIsLoading(false);
      router.replace("/home");
    } catch (e) {
      setError(e.message || e.toString());
      console.log("Error: ", e);
    }
  };

  if (isLoading) {
    return <ThemedLoader />;
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          style={styles.btn}
          onPress={signin}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 50,
    marginTop: 10,
  },
});