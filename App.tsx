import { useCallback } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'OverusedGrotesk-Roman':    require('./assets/fonts/OverusedGrotesk-Roman.ttf'),
    'OverusedGrotesk-Medium':   require('./assets/fonts/OverusedGrotesk-Medium.ttf'),
    'OverusedGrotesk-SemiBold': require('./assets/fonts/OverusedGrotesk-SemiBold.ttf'),
    'OverusedGrotesk-Bold':     require('./assets/fonts/OverusedGrotesk-Bold.ttf'),
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
