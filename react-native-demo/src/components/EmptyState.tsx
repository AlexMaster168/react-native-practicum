import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export function EmptyState({ text = 'Список пуст' }: { text?: string }) {
  return (
    <View style={styles.wrap}>
      <Image source={require('../../assets/no-items.png')} style={styles.img} />
      <Text variant="bodyLarge" style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  img: { width: 200, height: 200, resizeMode: 'contain', opacity: 0.85 },
  text: { marginTop: 12, opacity: 0.6 },
});
