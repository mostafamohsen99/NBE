import { View, Text,Image,StyleSheet} from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomText from '../UI/CustomText';

export default function Checkers({password,confirmPassword,setValidate,validate,confirmPasswordl}) {
    const langSelector=useSelector(state=>state.lang.lang);
    const {t,i18n}=useTranslation();
    const[lowerChar,setLowerChar]=useState(false);
    const[upperChar,setUpperChar]=useState(false);
    const[passwordLength,setPasswordLength]=useState(false);
    const[containNumber,setContainNumber]=useState(false);
    const[specialCharacter,setSpecialCharacter]=useState(false);
    var pattern = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    useEffect(()=>{
        if(password!==undefined)
        {
            if(password==='')
            {
                setLowerChar(false);
                setUpperChar(false);
            }
            if(/[a-z]/.test(password))
            {
                setLowerChar(true);
            }
            else
            {
                setLowerChar(false);
            }
            if(/[A-Z]/.test(password))
            {
                setUpperChar(true);
            }
            else
            {
                setUpperChar(false);
            }
            if(password.length>8)
            {
                setPasswordLength(true);
            }
            else
            {
                setPasswordLength(false);
            }
            if(/\d/.test(password))
            {
                setContainNumber(true);
            }
            else
            {
                setContainNumber(false);
            }
            if(pattern.test(password))
            {
                setSpecialCharacter(true);
            }
            else
            {
                setSpecialCharacter(false);
            }
        }
        else
        {
            setLowerChar(false);
        }
        if(lowerChar&&upperChar&&passwordLength&&containNumber&&specialCharacter)
        {
            setValidate(true);
        }
        else
        {
            setValidate(false);
        }
    },[password,confirmPasswordl])
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.CheckView}>
                <Image 
                style={styles.CheckImage}
                source={lowerChar?require('../../assets/images/signs/greenCircle.png'):require('../../assets/images/signs/GrayCircle.png')}/>
                <CustomText style={styles.CheckText}>{t('Lower case letter')}</CustomText>
            </View>
            <View style={[styles.CheckView,,styles.uppercaseLetter]}>
                <Image style={styles.CheckImage} 
                source={upperChar?require('../../assets/images/signs/greenCircle.png'):require('../../assets/images/signs/GrayCircle.png')}/>
                <CustomText style={styles.CheckText}>{t('Upper case letter')}</CustomText>
            </View>
        </View>
        <View style={styles.container}>
            <View style={styles.CheckView}>
                <Image style={styles.CheckImage} 
                source={passwordLength?require('../../assets/images/signs/greenCircle.png'):require('../../assets/images/signs/GrayCircle.png')}/>
                <CustomText style={styles.CheckText}>{t('Minimum 8 Characters')}</CustomText>
            </View>
            <View  style={styles.CheckView}>
                <Image style={styles.CheckImage} 
                source={containNumber?require('../../assets/images/signs/greenCircle.png'):require('../../assets/images/signs/GrayCircle.png')}/>
                <CustomText style={styles.CheckText}>{t('Number')}</CustomText>
            </View>
        </View>
        <View  style={styles.CheckView}>
            <Image style={styles.CheckImage} 
            source={specialCharacter?require('../../assets/images/signs/greenCircle.png'):require('../../assets/images/signs/GrayCircle.png')}/>
            <CustomText style={styles.CheckText}>{t('Special character')}</CustomText>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
     flexDirection:'row'
    },
    CheckView:
    {
        flexDirection:'row',
        marginLeft:23
    },
    CheckText:
    {
        marginBottom:20,
        paddingBottom:10,
        marginLeft:15,
        fontSize:16,
        fontFamily:'Roboto-Regular',
        color:'#1C2437'
    },
    CheckImage:
    {
        position:'absolute',
        top:'10%'
    },
    uppercaseLetter:
    {
        marginLeft:55
    }
})