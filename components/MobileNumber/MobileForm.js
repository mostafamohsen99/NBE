import { View, Text, StyleSheet,Image,TextInput } from 'react-native'
import React from 'react'
import Button from '../UI/Button'
import Footer from './Footer';
import Input from '../UI/Input';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n/i18n';
import CustomText from '../UI/CustomText';

export default function MobileForm({mobileNumberHandler,nextHandler,mobileNumber}) {
    const langSelector=useSelector(state=>state.lang.lang);
    const {t, i18n} = useTranslation();
    useEffect(()=>{
        i18n.changeLanguage(langSelector);
    },[])
  return (
    <View>
        <View style={styles.MobileNumberView}>
            <CustomText style={styles.MobileNumber}>{t('Mobile number')}</CustomText>
        </View>
        <View style={styles.EnterMobileNumberView}>
            <CustomText style={styles.EnterMobileNumber}>
                {t('Enter the mobile number registered on the bank')}
            </CustomText>
        </View>
        <View>
            <View style={styles.InputStyle}>
            <Input
            Textname={t('Mobile number')}
            TextHandler={mobileNumberHandler}
            src={require('../../assets/images/signs/Mobile.png')}
            bgBeforeFocus={styles.BgBeforeFocus}
            bgAfterFocus={styles.BgAfterFocus}
            TextColorBeforeFocus={styles.TextColorBeforeFocus}
            TextColorAfterFocus={styles.TextColorAfterFocus}
            Textstate={mobileNumber}
            />
            </View>
         <View>
         <Button style={[styles.loginButton,styles.loginButtonText] }
         onPress={nextHandler}
         >
                {t('Next')}
            </Button>
            <Footer/>
         </View>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    MobileNumberView:
    {
        marginLeft:'5%',
        marginBottom:'2%'
    },
    MobileNumber:
    {
        fontFamily:'Roboto-Bold',
        fontSize:20,
        color:'#1C2437'
    },
    EnterMobileNumberView:
    {
     marginBottom:'2%'
    },
    EnterMobileNumber:
    {
        marginLeft:'5%',
        color:'#B7B7B7'
    },
    regUserName:{
        backgroundColor:'white',
        flexDirection:'row',
        borderWidth:1.5,
        borderRadius:10,
        width:'88%',
        marginLeft:'4%',
        marginBottom:'100%',
        borderColor:'#007236',
        borderWidth:2
    
    },
    regUserImage:
    {
        paddingHorizontal:22,
        paddingTop:22
    },
    userNameTextView:{
        paddingTop:10
    },
    userNameText:
    {
        color:'#007236',
        fontSize:12,
        fontWeight:'bold'
    },
    userNameInput:{
        color:'red',
        height:37,
        fontSize:14,
        borderBottomColor:'blue'
    },
    loginButton:
    {
        backgroundColor:'#007236',
        color:'green',
        borderRadius:12.5,
        marginBottom:'3%',
        width:'88%',
        marginLeft:20
    },
    loginButtonText:
    {
        color:'white',
        fontFamily:'Roboto-Bold',
        fontSize:15,
        fontStyle:'normal',
        textAlign:'center',
        paddingVertical:15
    },
    InputStyle:
    {
        marginBottom:390
    }
    ,
    BgBeforeFocus:
    {
        backgroundColor:'transparent',
        borderColor:'green',
        borderWidth:1
    },
    BgAfterFocus:
    {
        backgroundColor:'white'
    },
    TextColorBeforeFocus:
    {
        color:'black'
    },
    TextColorAfterFocus:
    {
        color:'green'
    }
})