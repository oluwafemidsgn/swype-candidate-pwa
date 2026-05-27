import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../data/mockJobs';
import { Colors, FontFamily } from '../theme';

const SCREEN_WIDTH = Dimensions.get('window').width;
export const CARD_WIDTH = SCREEN_WIDTH - 78;
export const CARD_HEIGHT = CARD_WIDTH * 1.543; // 543/352 ratio from Figma

type Props = {
  job: Job;
  onPass?: () => void;
  onSave?: () => void;
  onLike?: () => void;
};

export default function JobCard({ job, onPass, onSave, onLike }: Props) {
  return (
    <View style={styles.card}>
      {/* Decorative header */}
      <View style={styles.cardHeader}>
        {/* Wave cutout using an overlaid circle */}
        <View style={styles.cardHeaderWave} />
      </View>

      {/* Card content */}
      <View style={styles.body}>
        {/* Company row */}
        <View style={styles.companyRow}>
          <View style={styles.companyLeft}>
            <Text style={styles.companyName}>{job.company}</Text>
            {job.verified && (
              <Ionicons name="checkmark-circle" size={15} color={Colors.primary} />
            )}
          </View>
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>Match: {job.matchPercent}%</Text>
          </View>
        </View>

        {/* Job title */}
        <Text style={styles.title}>{job.title}</Text>

        {/* Tags */}
        <View style={styles.tagsRow}>
          {job.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Role overview */}
        <View style={styles.overview}>
          <Text style={styles.overviewTitle}>Role overview</Text>
          <Text style={styles.overviewText} numberOfLines={5}>{job.description}</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.actionPass]} onPress={onPass} activeOpacity={0.8}>
          <Ionicons name="close" size={24} color="#B03A3A" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionSave]} onPress={onSave} activeOpacity={0.8}>
          <Ionicons name="heart-outline" size={24} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.actionLike]} onPress={onLike} activeOpacity={0.8}>
          <Ionicons name="checkmark" size={24} color="#2D8C22" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#F7F7F7',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#DDD',
    overflow: 'hidden',
  },

  // Decorative header
  cardHeader: {
    height: 108,
    backgroundColor: '#C5D8F7',
    overflow: 'hidden',
  },
  cardHeaderWave: {
    position: 'absolute',
    bottom: -55,
    left: -60,
    right: -60,
    height: 110,
    backgroundColor: '#F7F7F7',
    borderRadius: 80,
  },

  // Body
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 16,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  companyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  companyName: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textMuted,
    letterSpacing: -0.42,
  },
  matchBadge: {
    backgroundColor: Colors.white,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  matchText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.textMuted,
    letterSpacing: -0.36,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 34,
    color: Colors.black,
    letterSpacing: -1.02,
    lineHeight: 36,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F0FC',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: FontFamily.regular,
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: -0.3,
  },
  overview: {
    gap: 6,
    flex: 1,
  },
  overviewTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 14,
    color: Colors.textMuted,
    letterSpacing: -0.42,
  },
  overviewText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
    letterSpacing: -0.39,
  },

  // Action buttons
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
  },
  actionBtn: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPass: {
    backgroundColor: '#F8ABAB',
  },
  actionSave: {
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionLike: {
    backgroundColor: '#A3F096',
  },
});
