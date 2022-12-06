import { StyleSheet, Text, View,FlatList, StatusBar, ActivityIndicator} from 'react-native';
import { useCountry } from '../context/countryContext';

export default function CountriesScreen() {
  const[countries] = useCountry()
  
  const Item = ({ country }) => (
    <View style={styles.item}>
      <Text style={styles.country}>{country}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item country={item.name} />
  );

  return (
    <View style={styles.container}>
      <Text style={{color:"red", fontSize: 18, fontWeight:"bold", marginTop: 30, marginBottom: 15}}>The List of  the World Countries</Text>
      { countries? 
      <FlatList
        data={countries}
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
  },
  item: {
    // backgroundColor: 'gray',
    paddingTop: 25,
    // marginVertical: 8,
    borderBottomColor: "#1B96C2",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  country: {
    fontSize: 20,
    color: "#1B96C2",
    fontWeight: "bold"
  },
  indicator: {
  }
});


