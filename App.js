import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './components/HomeScreen';
import PlayScreen from './components/PlayScreen';
import RecordsScreen from './components/RecordsScreen';
import CountriesScreen from './components/CountriesScreen';
import { useKeepAwake } from 'expo-keep-awake';

export default function App() {

  const Tab = createBottomTabNavigator();

  useKeepAwake()

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {/* <SafeAreaView> */}
          <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen}/>
            <Tab.Screen name='Countries' component={CountriesScreen}/>
            <Tab.Screen name='Play' component={PlayScreen}/>
            <Tab.Screen name='Records' component={RecordsScreen}/>
          </Tab.Navigator>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
