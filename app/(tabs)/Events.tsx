import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View, ScrollView } from '../../components/Themed';
import { useTailwind } from 'tailwind-rn/dist';

export default function TabTwoScreen() {
  const tw = useTailwind();
  return (
    <ScrollView>
      <Text style={tw('text-xl font-bold')}>Events</Text>
      <View style={tw('h-px my-8 w-4/5')} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/tabs/two.tsx" />
    </ScrollView>
  );
}
