import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScannBook(){
  const [scanning, setScanning] = useState(false);
  const [scannedBook, setScannedBook] = useState(false);
  const [textBook, setTextBook] = useState('Not yet scanned')
  const [submit, setSubmit] = useState(false);
    console.log('ScannBook component loaded');
  
  //  // What happens when we scan the bar code
   const handleBarCodeScannedBook = ({ type, data }) => {
    try{
      setScannedBook(true);
      setTextBook(data)
    console.log('Type: ' + type + '\nData: ' + data)
    }catch(error)
    {
      console.log(error)
    }
    
  };
return (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    {scanning && (
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScannedBook}
        style={{ height: 400, width: 400 }}
      />
    )}
    <Text>{scanning ? 'Scanning...' : 'Not scanning'}</Text>
    <Button
      title="Start scanning"
      onPress={() => setScanning(true)}
    />
    <Button
      title="Stop scanning"
      onPress={() => setScanning(false)}
    />
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