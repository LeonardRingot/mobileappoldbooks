import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScannCard(){
  const [scanned, setScanned] = useState(false);
  const [isFromScannCard, setIsFromScannCard] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState('Not yet scanned')
  const navigation = useNavigation();
  const barcodeScannerRef = useRef();
  const [userList, setUserList] = useState([]);
  const URL = 'http://192.168.0.47:5000'
  const [code, setCode] = useState()
  const [isValid, setIsValid] = useState(false);
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }
   // Request Camera Permission
useEffect(() => {
askForCameraPermission();
}, []);


useEffect(() => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(`${URL}/api/list`, requestOptions)
    .then((response) => response.json())
    .then((result) => setUserList(result))
    .catch((error) => console.log('error', error));
}, [URL]);

const handleBarCodeScanned = ({ type, data, id }) => {
  try {
    setScanned(true);
    setText(data);
    const source = 'ScannCard';
    let codeFound = false;
    console.log('Scanned code:', data.trim());

    userList.forEach((user) => {
      console.log('User:', user);
      const id = user.code;
      console.log('User code:', user.code);
      console.log('Scanned code:', data.trim());
      const parsedData = JSON.parse(data);
      if (user.code === parsedData[0].code.trim()){
        codeFound = true;
        setIsValid(true);
        navigation.navigate('ScannBook', { id: id, source: source });
        barcodeScannerRef.current.pausePreview();
      }
    });

    if (!codeFound) {
      setIsValid(false);
      alert('Unknown user', 'The user you scanned is not known. Please try again.');
    }

    setIsFromScannCard(true);
  } catch (error) {
    console.log(error);
  }
};
   
   useEffect(() => {
    return () => {
      return () => {
        if (barcodeScannerRef.current) {
          barcodeScannerRef.current.pausePreview();
        }
      };
    };
  }, []);
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Pas d'accès à la camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
      return (
        <View style={styles.container}>
            <Text>Scanner une carte, vous serez renvoyé au Scan livre </Text>
          <View style={styles.barcodebox}>
            <BarCodeScanner
            ref={barcodeScannerRef}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
          </View>
          <Text style={styles.maintext}>{text}</Text>
          {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
          {isValid === false && <Text>Unknown user</Text>}
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