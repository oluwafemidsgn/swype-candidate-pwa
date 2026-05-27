import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';
import StepBadge from '../components/StepBadge';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RecordPitch'>;
};

type RecordingState = 'idle' | 'recording' | 'review';

const MAX_DURATION = 120;

const PRO_TIPS = [
  'Look directly into the camera — eye contact builds trust.',
  'Keep it under 2 minutes; be concise and confident.',
  'Good lighting matters — face a window or bright light source.',
  'Start with your name, role, and what makes you stand out.',
  'Speak at a natural pace and avoid filler words.',
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function RecordPitchScreen({ navigation }: Props) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();

  const [state, setState] = useState<RecordingState>('idle');
  // timeLeft counts down while recording; frozen at elapsed time in review
  const [timeLeft, setTimeLeft] = useState(MAX_DURATION);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  // Pulse animation while recording
  useEffect(() => {
    if (state === 'recording') {
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.12, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ]),
      );
      pulseLoop.current.start();
    } else {
      pulseLoop.current?.stop();
      pulseAnim.setValue(1);
    }
  }, [state, pulseAnim]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // Auto-stop at limit
  useEffect(() => {
    if (timeLeft === 0 && state === 'recording') {
      cameraRef.current?.stopRecording();
    }
  }, [timeLeft, state]);

  const handleRecord = async () => {
    if (state === 'recording') {
      cameraRef.current?.stopRecording();
      return;
    }

    setTimeLeft(MAX_DURATION);
    setState('recording');

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      const result = await cameraRef.current?.recordAsync({ maxDuration: MAX_DURATION });
      stopTimer();

      const elapsed = MAX_DURATION - timeLeft;
      setElapsedSeconds(elapsed > 0 ? elapsed : MAX_DURATION);
      setVideoUri(result?.uri ?? null);

      // Pause the live preview to freeze on the last frame
      await cameraRef.current?.pausePreview();
      setState('review');
    } catch {
      stopTimer();
      setState('idle');
    }
  };

  const handleRetake = async () => {
    setVideoUri(null);
    setTimeLeft(MAX_DURATION);
    setElapsedSeconds(0);
    await cameraRef.current?.resumePreview();
    setState('idle');
  };

  const handleUseTake = () => {
    navigation.navigate('UploadDocuments', { videoUri });
  };

  const handleSkip = () => navigation.navigate('UploadDocuments', { videoUri: null });
  const handleBack = () => navigation.goBack();

  // Timer display logic
  const timerLabel =
    state === 'review'
      ? formatTime(elapsedSeconds)          // show how long the clip is
      : formatTime(timeLeft);               // show countdown (or 2:00 at idle)

  // --- Permission gate ---
  if (!cameraPermission || !micPermission) {
    return <View style={styles.safe} />;
  }

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionSubtitle}>
            SwypeJobs needs your camera and microphone to record your pitch video.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={async () => {
              if (!cameraPermission.granted) await requestCameraPermission();
              if (!micPermission.granted) await requestMicPermission();
            }}
          >
            <Text style={styles.permissionButtonText}>Grant access</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} style={styles.permissionSkip}>
            <Text style={styles.permissionSkipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <StepBadge current={2} total={3} />
        <Text style={styles.title}>Record your video</Text>
        <Text style={styles.subtitle}>Record your pitch video to convince us.</Text>
      </View>

      {/* Camera preview */}
      <View style={styles.cameraWrapper}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="front"
          mode="video"
        />

        {/* Timer badge */}
        <View style={styles.timerBadge}>
          <Text style={[styles.timerText, state === 'recording' && styles.timerTextRecording]}>
            {timerLabel}
          </Text>
        </View>
      </View>

      {/* Pro tips accordion */}
      <View style={[styles.tipsContainer, showTips && styles.tipsContainerOpen]}>
        <Pressable style={styles.tipsHeader} onPress={() => setShowTips((v) => !v)}>
          <Text style={styles.tipsHeaderText}>Pro tips before you hit record</Text>
          <Text style={styles.tipsChevron}>{showTips ? '▲' : '▼'}</Text>
        </Pressable>
        {showTips && (
          <View style={styles.tipsList}>
            {PRO_TIPS.map((tip, i) => (
              <Text key={i} style={styles.tipItem}>· {tip}</Text>
            ))}
          </View>
        )}
      </View>

      {/* ── Bottom controls ── */}

      {state === 'review' ? (
        // POST-RECORDING: Retake | Use this take
        <View style={styles.reviewControls}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake} activeOpacity={0.7}>
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.useButton} onPress={handleUseTake} activeOpacity={0.85}>
            <Text style={styles.useText}>Use this take</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // IDLE / RECORDING: Back | Record button | Skip
        <View style={styles.recordControls}>
          <TouchableOpacity onPress={handleBack} style={styles.sideAction}>
            <Text style={styles.sideActionText}>Back</Text>
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity
              style={[styles.recordButton, state === 'recording' && styles.recordButtonActive]}
              onPress={handleRecord}
              activeOpacity={0.8}
            >
              <View style={[styles.recordInner, state === 'recording' && styles.recordInnerActive]} />
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity onPress={handleSkip} style={styles.sideAction}>
            <Text style={styles.sideActionText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 15,
    marginBottom: 16,
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

  // Camera
  cameraWrapper: {
    flex: 1,
    marginHorizontal: 24,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  camera: {
    flex: 1,
  },
  timerBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: '#D0E1FD',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  timerText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#606060',
    letterSpacing: -0.36,
  },
  timerTextRecording: {
    color: '#C0392B',
    fontFamily: FontFamily.semiBold,
  },

  // Pro tips
  tipsContainer: {
    marginHorizontal: 24,
    marginTop: 10,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  tipsContainerOpen: {
    borderRadius: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tipsHeaderText: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#969696',
    letterSpacing: -0.36,
  },
  tipsChevron: {
    fontSize: 9,
    color: '#969696',
  },
  tipsList: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 6,
  },
  tipItem: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
    letterSpacing: -0.3,
  },

  // Record controls (idle / recording)
  recordControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
  },
  sideAction: {
    width: 60,
    alignItems: 'center',
  },
  sideActionText: {
    fontFamily: FontFamily.medium,
    fontSize: 17,
    color: Colors.textMuted,
    letterSpacing: -0.51,
  },
  recordButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  recordButtonActive: {
    backgroundColor: '#FF3B30',
  },
  recordInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
  },
  recordInnerActive: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#FFF',
  },

  // Review controls (post-recording)
  reviewControls: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
  },
  retakeButton: {
    flex: 1,
    height: 44,
    borderWidth: 0.5,
    borderColor: Colors.borderLight,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.black,
    letterSpacing: -0.48,
  },
  useButton: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  useText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },

  // Permission screen
  permissionContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  permissionTitle: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    color: Colors.black,
    textAlign: 'center',
    letterSpacing: -0.84,
  },
  permissionSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: -0.48,
  },
  permissionButton: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  permissionButtonText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
  permissionSkip: {
    paddingVertical: 8,
  },
  permissionSkipText: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
  },
});
