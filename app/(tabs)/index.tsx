import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useTailwind } from 'tailwind-rn/dist';

export default function TabOneScreen() {
  const tw = useTailwind();
  return (
    <View style={tw('flex-1 items-center justify-center')}>
      <Text style={tw('text-xl font-bold')}>Home</Text>
      <View style={tw('h-px my-8 w-4/5')} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <EditScreenInfo path='app/tabs/index.tsx' />
    </View>
  );
}
