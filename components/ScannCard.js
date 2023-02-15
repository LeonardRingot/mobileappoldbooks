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

const UserList = [
  {
      "name": "Gaetan",
      "code": "43DZFDFR"
  },
  {
      "name": "Marc",
      "code": "ZAFH34R"
  },
  {
      "name": "LucF",
      "code": "A4JAF432"
  },
  {
      "name": "LucV",
      "code": "FZAEU3D3A"
  },
  {
      "name": "Nico",
      "code": "U34R543"
  },
  {
      "name": "Flo",
      "code": "IN43NI32"
  },
  {
      "name": "Leonard",
      "code": "FIF34R34R"
  },
  {
      "name": "Rémy",
      "code": "Ff3AF432"
  },
  {
      "name": "Vincent",
      "code": "1R3FAF"
  },
  {
      "name": "Ghedeon",
      "code": "343DJIE"
  },
  {
      "name": "Alexis",
      "code": "34RNJ3D"
  },
  {
      "name": "Brigitte",
      "code": "JI34NF32",
  }
]
   
const handleBarCodeScanned = ({ type, data, id }) => {
  try {
    setScanned(true);
    setCode(data);
    const id = 223345
    const source = "ScannCard";
    let codeFound = false;
    console.log('first console log', data)
    
    UserList.forEach(user => {
      console.log('user: ' , user)
      console.log('User code:',data);
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
      alert("Invalid Code", "The code you scanned is not valid. Please try again.");
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
            {scanned && <Button onPress={()=>navigation.push('ScannBook')} title='Scanner un livre'></Button>}
          {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
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