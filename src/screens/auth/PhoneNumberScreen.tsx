import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator, // Added for loading state
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

// 1. Use the Native Firebase Auth import
import auth from "@react-native-firebase/auth"; 

import styles from "./styles/PhoneNumberStyles";
import { AuthStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OtpScreen from "./OtpScreen";

type Props = NativeStackScreenProps<AuthStackParamList, "PhoneNumber">;

const PhoneNumberScreen: React.FC<Props> = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [callingCode, setCallingCode] = useState<string>("1");
  const [phone, setPhone] = useState("");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    if (selectedCountry.callingCode && selectedCountry.callingCode.length > 0) {
      setCallingCode(selectedCountry.callingCode[0]);
    }
    setShowCountryPicker(false);
  };

  const sendOtp = async () => {
    // Basic validation
    if (!phone) {
        Alert.alert("Error", "Please enter a phone number");
        return;
    }

    setLoading(true);

    try {
      const fullPhoneNumber = `+${callingCode}${phone}`;
      
      // 2. Send the OTP using native auth
      // This handles the invisible recaptcha automatically
      const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);

      setLoading(false);

      // 3. Navigate to OTP screen passing the confirmation object
      // You will need this object to verify the code later
      navigation.navigate("Otp", { confirmation });

    } catch (err: any) {
      setLoading(false);
      console.log("Error sending OTP:", err);
      
      // Handle specific Firebase errors
      if (err.code === 'auth/invalid-phone-number') {
        Alert.alert('Error', 'The phone number is invalid.');
      } else if (err.code === 'auth/quota-exceeded') {
        Alert.alert('Error', 'SMS quota exceeded. Try again later.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
            {/* Country Picker Button */}
            <TouchableOpacity
              style={styles.countryPickerButton}
              onPress={() => setShowCountryPicker(true)}
            >
              {/* 4. Make the flag and code dynamic based on state */}
              <CountryPicker
                withFilter
                withFlag
                withCallingCode={false} // We display calling code manually below
                withEmoji
                countryCode={countryCode}
                onSelect={onSelect}
                visible={showCountryPicker}
                onClose={() => setShowCountryPicker(false)}
                theme={{
                    onBackgroundTextColor: 'black', // Fix for dark mode visibility if needed
                }}
                // Hide the default picker button so we use our custom wrapper
                renderFlagButton={() => (
                    <Text style={{fontSize: 20}}>{/* Just shows the flag emoji via library logic or custom logic */}</Text>
                )}
              />
              {/* Simple visual fix: Manual Text logic usually looks cleaner than the libraries built-in button */}
              <Text style={{ marginLeft: 5, fontWeight: '600' }}>{countryCode}</Text> 
            </TouchableOpacity>

            <Text style={styles.callingCode}>+{callingCode}</Text>

            <TextInput
              placeholder="812-3123-3123"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.phoneInput}
            />
          </View>
          {/* No need for recaptcha-container view in Native Firebase */}
        </View>

        <TouchableOpacity
          disabled={loading}
          style={[
            styles.continueBtn,
            { backgroundColor: phone.length > 0 ? "#199A8E" : "#F3F4F6" },
          ]}
          onPress={sendOtp}
        >
          {loading ? (
             <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
                style={[
                styles.continueText,
                { color: phone.length > 0 ? "#FFFFFF" : "#D4D4D8" },
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