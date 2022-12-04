import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import * as Speech from 'expo-speech';
import { Button } from 'react-native';
import { useCountry } from '../context/countryContext';

export default function PlayScreen() {
  const [isChecked, setChecked] = useState(false);

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

  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View>
      <Button title="Press to hear some words" onPress={speak} />
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