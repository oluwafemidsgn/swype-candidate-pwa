import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontFamily } from '../theme';

type Props = {
  current: number;
  total: number;
};

export default function StepBadge({ current, total }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Step {current} of {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#D0E1FD',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  text: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#606060',
    letterSpacing: -0.36,
    lineHeight: 17,
  },
});
