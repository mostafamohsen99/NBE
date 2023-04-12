import { View, StyleSheet,Pressable} from 'react-native'
import React from 'react'
import FirstSection from '../components/MobileNumber/FirstSection'
import MobileForm from '../components/MobileNumber/MobileForm'
import {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';




export default function MobileNumber() {

  const navigation=useNavigation();
  const[mobileNumber,setMobileNumber]=useState('');
  const[mobNumberFocus,setMobNumberFocus]=useState(false);
  function mobileNumberFocusHandler()
  {
    setMobNumberFocus(true);
  }
  function mobileNumberHandler(mobNumber)
  {
    setMobileNumber(mobNumber);
    
  }
  function nextHandler()
  {
    navigation.navigate('SecondMobNumber',{
      mobNumber:mobileNumber,
      position:'MobileNumber'
    });
  }
  function BackgroundHandler()
  {
    setMobNumberFocus(false);
  }
  return (
      <View style={styles.container}>
      <Pressable
    onPress={BackgroundHandler}
    >
      <FirstSection/>
      <View>
      </View>
      <MobileForm
      mobileNumberHandler={mobileNumberHandler}
      nextHandler={nextHandler}
      mobNumberFocus={mobNumberFocus}
      mobileNumberFocusHandler={mobileNumberFocusHandler}
      mobileNumber={mobileNumber}
      />
      </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
      flex:1,
        backgroundColor:'#E5E5E5'
    }
})