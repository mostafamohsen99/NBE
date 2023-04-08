import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useEffect } from 'react';
import AirPayScreen from '../screens/AirPayScreen';

const Stack=createStackNavigator();

const AirPayStackNav= ({navigation}) => {
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
          navigation.navigate('FirstAirPayScreen')
        });
      },[]);
  return (
  <Stack.Navigator>
    <Stack.Screen
    name='FirstAirPayScreen'
    options={{
        headerShown:false
    }}
    component={AirPayScreen}
    />
  </Stack.Navigator>
  )
}

export default AirPayStackNav

const styles = StyleSheet.create({})