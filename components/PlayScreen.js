import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Speech from 'expo-speech';
import { useCountry } from '../context/countryContext';
import CountDown from 'react-native-countdown-component';

export default function PlayScreen() {
  const[countries] = useCountry()
  const [shuffledCountries, setShuffledCountries] = useState(countries.map(country => country.name))
  const[counter, setCounter] = useState(shuffledCountries.length)
  const[until, setUntil] = useState(30)
  const[start, setStart] = useState(false)
  const[foundMonitor, setFoundMonitor] = useState(0)

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  const speak = () => {
    setFoundMonitor(0)
    setUntil(0)
    if (counter == shuffledCountries.length || counter == 0) {
      setUntil(0)
      setShuffledCountries(shuffle(shuffledCountries))

    }
    setCounter(counter - 1)
    const thingToSay = shuffledCountries[counter - 1];
    Speech.speak(thingToSay);
  };

  const found = () => {
    if (counter == shuffledCountries.length) {
      Alert.alert(
      "listen the country name first!",
      `Please click on the red text below the map to hear the country name`,
      { text: "OK", onPress: () => console.log("OK Pressed") }
      );
      return
    }
    setFoundMonitor(1)
    setUntil(30)
    Alert.alert(
      "Great Job !!!",
      `You have found ${shuffledCountries[counter]} in less than 30 seconds`,
      { text: "OK", onPress: () => console.log("OK Pressed") }
    );
  }

  const notFound = () => {
    if (foundMonitor == 1) return
    setUntil(30)
    Alert.alert(
      "Country not Found :(",
      `You were not able to find ${shuffledCountries[counter]} in less than 30 seconds`,
      { text: "OK", onPress: () => console.log("OK Pressed") }
    );
  }

  const startPlay = () => {
    setStart(true)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      {start ? 
        <>
        <TouchableOpacity onPress={speak}>
          <Text style={{color:"red", fontSize: 20, fontWeight:"bold", marginVertical: 32}}>Press here to hear the Country</Text>
        </TouchableOpacity>
        <CountDown
          size={25}
          until={until}
          onFinish={notFound}
          digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
          digitTxtStyle={{color: '#1B96C2'}}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{color: '#1CC625'}}
          timeToShow={['S']}
          timeLabels={{m: null, s: null}}
          showSeparator
          style={{marginBottom: 16}}
        />
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.buttonNext} onPress={speak}>
              <Text style={{color:"yellow", fontSize: 20, fontWeight: "bold"}}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={found}>
              <Text style={{color:"#94D902", fontSize: 20, fontWeight: "bold"}}>Found</Text>
            </TouchableOpacity>
          </View>
        </>:
        <>
          <Text style={{marginVertical: 32, marginHorizontal: 16, textAlign: "center", fontSize: 15, fontWeight: "bold", color: "#1B96C2"}}>Let's have some fun and challenge. Test your ability to find at least one country in less than 30 seconds. press and listen to which country you need to find. If it is hard, you still have another chance by clicking on Next button. Let's find it!!</Text>
          <TouchableOpacity style={styles.button} onPress={startPlay}>
            <Text style={{color:"#94D902", fontSize: 20, fontWeight: "bold"}}>Start</Text>
          </TouchableOpacity>
        </>
      }
      <StatusBar backgroundColor="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
  },
  map: {
    width: "100%",
    height: 240,
  },
  button: {
    borderRadius: 16,
    width: 100,
    height:35,
    backgroundColor: "#1B96C2",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
    marginLeft: 10
  },
  buttonNext: {
    borderRadius: 16,
    width: 100,
    height:35,
    backgroundColor: "red",
    alignItems: 'center',
    justifyContent: "center",
    marginTop: 10,
    marginRight: 10
  },
  bottom: {
    flexDirection: 'row',
  }
});