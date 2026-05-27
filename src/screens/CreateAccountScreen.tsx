import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;
};

export default function CreateAccountScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');

  const handleGetOtp = () => {
    // Demo mode: any input accepted, no backend validation
    const value = phone.trim() || '0000000000';
    navigation.navigate('OtpVerification', { phone: value });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Create your{'\n'}account</Text>
              <Text style={styles.subtitle}>
                Hey, welcome to swype where you find the right job to match your swype.
              </Text>
            </View>

            {/* Phone input section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Enter Phone number</Text>
              <View style={styles.inputRow}>
                {/* Country code pill */}
                <TouchableOpacity style={styles.countryCode} activeOpacity={0.7}>
                  <Text style={styles.countryCodeText}>+234</Text>
                </TouchableOpacity>

                {/* Phone number field */}
                <TextInput
                  style={styles.phoneInput}
                  placeholder="09161379900"
                  placeholderTextColor="#969696"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  returnKeyType="done"
                  maxLength={11}
                />
              </View>
            </View>

            <View style={styles.spacer} />

            {/* CTA */}
            <TouchableOpacity
              style={styles.otpButton}
              activeOpacity={0.85}
              onPress={handleGetOtp}

            >
              <Text style={styles.otpButtonText}>Get otp code</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 32,
    marginBottom: 8,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 40,
    color: Colors.black,
    letterSpacing: -1.2,
    lineHeight: 44,
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
  inputSection: {
    marginTop: 40,
    gap: 10,
  },
  inputLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  countryCode: {
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countryCodeText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#969696',
    letterSpacing: -0.36,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  spacer: {
    flex: 1,
  },
  otpButton: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? 16 : 8,
  },
  otpButtonDisabled: {
    opacity: 0.5,
  },
  otpButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
});
