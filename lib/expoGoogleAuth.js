import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';

// Configure Google Sign-In with explicit client IDs
GoogleSignin.configure({
  webClientId: '402521905574-42elgonmacmrims5l51s5musnafqkqqk.apps.googleusercontent.com', // Your web client ID
  iosClientId: '402521905574-b4etqfmvskcljdl5tm8345ir94or26cu.apps.googleusercontent.com', // From GoogleService-Info.plist
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if Google Sign-In is available
    const checkGoogleSignIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        setIsInitialized(true);
      } catch (error) {
        console.error('Google Sign-In not available:', error);
        setIsInitialized(true); // Set to true so we can show error
      }
    };

    checkGoogleSignIn();
  }, []);

  const signInWithGoogle = async () => {
    if (!isInitialized) {
      return {
        success: false,
        error: 'Google Sign-In is not initialized yet',
      };
    }

    setIsLoading(true);
    
    try {
      // Check if user is already signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Sign in
      const userInfo = await GoogleSignin.signIn();
      
      return {
        success: true,
        user: {
          id: userInfo.user.id,
          email: userInfo.user.email,
          name: userInfo.user.name,
          picture: userInfo.user.photo,
          accessToken: userInfo.serverAuthCode, // Note: this is the auth code, not access token
        },
      };
    } catch (error) {
      console.error('Google Sign-In error:', error);
      
      let errorMessage = 'Google Sign-In failed';
      if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Sign-in was cancelled';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services not available';
      } else if (error.code === 'SIGN_IN_REQUIRED') {
        errorMessage = 'Sign-in required';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  };

  return {
    signInWithGoogle,
    signOut,
    isLoading: isLoading || !isInitialized,
    isInitialized,
  };
}; 