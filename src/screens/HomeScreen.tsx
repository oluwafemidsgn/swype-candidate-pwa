import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontFamily } from '../theme';
import JobCard, { CARD_WIDTH, CARD_HEIGHT } from '../components/JobCard';
import { MOCK_JOBS } from '../data/mockJobs';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 220;

type Tab = 'swipe' | 'saved' | 'messages' | 'profile';

export default function HomeScreen() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('swipe');

  const position = useRef(new Animated.ValueXY()).current;

  // Opacity for APPLY / PASS overlays
  const applyOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 5],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const passOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 5, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      // Only activate on actual movement so action buttons still fire
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > 6 || Math.abs(dy) > 6,
      onPanResponderMove: (_, { dx, dy }) => {
        position.setValue({ x: dx, y: dy });
      },
      onPanResponderRelease: (_, { dx }) => {
        if (dx > SWIPE_THRESHOLD) {
          animateSwipe('right');
        } else if (dx < -SWIPE_THRESHOLD) {
          animateSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const animateSwipe = (direction: 'left' | 'right') => {
    const toX = direction === 'right' ? SCREEN_WIDTH + 100 : -SCREEN_WIDTH - 100;
    Animated.timing(position, {
      toValue: { x: toX, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(advanceCard);
  };

  const advanceCard = () => {
    setCurrentIndex((prev) => prev + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: false,
    }).start();
  };

  const visibleJobs = jobs.slice(currentIndex, currentIndex + 3);

  const renderCards = () => {
    if (visibleJobs.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle-outline" size={56} color="#DDD" />
          <Text style={styles.emptyTitle}>You're all caught up!</Text>
          <Text style={styles.emptySubtitle}>Check back later for new opportunities.</Text>
        </View>
      );
    }

    return visibleJobs
      .slice()
      .reverse()
      .map((job, reversedIndex) => {
        const stackIndex = visibleJobs.length - 1 - reversedIndex; // 0 = front
        const isTopCard = stackIndex === 0;

        if (isTopCard) {
          return (
            <Animated.View
              key={job.id}
              style={[
                styles.cardContainer,
                {
                  transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate },
                  ],
                  zIndex: 10,
                },
              ]}
              {...panResponder.panHandlers}
            >
              {/* APPLY stamp */}
              <Animated.View style={[styles.stamp, styles.stampApply, { opacity: applyOpacity }]}>
                <Text style={[styles.stampText, { color: '#27AE60' }]}>APPLY</Text>
              </Animated.View>
              {/* PASS stamp */}
              <Animated.View style={[styles.stamp, styles.stampPass, { opacity: passOpacity }]}>
                <Text style={[styles.stampText, { color: '#E74C3C' }]}>PASS</Text>
              </Animated.View>

              <JobCard
                job={job}
                onPass={() => animateSwipe('left')}
                onSave={() => { /* save logic */ }}
                onLike={() => animateSwipe('right')}
              />
            </Animated.View>
          );
        }

        // Back cards: scale down and rotate slightly
        const scale = 1 - stackIndex * 0.04;
        const backRotation = stackIndex === 1 ? '-1.37deg' : '1.37deg';

        return (
          <View
            key={job.id}
            style={[
              styles.cardContainer,
              {
                transform: [{ scale }, { rotate: backRotation }],
                zIndex: 10 - stackIndex,
              },
            ]}
          >
            <JobCard job={job} />
          </View>
        );
      });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.searchPill} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={20} color="#969696" />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={22} color="#606060" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={22} color="#606060" />
        </TouchableOpacity>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Good morning Ade</Text>
        <Text style={styles.greetingSubtitle}>Lets get the application started.</Text>
      </View>

      {/* Card stack */}
      <View style={styles.stackArea}>
        {renderCards()}
      </View>

      {/* Bottom tab bar */}
      <View style={styles.tabBarWrapper}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'swipe' && styles.tabItemActive]}
            onPress={() => setActiveTab('swipe')}
            activeOpacity={0.8}
          >
            <Ionicons
              name="hand-right"
              size={24}
              color={activeTab === 'swipe' ? Colors.white : '#606060'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('saved')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === 'saved' ? 'heart' : 'heart-outline'}
              size={24}
              color={activeTab === 'saved' ? Colors.primary : '#606060'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('messages')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === 'messages' ? 'chatbubble' : 'chatbubble-outline'}
              size={24}
              color={activeTab === 'messages' ? Colors.primary : '#606060'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setActiveTab('profile')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={activeTab === 'profile' ? 'person' : 'person-outline'}
              size={24}
              color={activeTab === 'profile' ? Colors.primary : '#606060'}
            />
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

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingTop: 8,
    height: 72,
  },
  searchPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    paddingHorizontal: 14,
    paddingVertical: 16,
    height: 56,
  },
  searchPlaceholder: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#969696',
    letterSpacing: -0.36,
  },
  iconBtn: {
    width: 56,
    height: 56,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Greeting
  greeting: {
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  greetingTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 20,
    color: Colors.black,
    letterSpacing: -0.6,
  },
  greetingSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    color: Colors.textMuted,
    letterSpacing: -0.42,
  },

  // Card stack
  stackArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },

  // APPLY / PASS stamps
  stamp: {
    position: 'absolute',
    top: 24,
    zIndex: 99,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  stampApply: {
    left: 20,
    borderColor: '#27AE60',
    transform: [{ rotate: '-15deg' }],
  },
  stampPass: {
    right: 20,
    borderColor: '#E74C3C',
    transform: [{ rotate: '15deg' }],
  },
  stampText: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    letterSpacing: 2,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 22,
    color: Colors.black,
    letterSpacing: -0.66,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },

  // Bottom tab bar
  tabBarWrapper: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F7F7F7',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tabItem: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
  },
  tabItemActive: {
    backgroundColor: Colors.primary,
  },
});
