import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import styles from "./styles/WelcomeScreenStyle";
import { IMAGES } from "../../constants/Images";

WebBrowser.maybeCompleteAuthSession();

const WelcomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleAuth(response.authentication?.idToken);
    }
  }, [response]);

  const handleGoogleAuth = async (idToken?: string) => {
    if (!idToken) return;

    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName ?? "Google User",
          email: user.email,
          profileImage: user.photoURL,
          role: "user",
          phone: user.phoneNumber ?? "",
          createdAt: serverTimestamp(),
        });
      }

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });

    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <ImageBackground
          source={IMAGES.WELCOME_BG}
          style={styles.headerWrapper}
        />

        <View style={styles.titleWrapper}>
          <Text style={styles.appTitle}>Sehat AI</Text>
          <Text style={styles.subtitle}>
            Begin your journey to better health!
          </Text>
        </View>

        <View style={styles.buttonWrapper}>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("PhoneNumber")}
          >
            <Text style={styles.primaryButtonText}>
              Continue With Phone Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButton}
            disabled={!request || loading}
            onPress={() => promptAsync()}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Image source={IMAGES.GOOGLE_ICON} style={styles.socialIcon} />
                <Text style={styles.googleText}>Sign in with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account? Sign In
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
