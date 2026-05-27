import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';
import OtpInput from '../components/OtpInput';
import FormField from '../components/FormField';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OtpVerification'>;
  route: RouteProp<RootStackParamList, 'OtpVerification'>;
};

export default function OtpVerificationScreen({ navigation, route }: Props) {
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Demo mode: always valid — any input (or no input) proceeds
  const handleContinue = () => {
    navigation.navigate('AboutYou');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={styles.title}>Create your{'\n'}account</Text>
          <Text style={styles.subtitle}>
            Hey, welcome to swype where you find the right job to match your swype.
          </Text>

          {/* OTP section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Enter otp code</Text>
            <OtpInput value={otp} onChange={setOtp} />
            <Text style={styles.demoHint}>Demo: enter any 6 digits</Text>
          </View>

          {/* Profile fields */}
          <View style={styles.fields}>
            <FormField
              label="Fullname"
              placeholder="Name example"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <FormField
              label="Email address"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            <FormField
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
            />
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Continue button — sits above keyboard */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.85}
            onPress={handleContinue}

          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 40,
    color: Colors.black,
    letterSpacing: -1.2,
    lineHeight: 44,
    marginTop: 32,
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
    width: 282,
  },
  section: {
    marginTop: 36,
    gap: 10,
  },
  sectionLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  demoHint: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 6,
    letterSpacing: -0.3,
  },
  fields: {
    marginTop: 36,
    gap: 16,
  },
  spacer: {
    height: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
    backgroundColor: Colors.background,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
});
