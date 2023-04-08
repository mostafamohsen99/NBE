import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TransferFirstScreen from '../screens/TransferFirstScreen';
import SecondMobnumber from '../screens/SecondMobnumber';

const Stack=createStackNavigator();

const TransferStackNav = ({navigation}) => {
  useEffect(()=>{
    const unsubscribe=navigation.addListener('focus',()=>{
      navigation.navigate('TransferFirstScreen')
    })
  },[])
  return (
    <Stack.Navigator
    initialRouteName='TransferFirstScreen'
    screenOptions={{headerShown:'false'}}
    component={TransferFirstScreen}
    >
    <Stack.Screen
    name='TransferFirstScreen'
    options={{headerShown:false}}
    component={TransferFirstScreen}
    />
    
    </Stack.Navigator>
  )
}

export default TransferStackNav

const styles = StyleSheet.create({})