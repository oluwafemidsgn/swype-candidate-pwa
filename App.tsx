import { useCallback } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  GoogleSans_400Regular,
  GoogleSans_500Medium,
  GoogleSans_600SemiBold,
  GoogleSans_700Bold,
} from '@expo-google-fonts/google-sans';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    GoogleSans_400Regular,
    GoogleSans_500Medium,
    GoogleSans_600SemiBold,
    GoogleSans_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style="dark" />
      <Navigation />
    </View>
  );
}
