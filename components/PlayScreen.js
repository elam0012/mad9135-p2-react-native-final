import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Speech from 'expo-speech';
import { Button } from 'react-native';
import { useCountry } from '../context/countryContext';
import CountDown from 'react-native-countdown-component';


export default function PlayScreen() {
  const [isChecked, setChecked] = useState(false);
  const [country, setCountry] = useState(null);

  const[countries] = useCountry()
  const shuffledCountries = countries

  let i = 0 // counter for teh Countries array length

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
    if (i == 0) {
      shuffle(shuffledCountries)
      i = shuffledCountries.length
    }
    i--
    const thingToSay = shuffledCountries[i].name;
    Speech.speak(thingToSay);
  };

  const found = () => {
    Alert.alert(
      "Great Job !!!",
      `You have found ${shuffledCountries[i].name} in less than 30 seconds`,
      { text: "OK", onPress: () => console.log("OK Pressed") }
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View>
      <Button title="Press to hear some words" onPress={speak} />
      <CountDown
        size={30}
        until={30}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
        separatorStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: null, s: null}}
        showSeparator
      />
      <Button title='Found' onPress={found}/>
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