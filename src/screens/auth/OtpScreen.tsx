import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import styles from "./styles/OtpScreenStyles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";

import {
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { auth } from "../../config/firebase";

type Props = NativeStackScreenProps<AuthStackParamList, "Otp">;

const OtpScreen: React.FC<Props> = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ verificationId received from PhoneNumber screen
  const { verificationId } = route.params;

  const confirmOtp = async () => {
    if (otp.length !== 6) return;

    setLoading(true);
    try {
      // 1️⃣ Create Firebase credential
      const credential = PhoneAuthProvider.credential(
        verificationId,
        otp
      );

      // 2️⃣ Sign in user
      const userCredential = await signInWithCredential(auth, credential);

      console.log("✅ Phone Auth Success:", userCredential.user.uid);

      // 3️⃣ Navigate forward
      navigation.replace("Register");

    } catch (err: any) {
      console.log("OTP Error:", err);

      if (err.code === "auth/invalid-verification-code") {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      } else {
        Alert.alert("Error", "Verification failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>
          A verification code has been sent to your phone number.
        </Text>

        <TextInput
          style={styles.otpInput}
          placeholder="Enter 6-digit code"
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
        />

        <TouchableOpacity
          style={[
            styles.verifyBtn,
            { backgroundColor: otp.length === 6 ? "#199A8E" : "#E5E7EB" },
          ]}
          onPress={confirmOtp}
          disabled={otp.length !== 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              style={[
                styles.verifyText,
                { color: otp.length === 6 ? "#FFFFFF" : "#9CA3AF" },
              ]}
            >
              Verify OTP
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.resendText}>Edit Phone Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;
