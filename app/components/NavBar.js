import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { SvgUri } from 'react-native-svg';

import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import SPACING from '../config/SPACING';
import colors from '../config/colors';

const { width } = Dimensions.get("window");

import Home from '../../assets/Navbar/Home';
import User from '../../assets/Navbar/User';
import Setting from '../../assets/Navbar/Setting';
import Tag from '../../assets/Navbar/Tag';
import Shopping from '../../assets/Navbar/Shopping';


export const NavBar = () => {
  return (
    <View style={{
      width: width,
      height: SPACING * 10,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.dark,
      elevation: 25,
    }}>
      <BlurView style={{
        width: "90%",
        height: "90%",
        borderRadius: SPACING * 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
        tint="light"
        intensity={12}
      >
        <View style={{
          width: SPACING * 5.5,
          height: SPACING * 5.5,
          borderRadius: SPACING * 2,
          backgroundColor: colors.lightBlue,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Home color={colors.dark} />
        </View>

        <View style={{
          width: SPACING * 5.5,
          height: SPACING * 5.5,
          borderRadius: SPACING * 2,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <User />
        </View>

        <View style={{
          width: SPACING * 5.5,
          height: SPACING * 5.5,
          borderRadius: SPACING * 2,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Setting />
        </View>

        <View style={{
          width: SPACING * 5.5,
          height: SPACING * 5.5,
          borderRadius: SPACING * 2,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Tag />
        </View>

        <View style={{
          width: SPACING * 5.5,
          height: SPACING * 5.5,
          borderRadius: SPACING * 2,
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Shopping />
        </View>

      </BlurView>
    </View>
  )
}
