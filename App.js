import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from './components/HomeScreen';
import PlayScreen from './components/PlayScreen';
import CountriesScreen from './components/CountriesScreen';
import { useKeepAwake } from 'expo-keep-awake';
import { CountryProvider } from './context/countryContext';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {

  const Tab = createBottomTabNavigator();

  useKeepAwake()

  return (
    <CountryProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          {/* <SafeAreaView> */}
            <Tab.Navigator
            screenOptions={{
            headerStyle: { backgroundColor: "#1B96C2" },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20
            },
            tabBarActiveTintColor: "#1B96C2",
            tabBarInactiveTintColor: "#1B96C2"
          }}>
              <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                  tabBarIcon: ({ focused, size, color }) => (
                    focused ? <Fontisto name="world" size={24} color="#1B96C2" /> :
                      <Fontisto name="world-o" size={24} color="#1B96C2" />
                  )
                }} 
                />
              <Tab.Screen
              name='Countries'
              component={CountriesScreen}
              options={{
                  tabBarIcon: ({ focused, size, color }) => (
                    focused ? <FontAwesome5 name="list-alt" size={24} color="#1B96C2" /> :
                      <Foundation name="list-bullet" size={24} color="#1B96C2" />
                  )
                }} 
              />
              <Tab.Screen
              name='Play'
              component={PlayScreen}
              options={{
                  tabBarIcon: ({ focused, size, color }) => (
                    focused ? <FontAwesome name="search" size={24} color="#1B96C2" /> :
                      <AntDesign name="search1" size={24} color="#1B96C2" />
                  )
                }} 
              />
            </Tab.Navigator>
          {/* </SafeAreaView> */}
        </SafeAreaProvider>
      </NavigationContainer>
    </CountryProvider>
  );
}
