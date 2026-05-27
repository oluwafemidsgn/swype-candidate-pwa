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
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';
import FormField from '../components/FormField';
import StepBadge from '../components/StepBadge';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AboutYou'>; // navigates to RecordPitch
};

export default function AboutYouScreen({ navigation }: Props) {
  const [jobTitle, setJobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [location, setLocation] = useState('');
  const [relocation, setRelocation] = useState('');
  const [skills, setSkills] = useState('');

  // Demo mode: all fields optional
  const isValid = true;

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
          <View style={styles.header}>
            <StepBadge current={1} total={3} />
            <Text style={styles.title}>About you</Text>
            <Text style={styles.subtitle}>
              Tell us a little bit about you and your career.
            </Text>
          </View>

          {/* Fields */}
          <View style={styles.fields}>
            <FormField
              label="Job title"
              placeholder="e.g. Product Designer"
              value={jobTitle}
              onChangeText={setJobTitle}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <FormField
              label="Experience"
              placeholder="e.g. 3 years"
              value={experience}
              onChangeText={setExperience}
              returnKeyType="next"
            />
            <FormField
              label="Qualifications"
              placeholder="e.g. BSc Computer Science"
              value={qualifications}
              onChangeText={setQualifications}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <FormField
              label="Location"
              placeholder="e.g. New York"
              value={location}
              onChangeText={setLocation}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <FormField
              label="Open to relocation"
              placeholder="Yes / No / Open to discuss"
              value={relocation}
              onChangeText={setRelocation}
              autoCapitalize="sentences"
              returnKeyType="next"
            />
            <FormField
              label="Skills"
              placeholder="e.g. Engineering, Design"
              value={skills}
              onChangeText={setSkills}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* Continue button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('RecordPitch')}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Continue</Text>
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
  header: {
    marginTop: 32,
    gap: 15,
    marginBottom: 8,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 40,
    color: Colors.black,
    letterSpacing: -1.2,
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 17,
    color: Colors.textMuted,
    letterSpacing: -0.51,
    lineHeight: 24,
  },
  fields: {
    marginTop: 20,
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
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
});
