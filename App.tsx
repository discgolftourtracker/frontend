import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';

export default function App() {
  const tw = useTailwind();
  return (
    // @ts-ignore - Tailwind provider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <View style={styles.container}>
        <Text style={tw('text-red-500')}>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
