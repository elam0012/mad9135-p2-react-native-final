import { StyleSheet, Text, View, Image, Button, TextInput,
        FlatList, StatusBar, ActivityIndicator, Alert } from 'react-native';
import {useState, useEffect} from "react"

const Item = ({ country }) => (
  <View style={styles.item}>
    <Text style={styles.country}>{country}</Text>
  </View>
);

export default function HomeScreen() {

  const [input, setInput] = useState(null); // to catch the text input
  const[data, setData] = useState(null)

  const renderItem = ({ item }) => (
    <Item country={item.name} />
  );

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

  useEffect(() => {
    fetchData()
    async function fetchData(){
      const data = await import("../data/countries")
      setData(data.countries)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require("../assets/profile.jpg")} style={styles.image}/>
      <Text>Welcome Back to the Best App Ever!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="useless placeholder"
      />
      <Button title='Button' onPress={buttonPressed}/>
      { data? 
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.code}
      /> :
      <ActivityIndicator size="large" color="red" style={styles.indicator}/>
      }
      <StatusBar backgroundColor="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
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


