import { FirebaseAuthTypes } from "@react-native-firebase/auth";
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  PhoneNumber: undefined;
  Otp: { 
    // We pass the whole confirmation object, not just an ID string
    confirmation: FirebaseAuthTypes.ConfirmationResult; 
  };
  Register: undefined;
}
