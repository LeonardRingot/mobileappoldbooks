import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
export default function Home(){
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Cliquez sur le bouton Scanner une carte pour 
emprunter  un livre et cliquez sur le bouton 
Scanner un point pour rendre un livre </Text>
          <Button style={styles.button}onPress={() =>navigation.navigate('ScannCard')} title='scanner une carte'></Button>
        <Button style={styles.button} onPress={() =>navigation.navigate('ScannSpot')} title='scanner un spot'></Button>
          <StatusBar style="auto" />
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
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#5cb85c',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  text: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  });