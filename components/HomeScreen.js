import { StyleSheet, Text, View, Image, TextInput, StatusBar, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import {useState} from "react"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useCountry } from '../context/countryContext';

export default function HomeScreen() {
  const [input, setInput] = useState(null); // to catch the text input
  const[countryISOCode, setCountryISOCode] = useState(null)

  const[countries] = useCountry()

  function findISOCode() { 
    const searchedCountry = countries.find((country) => country.name == input)
    searchedCountry ? setCountryISOCode(searchedCountry.code) :
      Alert.alert(
        "Country Not Found!",
        "Please refer to the Countries tab to check the proper country name",
        { text: "OK", onPress: () => console.log("OK Pressed") }
      );
  }

  return (
    <KeyboardAwareScrollView>
        <View>
          <Image source={require("../assets/worldMap.jpg")} style={styles.image}/>
          <View style={styles.container}>
            <Text style={{textAlign: "center", fontSize: 15, fontWeight: "bold", color: "#1B96C2"}}>Find any country ISO codes, which are internationally recognized codes that designate every country a two or three letter combination </Text>
            <View style={styles.innerContainer}>
              {countries ? <Text style={{color:"red", fontSize: 16, fontWeight:"bold"}}>The ISO Code is: {countryISOCode}</Text>:
                <ActivityIndicator size="large" color="red"/>
              }
              <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Enter Any Country Name"
              />
              <TouchableOpacity style={styles.button} onPress={findISOCode}>
                <Text style={{color:"#94D902", fontSize: 20, fontWeight: "bold"}}>Find</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      <StatusBar backgroundColor="red"/>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding:20,
    height: 310
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    padding:20,
    marginTop: 10
  },
  image: {
    width: '100%',
    height: 240,
  },
  input: {
    height: 40,
    width: 250,
    margin: 12,
    padding: 10,
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
    fontWeight: "bold",
    color: "#94D002",
    fontSize: 18
  },
  button: {
    borderRadius: 16,
    width: 100,
    height:35,
    backgroundColor: "#1B96C2",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10
  }
});


