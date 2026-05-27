import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors, FontFamily } from '../theme';

type Props = TextInputProps & {
  label: string;
};

export default function FormField({ label, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#969696"
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  input: {
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
});
