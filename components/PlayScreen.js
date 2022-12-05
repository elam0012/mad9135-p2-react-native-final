import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Speech from 'expo-speech';
import { Button } from 'react-native';
import { useCountry } from '../context/countryContext';
import CountDown from 'react-native-countdown-component';


export default function PlayScreen() {
  // const [isChecked, setChecked] = useState(false);
  // const [country, setCountry] = useState(null);
  const[until, setUntil] = useState(0)
  const[counter, setCounter] = useState(0)
  const[isRunning, setIsRunning] = useState(false)
  const[start, setStart] = useState(false)

  const[countries] = useCountry()
  const shuffledCountries = countries

  let i = 0

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
    console.log(i)
    
    // setUntil(0)
    setIsRunning(true)
    if (i == 0) {
      setUntil(0)
      shuffle(shuffledCountries)
      setCounter(shuffledCountries.length)
    }
    setCounter(i--)
    const thingToSay = shuffledCountries[counter].name;
    Speech.speak(thingToSay);
  };

  const found = () => {
    setUntil(30)
    console.log(i)
    Alert.alert(
      "Great Job !!!",
      `You have found ${shuffledCountries[counter].name} in less than 30 seconds`,
      { text: "OK", onPress: () => console.log("OK Pressed") }
    );
  }

  const startPlay = () => {
    setStart(true)
    setUntil(30)
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      {/* <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View> */}
      {start ? 
      
      
      <>
      <Button title="Press to hear the Country" onPress={speak} />
      <CountDown
        size={30}
        until={until}
        // onFinish={notFound}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['S']}
        timeLabels={{m: null, s: null}}
        showSeparator
        running={isRunning}
      />
      <Button title='Found' onPress={found}/>
      </>:
      <>
        <Text>Description</Text>
        <Button title='Start' onPress={startPlay}/>
      </>
    }
      <StatusBar backgroundColor="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 16,
    // marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  map: {
    width: "100%",
    height: 240,
  },
});