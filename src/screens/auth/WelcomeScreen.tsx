import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import styles from "./styles/WelcomeScreenStyle";
import { IMAGES } from "../../constants/Images";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* Background Header */}
        <ImageBackground
          source={IMAGES.WELCOME_BG}
          resizeMode="stretch"
          imageStyle={styles.headerImage}
          style={styles.headerWrapper}
        >
          <View style={styles.statusBarRow}>
            <Text style={styles.timeText}>9:41</Text>
            <Image
              source={IMAGES.STATUS_ICONS}
              resizeMode="stretch"
              style={styles.statusIcons}
            />
          </View>
        </ImageBackground>

        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.appTitle}>Sehat AI</Text>
          <Text style={styles.subtitle}>
            Begin your journey to better health!
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("PhoneNumber")}
          >
            <Text style={styles.primaryButtonText}>
              Continue With Phone Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Image source={IMAGES.GOOGLE_ICON} style={styles.socialIcon} />
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleButton}>
            <Image source={IMAGES.APPLE_ICON} style={styles.socialIcon} />
            <Text style={styles.appleText}>Sign in with Apple</Text>
          </TouchableOpacity>

          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("Login")}
          >
            Already have an account? Sign In
          </Text>
        </View>

        {/* Terms */}
        <View style={styles.termsWrapper}>
          <Text style={styles.termsText}>
            By signing up or logging in, I accept the app’s {"\n"}Terms of
            Service and Privacy Policy
          </Text>
        </View>

        {/* Bottom bar */}
        <View style={styles.bottomBarWrapper}>
          <View style={styles.bottomBar} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
