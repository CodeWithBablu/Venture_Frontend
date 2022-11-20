import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import colors from '../config/colors'
import SPACING from '../config/SPACING'

import { Ionicons } from '@expo/vector-icons';
import { FONTS } from '../config';
import { BlurView } from 'expo-blur';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../slices/userSlices';


const Setting = ({ navigation }) => {

  const dispatch = useDispatch();

  const logout = () => {
    AsyncStorage.removeItem('user');

    const userInfo = {};
    dispatch(setUserData(userInfo));
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.dark,
    }}>
      <SafeAreaView style={{
        marginTop: StatusBar.currentHeight,
        marginBottom: SPACING * 10,
        backgroundColor: colors.dark,
      }}>

        <View style={{
          backgroundColor: colors.setting.back,
          alignItems: "center",
          borderTopLeftRadius: SPACING * 3,
          borderTopRightRadius: SPACING * 3,
        }}>

          <Text style={{
            marginTop: SPACING * 4,
            fontFamily: FONTS.bold,
            fontSize: SPACING * 2.2,
          }}>Settings</Text>

          <Text style={{
            width: "90%",
            textAlign: "center",
            marginTop: SPACING,
            fontFamily: FONTS.semiBold,
            fontSize: SPACING * 2,
            color: colors.light,
          }}>Hey! Tweak as you wish 😋️</Text>

          <ScrollView style={{
            width: "100%",
            borderTopLeftRadius: SPACING * 4,
            borderTopRightRadius: SPACING * 4,
            marginTop: SPACING * 4,
            backgroundColor: colors.dark,
          }}>

            <TouchableOpacity style={{
              marginTop: SPACING * 4,
              alignItems: "center",
            }}
              onPress={() => logout()}
            >

              <View style={{
                width: "80%",
                borderRadius: SPACING * 2,
                height: SPACING * 7,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.setting.secondary,
              }}
              >
                <Ionicons
                  style={{ width: "25%", height: SPACING * 7, padding: SPACING, backgroundColor: colors.setting.primary, borderBottomLeftRadius: SPACING * 2, borderTopLeftRadius: SPACING * 2 }}
                  name='md-log-out'
                  size={SPACING * 5}
                  color={colors.dark}
                />
                <Text style={{
                  width: "75%",
                  paddingLeft: SPACING * 3,
                  color: colors.dark,
                  fontFamily: FONTS.bold,
                  fontSize: SPACING * 2,
                }}>Logout</Text>
              </View>
            </TouchableOpacity>

          </ScrollView>

        </View>

      </SafeAreaView>
    </View>

  )
}

export default Setting