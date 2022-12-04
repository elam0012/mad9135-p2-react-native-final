import { StyleSheet, Text, View, Image, Button, TextInput,
        FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import {useState, useEffect} from "react"


export default function HomeScreen() {

  const [input, setInput] = useState(null); // to catch the text input

  function buttonPressed() { // to handle the press button to display the input content
    // alert(input)
    Alert.alert(
      "Do you Want see That?",
      "Tell me more",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("../assets/worldMap.jpg")} style={styles.image}/>
      <Text>The ISO country codes are internationally recognized codes that designate every country and most of the dependent areas a two-letter combination or a three-letter combination; it is like an acronym, that stands for a country or a state. </Text>
      <Text>Find any Country ISO Code</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter Any Country Name"
      />
      <Button title='Find' onPress={buttonPressed}/>
      <Text>ISO Code</Text>
      <StatusBar backgroundColor="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 240,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  country: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  },
  indicator: {
  }
});


