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
    const idSpot = 22;
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
     const handleBarCodeScanned = ({ type, data }) => {
      try{
        setScanned(true);
        setText(data)
        setIsFromScannCard(false);
        navigation.navigate('ScannBook', { id: idSpot }) 
      }catch (error) {
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
            {/* {scanned && <Button onPress={()=>navigation.push('ScannBook')} title='Scanner un livre'></Button>} */}
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