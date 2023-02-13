import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScannBook({navigation, route}){
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState('');
  const [isFromScannCard, setIsFromScannCard] = useState(true);
  const [scannedBook, setScannedBook] = useState(false);
  const [textBook, setTextBook] = useState('Not yet scanned')
  const [submit, setSubmit] = useState(false);
  const handleBarCodeScannedBook = ({ type, data }) => {
    if (route && route.params) {
      const { id, source } = route.params;
      try {
        setScannedBook(true);
        if (source === 'ScannCard') {
          console.log(' JE SUIS PASSE OU PAS Type: ' + type + '\nData: ' + id)
           setMessage(`Vous pouvez emprunter ce livre 5 semaines`);
           message = 'a'
        } else if (source === 'ScannSpot') {
          setMessage(`Remettez le livre dans le spot ${id}`);
        }
        console.log('Type: ' + type + '\nData: ' + id)
      } catch (error) {
        console.log(error)
      }
    }
    
  };
  
  
return (
  <View style={styles.container}>
    <Text>Scanner un livre</Text>
    <View style={styles.barcodebox}>
    {scanning && (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScannedBook}
        style={{ height: 400, width: 400 }}
      />
    )}
    </View>
    <Text>{scanning ? 'Scanning...' : 'Not scanning'}</Text>
    <Button
      title="Start scanning"
      onPress={() => setScanning(true)}
    />
    <Button
      title="Stop scanning"
      onPress={() => setScanning(false)}
    />
    <Text style={styles.maintext}>{textBook}</Text>
    <Text style={styles.message}>{message}</Text>
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
    message: {
      fontSize: 16,
      margin: 20,
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    }
  });