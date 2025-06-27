// hooks/useGoogleAuth.js
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../lib/firebase";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "402521905574-42elgonmacmrims5l51s5musnafqkqqk.apps.googleusercontent.com",
    webClientId: "402521905574-42elgonmacmrims5l51s5musnafqkqqk.apps.googleusercontent.com",
    iosClientId: "402521905574-b4etqfmvskcljdl5tm8345ir94or26cu.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.authentication;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCred) => {
          console.log("Logged in user:", userCred.user.email);
        })
        .catch((err) => console.error("Firebase login error:", err));
    }
  }, [response]);

  return { promptAsync, request };
}