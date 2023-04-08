import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import  { authActions } from '../store/auth';
import { BenefecierActions } from '../store/Benefecier-slice';
import { TransferActions } from '../store/Transfer-slice';
import CustomText from '../components/UI/CustomText';
import auth from '@react-native-firebase/auth';

const Logout = () => {
  const dispatch=useDispatch();
  const navigation=useNavigation();
  useLayoutEffect(()=>{
        dispatch(authActions.logout());
        dispatch(BenefecierActions.removeBeneficiers());
        dispatch(TransferActions.removeTransfer());
        navigation.navigate('RegisterScreen');
  },[])
  useEffect(()=>{
        auth().signOut().then(()=>console.log('SignedOut----------------------'))
  },[])
  return (
    <Pressable>
      <View>
      <CustomText>Logout</CustomText>
    </View>
    </Pressable>
  )
}

export default Logout

const styles = StyleSheet.create({})