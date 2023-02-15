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
    const [code, setCode] = useState()
  const [isValid, setIsValid] = useState(false);
  const [textBook, setTextBook] = useState('Not yet scanned')
  const [submit, setSubmit] = useState(false);

const bookList =[
  {
    "nameBook":"The Witcher 1",
    "nameAuthor":"andrzej sapkowski"
  },
  {
    "nameBook":"The Witcher 2",
    "nameAuthor":"andrzej sapkowski"
  },
  {
    "nameBook":"The Witcher 2",
    "nameAuthor":"andrzej sapkowski"
  },
  {
    "nameBook":"The Witcher 3",
    "nameAuthor":"andrzej sapkowski"
  }

]

  const handleBarCodeScannedBook = ({ type, data }) => {
    if (route && route.params ) {
      const { id, source } = route.params;
      try {
        setScannedBook(true);
        setCode(data);
       let codeFound = false;
        if (source === 'ScannCard') {
          bookList.forEach(book =>{
            const parsedData = JSON.parse(data);
            console.log(parsedData)
            console.log(book.nameAuthor)
            if (book.nameAuthor === parsedData[0].nameBook.trim()){
              codeFound = true;
              setIsValid(true);
              setMessage(`Vous pouvez emprunter ce livre 5 semaines`);
            }
          });
          if (!codeFound) {
            setIsValid(false);
            alert("Invalid Code", "The code you scanned is not valid. Please try again.");
          }
           
        } else if (source === 'ScannSpot') {
          setMessage(`Remettez le livre dans le spot ${id}`);
        }
        console.log('Type: ' + type + '\nData: ' + id);
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