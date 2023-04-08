import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';

const Stack=createStackNavigator();

const HomeStackNav = ({navigation}) => {
    useEffect(()=>{
        const unsubscribe=navigation.addListener('focus',()=>{
            navigation.navigate('HomeScreen')
        })
    },[])
  return (
   <Stack.Navigator>
    <Stack.Screen
    name='HomeScreen'
    options={{headerShown:false}}
    component={HomeScreen}
    />
   </Stack.Navigator>
  )
}

export default HomeStackNav

const styles = StyleSheet.create({})