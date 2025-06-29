import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // iOS client ID (required for iOS - from GoogleService-Info.plist)
    iosClientId: '402521905574-b4etqfmvskcljdl5tm8345ir94or26cu.apps.googleusercontent.com',
    // Web client ID (required for offline access)
    webClientId: '402521905574-42elgonmacmrims5l51s5musnafqkqqk.apps.googleusercontent.com',
    // Scopes you want to request
    scopes: ['profile', 'email'],
    // Whether to request server auth code
    offlineAccess: true,
  });
}; 