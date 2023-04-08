import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ATMS from '../screens/ATMS';
import { useEffect } from 'react';

const Stack=createStackNavigator();

const AtmsStackNav = ({navigation}) => {
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
          navigation.navigate('FirstAtmScreen')
        });
      },[]);
  return (
  <Stack.Navigator>
    <Stack.Screen
    name='FirstAtmScreen'
    options={{
        headerShown:false
    }}
    component={ATMS}
    />
  </Stack.Navigator>
  )
}

export default AtmsStackNav

const styles = StyleSheet.create({})