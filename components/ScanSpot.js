import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScannSpot(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isFromScannCard, setIsFromScannCard] = useState(true);
    const [text, setText] = useState('Not yet scanned')
    const navigation = useNavigation();
    const URL = 'http://192.168.10.107:5000'
    const [spotList, setspotList] = useState([]);
    const [isValid, setIsValid] = useState(false);
    const source="ScannSpot"
    const barcodeScannerRef = useRef();
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
     // What happens when we scan the bar code


     useEffect(() => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };
    
      fetch(`${URL}/api/spots`, requestOptions)
        .then((response) => response.json())
        .then((result) => setspotList(result))
        .catch((error) => console.log('error', error));
    }, [URL]);
  
    const handleBarCodeScanned = ({ type, data, _id }) => {
      try {
        setScanned(true);
        setText(data);
        const source = 'ScannSpot';
        let spotFound = false;
        console.log('Scanned code:', data.trim());
    
        spotList.forEach((spot) => {
          console.log('Spot:', spot);
          const spotId = spot._id;
          console.log('Spot ID:', spotId);
          console.log('Scanned code:', data.trim());
          const parsedData = JSON.parse(data);
          if (spotId === parsedData[0]._id.trim()) {
            spotFound = true;
            setIsValid(true);
            navigation.navigate('ScannBook', { spotId: spotId, source: source });
            barcodeScannerRef.current.pausePreview();
          }
        });
    
        if (!spotFound) {
          setIsValid(false);
          alert('Unknown spot', 'The spot you scanned is not known. Please try again.');
        }
    
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
      // Check permissions and return the screens
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
            <Text>Scanner un point, vous serez renvoyé au Scan livre </Text>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
            {isValid && (
        <Button
          title={'Continue to ScannBook'}
          onPress={() => {
            navigation.navigate('ScannBook', { id: spotList[0]._id, source: 'ScannSpot' });
          }}
        />
      )}
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