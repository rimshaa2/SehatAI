import CountryPicker, { Country, CallingCode } from "react-native-country-picker-modal";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styles from "./styles/PhoneNumberStyles";
import { AuthStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<AuthStackParamList, "PhoneNumber">;


const PhoneNumberScreen: React.FC<Props> = ({ navigation }) => {

  const [country, setCountry] = useState<Country | null>(null);
  const [callingCode, setCallingCode] = useState<string>("1"); // default
  const [phone, setPhone] = useState("");

  const onSelect = (selectedCountry: Country) => {
    setCountry(selectedCountry);
    setCallingCode(selectedCountry.callingCode[0]); // first code
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>

        {/* Title */}
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>
            Please enter your phone number to continue
          </Text>
        </View>

        {/* Phone Input Container */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Phone Number</Text>

          <View style={styles.phoneInputContainer}>
            
            {/* Country Picker Dropdown */}
            <CountryPicker
              withFilter
              withFlag
              withCallingCode
              withEmoji
              withModal
              withAlphaFilter
              countryCode={country?.cca2 as Country['cca2'] | undefined}
              onSelect={onSelect}
              containerButtonStyle={styles.countryPickerButton}
            />

            {/* Calling Code */}
            <Text style={styles.callingCode}>+{callingCode}</Text>

            {/* Phone Input */}
            <TextInput
              placeholder="e.g 812-3123-3123"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.phoneInput}
            />
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueBtn,
            { backgroundColor: phone.length > 0 ? "#199A8E" : "#F3F4F6" },
          ]}
          onPress={() => navigation.navigate("Otp")}
        >
          <Text
            style={[
              styles.continueText,
              { color: phone.length > 0 ? "#FFFFFF" : "#D4D4D8" },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PhoneNumberScreen;
