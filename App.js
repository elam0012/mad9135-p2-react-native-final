import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './components/HomeScreen';
import OtherScreen from './components/OtherPage';

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* <SafeAreaView> */}
          <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Other' component={OtherScreen}/>
          </Tab.Navigator>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
