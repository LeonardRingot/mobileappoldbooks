import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ScannBook from './components/ScannBook';
import Home from './components/Home';
import ScannSpot from './components/ScanSpot';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScannCard from './components/ScannCard';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
      <Stack.Screen options={{ title: 'Scanner une carte' }} name="ScannCard"  component={ScannCard} />
        <Stack.Screen options={{ title: 'Scanner un point' }} name="ScannSpot"  component={ScannSpot} />
        <Stack.Screen options={{ title: 'Scanner un livre' }} name="ScannBook"  component={ScannBook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
