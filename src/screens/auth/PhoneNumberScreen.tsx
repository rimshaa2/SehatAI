import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/types";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider } from "firebase/auth";
import { auth } from "../../config/firebase";

import styles from "./styles/PhoneNumberStyles";

type Props = NativeStackScreenProps<AuthStackParamList, "PhoneNumber">;

const PhoneNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [callingCode, setCallingCode] = useState<string>("1");
  const [phone, setPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Required for Expo phone auth
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    if (selectedCountry.callingCode?.length) {
      setCallingCode(selectedCountry.callingCode[0]);
    }
    setShowCountryPicker(false);
  };

  const sendOtp = async () => {
    if (!phone) {
      Alert.alert("Error", "Please enter a phone number");
      return;
    }

    setLoading(true);

    try {
      const fullPhoneNumber = `+${callingCode}${phone}`;

      const phoneProvider = new PhoneAuthProvider(auth);

      const verificationId = await phoneProvider.verifyPhoneNumber(
        fullPhoneNumber,
        recaptchaVerifier.current!
      );

      navigation.navigate("Otp", { verificationId });

    } catch (err: any) {
      console.log("OTP Send Error:", err);

      if (err.code === "auth/invalid-phone-number") {
        Alert.alert("Error", "Invalid phone number.");
      } else if (err.code === "auth/too-many-requests") {
        Alert.alert("Error", "Too many requests. Try again later.");
      } else {
        Alert.alert("Error", "Failed to send OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔐 Invisible Recaptcha (MANDATORY) */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />

      <ScrollView style={styles.scroll}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>
            Please enter your phone number to continue
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>

          <View style={styles.phoneInputContainer}>
            {/* Country Picker */}
            <View style={styles.countryPickerWrapper}>
              <CountryPicker
                withFilter
                withFlag
                withEmoji
                countryCode={countryCode}
                onSelect={onSelect}
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                containerButtonStyle={styles.pickerButton}
              />
              <Text style={styles.countryCodeText}>{countryCode}</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.callingCodeText}>+{callingCode}</Text>

            <TextInput
              placeholder="81231233123"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.phoneInputText}
              placeholderTextColor="#A1A8B0"
            />
          </View>
        </View>

        <TouchableOpacity
          disabled={loading}
          style={[
            styles.continueBtn,
            { backgroundColor: phone ? "#199A8E" : "#F3F4F6" },
          ]}
          onPress={sendOtp}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              style={[
                styles.continueText,
                { color: phone ? "#FFFFFF" : "#D4D4D8" },
              ]}
            >
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
