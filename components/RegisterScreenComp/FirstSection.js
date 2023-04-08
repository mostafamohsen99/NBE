import { View,Image, StyleSheet,Text} from 'react-native'
import React from 'react'
import Button from '../UI/Button'
import {useState,useEffect} from 'react';
import {I18nManager} from "react-native";

export default function FirstSection({onPress,language,setLanguage}) {
  return (
    <View>
        <View style={styles.firstSection}>
            <Button style={[styles.AR_button,styles.AR_button_text]} 
            onPress={onPress}
            >{language}
            </Button>
            <Image
            style={styles.bankImage}
            source={require('../../assets/images/logo_2.png')}
            />
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    AR_button:{
        backgroundColor:'white',
        color:'green',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:8,
        paddingVertical:10,
        borderRadius:8
    },
    AR_button_text:{
        color:'#007236',
        fontFamily:'Roboto-Bold',
        fontSize:15,
        fontStyle:'normal'
    },
    firstSection:
    {
        marginTop:'10%',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:25
    }
})