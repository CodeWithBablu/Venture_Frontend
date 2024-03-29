import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreens/HomeScreen';
import ProductDetails from './HomeScreens/ProductDetails';
import { StatusBar } from 'expo-status-bar';

import colors from '../config/colors';

const HomeStack = createNativeStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName='HomeScreen' screenOptions={{
      headerShown: false,
    }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ProductDetails" component={ProductDetails} />
    </HomeStack.Navigator>
  )
}

export default Home