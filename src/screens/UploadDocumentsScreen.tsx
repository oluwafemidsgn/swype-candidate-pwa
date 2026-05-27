import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';
import { Colors, FontFamily } from '../theme';
import StepBadge from '../components/StepBadge';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UploadDocuments'>;
  route: RouteProp<RootStackParamList, 'UploadDocuments'>;
};

type PickedFile = {
  name: string;
  uri: string;
  size?: number;
  mimeType?: string;
};

function formatBytes(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type UploadZoneProps = {
  label: string;
  file: PickedFile | null;
  onPick: () => void;
  onRemove: () => void;
  loading: boolean;
};

function UploadZone({ label, file, onPick, onRemove, loading }: UploadZoneProps) {
  return (
    <View style={zoneStyles.wrapper}>
      <Text style={zoneStyles.label}>{label}</Text>
      <TouchableOpacity
        style={[zoneStyles.zone, file && zoneStyles.zoneFilled]}
        onPress={file ? undefined : onPick}
        activeOpacity={file ? 1 : 0.7}
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : file ? (
          <View style={zoneStyles.fileRow}>
            <View style={zoneStyles.fileIcon}>
              <Text style={zoneStyles.fileIconText}>📄</Text>
            </View>
            <View style={zoneStyles.fileMeta}>
              <Text style={zoneStyles.fileName} numberOfLines={1}>{file.name}</Text>
              {file.size ? (
                <Text style={zoneStyles.fileSize}>{formatBytes(file.size)}</Text>
              ) : null}
            </View>
            <TouchableOpacity style={zoneStyles.removeBtn} onPress={onRemove} hitSlop={12}>
              <Text style={zoneStyles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={zoneStyles.placeholder}>Click to upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const zoneStyles = StyleSheet.create({
  wrapper: { gap: 10 },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  zone: {
    height: 92,
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  zoneFilled: {
    borderColor: '#0F65EF',
    borderWidth: 0.5,
    backgroundColor: '#F0F6FF',
  },
  placeholder: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: '#969696',
    letterSpacing: -0.36,
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
  },
  fileIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#E8F0FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileIconText: { fontSize: 18 },
  fileMeta: { flex: 1 },
  fileName: {
    fontFamily: FontFamily.semiBold,
    fontSize: 13,
    color: Colors.black,
    letterSpacing: -0.3,
  },
  fileSize: {
    fontFamily: FontFamily.regular,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  removeBtn: { padding: 4 },
  removeText: { fontSize: 14, color: Colors.textMuted },
});

// ─── Main Screen ────────────────────────────────────────────────────────────

const CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const CERT_TYPES = [...CV_TYPES, 'image/jpeg', 'image/png'];

export default function UploadDocumentsScreen({ navigation }: Props) {
  const [cv, setCv] = useState<PickedFile | null>(null);
  const [certs, setCerts] = useState<PickedFile | null>(null);
  const [portfolio, setPortfolio] = useState('');
  const [cvLoading, setCvLoading] = useState(false);
  const [certsLoading, setCertsLoading] = useState(false);

  const pickFile = async (
    types: string[],
    onPicked: (f: PickedFile) => void,
    setLoading: (v: boolean) => void,
  ) => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: types,
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        onPicked({ name: asset.name, uri: asset.uri, size: asset.size, mimeType: asset.mimeType });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAllGood = () => {
    navigation.navigate('Home');
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
          <View style={styles.header}>
            <StepBadge current={3} total={3} />
            <Text style={styles.title}>Upload documents</Text>
            <Text style={styles.subtitle}>Upload your cv and any certificates here.</Text>
          </View>

          {/* Upload zones */}
          <View style={styles.fields}>
            <UploadZone
              label="CV"
              file={cv}
              loading={cvLoading}
              onPick={() => pickFile(CV_TYPES, setCv, setCvLoading)}
              onRemove={() => setCv(null)}
            />
            <UploadZone
              label="Professionals certificates"
              file={certs}
              loading={certsLoading}
              onPick={() => pickFile(CERT_TYPES, setCerts, setCertsLoading)}
              onRemove={() => setCerts(null)}
            />

            {/* Portfolio link */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Portfolio/ website link</Text>
              <TextInput
                style={styles.linkInput}
                placeholder="www."
                placeholderTextColor="#969696"
                value={portfolio}
                onChangeText={setPortfolio}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
              />
            </View>
          </View>

          <View style={styles.spacer} />
        </ScrollView>

        {/* All good button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.allGoodButton}
            activeOpacity={0.85}
            onPress={handleAllGood}
          >
            <Text style={styles.allGoodText}>All good</Text>
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
  flex: { flex: 1 },
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
    lineHeight: 44,
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
    gap: 20,
  },
  fieldGroup: {
    gap: 10,
  },
  fieldLabel: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.textMuted,
    letterSpacing: -0.48,
    lineHeight: 22,
  },
  linkInput: {
    backgroundColor: '#F6F6F6',
    borderWidth: 0.5,
    borderColor: '#DDD',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: FontFamily.regular,
    fontSize: 12,
    color: Colors.black,
    letterSpacing: -0.36,
  },
  spacer: { height: 24 },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
    backgroundColor: Colors.background,
  },
  allGoodButton: {
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allGoodText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: Colors.white,
    letterSpacing: -0.48,
  },
});
