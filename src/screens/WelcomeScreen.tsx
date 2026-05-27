import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Logo / App name */}
        <Text style={styles.appName}>SwypeJobs</Text>

        {/* Hero */}
        <View style={styles.heroContainer}>
          <Text style={styles.hero}>Find{'\n'}your{'\n'}next{'\n'}job</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>No stress, Just swipe</Text>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.primaryButtonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  appName: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: Colors.black,
    letterSpacing: -0.96,
    textAlign: 'center',
    marginTop: 16,
  },
  heroContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  hero: {
    fontFamily: FontFamily.black,
    fontSize: 88,
    lineHeight: 88 * 0.9,
    color: Colors.black,
    letterSpacing: -1.92,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: FontFamily.regular,
    fontSize: 20,
    color: Colors.textMuted,
    letterSpacing: -0.6,
    textAlign: 'center',
    marginTop: 28,
  },
  spacer: {
    flex: 1,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: Platform.OS === 'android' ? 16 : 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
  secondaryButton: {
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.black,
    letterSpacing: -0.48,
  },
});
