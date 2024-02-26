import "dotenv/config";
export default {
  expo: {
    name: "app-nativa",
    slug: "app-nativa",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/snap.png",
      resizeMode: "contain",
      backgroundColor: "#000000",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.tuapp.appnativa",
      adaptiveIcon: {
        foregroundImage: "./assets/snap.png",
        backgroundColor: "#000000",
      },
    },
    web: {
      favicon: "./assets/snap.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "0a83b560-f28c-4b31-88b4-17acb8a81642",
      },
    },
  },
};
