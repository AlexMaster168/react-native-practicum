import { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, Text } from 'react-native-paper';

interface Props {
  onPick: (uri: string) => void;
  initialUri?: string | null;
}

export function PhotoPicker({ onPick, initialUri = null }: Props) {
  const [image, setImage] = useState<string | null>(initialUri);

  const handleResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onPick(uri);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Нет доступа', 'Разрешите доступ к камере, чтобы сделать фото.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
      aspect: [16, 9],
    });
    handleResult(result);
  };

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Нет доступа', 'Разрешите доступ к галерее, чтобы выбрать фото.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });
    handleResult(result);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttons}>
        <Button mode="contained-tonal" icon="camera" onPress={takePhoto} style={styles.btn}>
          Камера
        </Button>
        <Button mode="contained-tonal" icon="image-multiple" onPress={pickFromLibrary} style={styles.btn}>
          Галерея
        </Button>
      </View>
      {image ? (
        <Image style={styles.image} source={{ uri: image }} />
      ) : (
        <Text style={styles.hint}>Фото не выбрано</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  buttons: { flexDirection: 'row', gap: 12 },
  btn: { flex: 1 },
  image: { width: '100%', height: 200, marginTop: 12, borderRadius: 12 },
  hint: { textAlign: 'center', marginTop: 12, opacity: 0.6 },
});
