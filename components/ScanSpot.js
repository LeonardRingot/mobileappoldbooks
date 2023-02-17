import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default function ScannSpot(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isFromScannCard, setIsFromScannCard] = useState(true);
    const [text, setText] = useState('Not yet scanned')
    const navigation = useNavigation();
    const URL = 'http://192.168.10.109:5000'
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
          console.log(spot)
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
            <Text style={styles.header}>Scannez un point pour accéder à la page du livre</Text>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.barcodeScanner}
              />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.buttonText}>Scanner un autre point</Text>
              </TouchableOpacity>
            )}
            {isValid && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('ScannBook', { id: spotList[0]._id, source: 'ScannSpot' });
                }}
              >
                <Text style={styles.buttonText}>Continuer vers ScannBook</Text>
              </TouchableOpacity>
            )}
          </View>
        );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  maintext: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
    color: '#999',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  barcodeScanner: {
    height: '100%',
    width: '100%',
  },
  button: {
    backgroundColor: '#F25278',
    borderRadius: 32,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});