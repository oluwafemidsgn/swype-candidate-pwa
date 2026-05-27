import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import OtpVerificationScreen from '../screens/OtpVerificationScreen';
import AboutYouScreen from '../screens/AboutYouScreen';
import RecordPitchScreen from '../screens/RecordPitchScreen';
import UploadDocumentsScreen from '../screens/UploadDocumentsScreen';
import HomeScreen from '../screens/HomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  CreateAccount: undefined;
  Login: undefined;
  OtpVerification: { phone: string };
  AboutYou: undefined;                              // Onboarding step 1 of 3
  RecordPitch: undefined;                           // Onboarding step 2 of 3
  UploadDocuments: { videoUri: string | null };     // Onboarding step 3 of 3
  Home: undefined;                                  // Main app — added as screens are designed
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <Stack.Screen name="AboutYou" component={AboutYouScreen} />
        <Stack.Screen name="RecordPitch" component={RecordPitchScreen} />
        <Stack.Screen name="UploadDocuments" component={UploadDocumentsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
