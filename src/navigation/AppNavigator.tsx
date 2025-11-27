import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { AuthStackParamList } from "./types";
import PhoneNumberScreen from "../screens/auth/PhoneNumberScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import RegisterScreen from "../screens/auth/RegisterScreen"
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import BookAppointmentScreen from "../screens/home/BookAppointmentScreen";
import DoctorListScreen from "../screens/home/DoctorListScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="Otp" component={OtpScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
        <Stack.Screen name="DoctorList" component={DoctorListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
