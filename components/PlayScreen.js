import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import * as Speech from 'expo-speech';
import { Button } from 'react-native';

export default function PlayScreen() {
  const [isChecked, setChecked] = useState(false);

  const speak = () => {
    const thingToSay = 'e';
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