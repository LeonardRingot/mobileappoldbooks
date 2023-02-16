import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScannBook({navigation, route}){
  const [scanning, setScanning] = useState(false);
  let [data, setData] = useState(null)
  const [message, setMessage] = useState('');
  const [isFromScannCard, setIsFromScannCard] = useState(true);
  const [scannedBook, setScannedBook] = useState(false);
  const URL = 'http://192.168.10.107:5000'
    const [code, setCode] = useState()
  const [isValid, setIsValid] = useState(false);
  const [bookList, setBookList] = useState([]);
  const [textBook, setTextBook] = useState('Not yet scanned')

useEffect(() => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(`${URL}/api/books`, requestOptions)
    .then((response) => response.json())
    .then((result) => setBookList(result))
    .catch((error) => console.log('error', error));
}, [URL]);

const handleBarCodeScannedBook = ({ type, data }) => {
  if (route && route.params) {
    const { id, source, spotId } = route.params;
    try {
      setScannedBook(true);
      setCode(data);
      let codeFound = false;
      if (source === 'ScannCard') {
        bookList.forEach(book => {
          const parsedData = JSON.parse(data);
          console.log('c ca lundifined',parsedData)
          if (book.nameBook === parsedData[0].nameBook.trim()) {
            codeFound = true;
            setIsValid(true);
            setMessage(`Vous pouvez emprunter ce livre 5 semaines`);

            // Met à jour le livre, prend défini l'userID et met le spot ID null = pas de spot
            const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: id,
                date: new Date(),
                spotID: null
              })
            };
            fetch(`${URL}/api/books/${book._id}`, requestOptions)
              .then(response => response.json())
              .then(result => console.log('test',result))
              .catch(error => console.log('error', error));
          }
        });
        if (!codeFound) {
          setIsValid(false);
          alert("Invalid Code", "The code you scanned is not valid. Please try again.");
        }
      } else if (source === 'ScannSpot') {
        try {
          setScannedBook(true);
          setCode(data);
          const { id, source, spotId } = route.params;
      
          // Update the book record in the database with the spot ID and no user ID
          let codeFound = false;
          bookList.forEach(book => {
            const parsedData = JSON.parse(data);
            if (book.nameBook === parsedData[0].nameBook.trim()) {
              codeFound = true;
              setIsValid(true);
              setMessage(`Remettez le livre dans son spot`);
      
              // Update the book record in the database with the spot ID and no user ID
              const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  // nameBook:book.nameBook,
                  // authorBook:book.authorBook,
                  userId: null,
                  date: new Date(),
                  spotID: spotId // Use the spot ID as the new spot ID for the book
                })
                
              };
              console.log(requestOptions)
              fetch(`${URL}/api/books/${book._id}`, requestOptions)
                .then(response => response.json())
                .then(result => console.log('test',result))
                .catch(error => console.log('error', error));
            }
          });
      
          // If the book was not found in the list, show an error message
          if (!codeFound) {
            setIsValid(false);
            alert("Invalid Code", "The code you scanned is not valid. Please try again.");
          }
      
          console.log('Type: ' + type + '\nData: ' + spotId);
        } catch (error) {
          console.log(error)
        }
      }
      console.log('Type: ' + type + '\nData: ' + spotId);
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