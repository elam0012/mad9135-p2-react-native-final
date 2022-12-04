import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
      <View>
        <MapView style={styles.map} />
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Normal checkbox</Text>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} disabled value={true} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Disabled checkbox</Text>
      </View>
      <View>
        <Button title="Press to hear some words" onPress={speak} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
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
    width: 350,
    height: 350,
  },
});