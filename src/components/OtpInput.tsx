import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { FontFamily } from '../theme';

const CELL_COUNT = 6;

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function OtpInput({ value, onChange }: Props) {
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Accept only the last character typed
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const chars = value.split('');
    chars[index] = digit;
    const next = chars.join('');
    onChange(next);

    if (digit && index < CELL_COUNT - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      const chars = value.split('');
      chars[index - 1] = '';
      onChange(chars.join(''));
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length: CELL_COUNT }).map((_, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={1}
          onPress={() => inputs.current[i]?.focus()}
        >
          <View style={[styles.cell, value[i] ? styles.cellFilled : null]}>
            <TextInput
              ref={(el) => { inputs.current[i] = el; }}
              style={styles.cellInput}
              value={value[i] ?? ''}
              onChangeText={(t) => handleChange(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              caretHidden
              selectTextOnFocus
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFilled: {
    borderColor: '#0F65EF',
    backgroundColor: '#F0F6FF',
  },
  cellInput: {
    width: 48,
    height: 48,
    textAlign: 'center',
    fontFamily: FontFamily.semiBold,
    fontSize: 18,
    color: '#000',
  },
});
