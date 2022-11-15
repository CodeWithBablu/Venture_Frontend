import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// web:  548656183832-mpmjsdncp1a133vlffe6kfagkivgu3c9.apps.googleusercontent.com

//Ios:  548656183832-pq4p1cjmqj7mnjh0kj2n4s3j4abet68s.apps.googleusercontent.com

//Android:  548656183832-ilji6agt3q2q8rmr9h0gav19660ononp.apps.googleusercontent.com

import Home from "./app/screens/Home";
import ProductDetails from './app/screens/ProductDetails';
import { useEffect, useState } from 'react';
import colors from './app/config/colors';

const Stack = createNativeStackNavigator();


export default function App() {



  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.dark} style="inverted" />
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
