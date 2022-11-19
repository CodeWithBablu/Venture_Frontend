import { SafeAreaView, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

import colors from '../../config/colors';
import SPACING from '../../config/SPACING';
import products from "../../config/products"

import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

// const avatar = require('../../assets/avatar.jpg');
const logo = require('../../../assets/logo.png');

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import SearchFeild from "../../components/SearchField";
import Categories from "../../components/Categories";

//Data Layer ( user )
import { useDispatch } from "react-redux";
import { setUserData } from "../../../slices/userSlices";

//AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get("window");

WebBrowser.maybeCompleteAuthSession();

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch(); // Redux

  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "548656183832-mpmjsdncp1a133vlffe6kfagkivgu3c9.apps.googleusercontent.com",
    iosClientId: "548656183832-pq4p1cjmqj7mnjh0kj2n4s3j4abet68s.apps.googleusercontent.com",
    androidClientId: "548656183832-ilji6agt3q2q8rmr9h0gav19660ononp.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);

      accessToken && setUserInfo();
    }
  }, [response, accessToken]);

  const setUserInfo = async () => {


    try {
      const userDataJson = await AsyncStorage.getItem('user');

      if (userDataJson == null) {
        let res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        const userInfo = await res.json();
        setUser(userInfo);
        dispatch(setUserData(userInfo)); // store into redux
        console.log(userInfo); //  Shows User Info <=============

        try {
          const userData = JSON.stringify(userInfo)
          await AsyncStorage.setItem('user', userData);
        } catch (e) {
          // saving error
          console.log(e);
        }
      }
      else {
        const userData = await JSON.parse(userDataJson);
        setUser(userData);
        dispatch(setUserData(userData));
        console.log("Async");
        console.log(userData);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }


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
        <ScrollView>
          <View style={{
            padding: SPACING,
            flexDirection: "row",
            justifyContent: "space-between"
          }}>

            <TouchableOpacity style={{
              borderRadius: SPACING * 4,
              overflow: "hidden",
              width: SPACING * 5,
              height: SPACING * 5,
            }}>
              <BlurView style={{
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
                tint="light"
                intensity={30}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={logo}
                />
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity style={{
              width: SPACING * 5,
              height: SPACING * 5,
              overflow: "hidden",
              borderRadius: SPACING * 2,
            }}
              disabled={!request}
            >
              <BlurView style={{
                width: "100%",
                height: "100%",
                padding: SPACING / 4,
                justifyContent: "center",
                alignItems: "center",
              }}
                tint="light"
                intensity={30}
              >
                {
                  user &&
                  <>
                    <Image
                      style={{ width: "100%", height: "100%", borderRadius: SPACING * 3 }}
                      source={{ uri: `${user.picture}` }}
                    />
                  </>
                }
                {
                  user === null &&
                  <>
                    <Ionicons
                      name="person"
                      size={SPACING * 3.5}
                      onPress={() => { promptAsync() }}
                    />
                  </>
                }
              </BlurView>
            </TouchableOpacity>

          </View>

          <View style={{
            width: "80%",
            marginVertical: SPACING * 3,
          }}>
            <Text style={{
              color: colors.white,
              fontSize: SPACING * 3.5,
              fontWeight: "600",
            }}>
              Find the best fit for you
            </Text>
          </View>

          <SearchFeild />

          <Categories onChange={(id) => setActiveCategoryId(id)} />

          <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}>
            {
              products.filter((product) => {
                if (activeCategoryId === 0) {
                  return true;
                }
                return activeCategoryId === product.categoryId;
              }).map(product => (
                <View style={{
                  width: width / 2 - SPACING * 2,
                  marginBottom: SPACING,
                  overflow: "hidden",
                }}
                  key={product.id}
                >
                  <BlurView style={{
                    padding: SPACING,
                    borderRadius: SPACING * 2,
                  }}
                    tint="default"
                    intensity={20}
                  >
                    <TouchableOpacity style={{
                      height: 150,
                      width: "100%",
                    }}
                      onPress={() => navigation.navigate('ProductDetails', {
                        id: 1,
                        product: product,
                      })}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: SPACING * 2,
                        }}
                        source={product.image}
                      />

                      <View style={{
                        position: "absolute",
                        right: 0,
                        borderBottomStartRadius: SPACING * 3,
                        borderTopRightRadius: SPACING * 2,
                        overflow: "hidden",
                      }}>
                        <BlurView style={{
                          flexDirection: "row",
                          padding: SPACING - 2,
                        }}
                          tint="dark"
                          intensity={90}
                        >
                          <Ionicons
                            name="star"
                            color={colors.primary}
                            size={SPACING * 1.7}
                          />
                          <Text style={{
                            color: colors.white,
                          }}
                          >{product.rating}</Text>
                        </BlurView>
                      </View>
                    </TouchableOpacity>

                    <Text style={{
                      color: colors.light,
                      fontWeight: "600",
                      fontSize: SPACING * 1.7,
                      marginTop: SPACING,
                      marginBottom: SPACING / 2,
                    }}
                      numberOfLines={2}
                    >
                      {product.name}</Text>
                    {/* <Text numberOfLines={1} style={{ color: colors.secondary }}>{product.included}</Text> */}

                    <View style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: SPACING / 2,
                    }}>

                      <View style={{
                        flexDirection: "row",
                      }}>
                        <Text style={{
                          color: colors.primary,
                          marginRight: SPACING / 2,
                          fontSize: SPACING * 1.6,
                        }}>
                          $
                        </Text>
                        <Text style={{
                          color: colors.white,
                          fontWeight: "500",
                          fontSize: SPACING * 1.6,
                        }}>
                          {product.price}
                        </Text>
                      </View>

                      <TouchableOpacity style={{
                        backgroundColor: colors.primary,
                        padding: SPACING / 2,
                        borderRadius: SPACING,
                      }}>
                        <Ionicons
                          name="add"
                          size={SPACING * 2}
                          color={colors.white}
                        />
                      </TouchableOpacity>

                    </View>

                  </BlurView>
                </View>
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView >
    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
