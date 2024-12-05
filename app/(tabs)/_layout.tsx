import { Tabs } from 'expo-router';
import { TabBar } from '@/app/components/TabBar';

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="index" options={{ title: 'Home',  headerShown: false }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop',  headerShown: false }} /> {/* Updated route */}
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}