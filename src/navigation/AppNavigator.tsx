import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { AuthStackParamList } from "./types";
import PhoneNumberScreen from "../screens/auth/PhoneNumberScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
