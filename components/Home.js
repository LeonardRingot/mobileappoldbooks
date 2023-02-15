import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
export default function Home(){
    const navigation = useNavigation();
  
    return (
      <LinearGradient  
        colors={['#0568b8', '#00d4ff']} style={styles.container}
      >
          <Text style={styles.text}>Cliquez sur le bouton Scanner une carte pour 
emprunter  un livre et cliquez sur le bouton 
Scanner un point pour rendre un livre </Text>

        <TouchableOpacity 
            style={styles.firstButton} 
            onPress={() =>navigation.navigate('ScannCard')}
          >
            <Text style={styles.buttonText}>Scanner une carte</Text>
          </TouchableOpacity>
        <TouchableOpacity  style={styles.button}
        onPress={() =>navigation.navigate('ScannSpot')}
        >
 <Text style={styles.buttonText}>Scanner un point</Text>
        
        
        </TouchableOpacity>
        </LinearGradient>
      );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstButton: {
    marginTop: 20,
    padding: 15,
    width: 200,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 15,
    width: 200,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'red'
  },
  text: {
    margin: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  });