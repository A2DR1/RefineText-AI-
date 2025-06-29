export default {
  "expo": {
    "name": "RefineText_AI",
    "slug": "RefineText_AI",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "refinetextai",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.austinshen.refinetextai",
      "googleservicesFile": process.env.GOOGLE_SERVICES_IOS || "./GoogleService-Info.plist"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"

      },
      "edgeToEdgeEnabled": true,
      "package": "com.austinshen.refinetextai",
      "googleservicesFile": process.env.GOOGLE_SERVICES_ANDROID || "./google-services.json"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }

      ],
      [
        "@react-native-google-signin/google-signin",
        {
          "iosClientId": "402521905574-b4etqfmvskcljdl5tm8345ir94or26cu.apps.googleusercontent.com",
          "iosUrlScheme": "com.googleusercontent.apps.402521905574-b4etqfmvskcljdl5tm8345ir94or26cu"
        }
      ],
      "expo-web-browser"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "79b3050c-1bce-4320-990a-0c9342ed4a58"
      }
    }
  }
}