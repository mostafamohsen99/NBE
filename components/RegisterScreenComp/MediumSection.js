import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n/i18n';
import CustomText from '../UI/CustomText';

export default function MediumSection() {
    const langSelector=useSelector(state=>state.lang.lang);
const {t, i18n} = useTranslation();
useEffect(()=>{
    i18n.changeLanguage(langSelector);
},[])
  return (
    <View>
       <View style={styles.MediumSection}>
            <CustomText style={styles.medText}>
                {t('Welcome')}
            </CustomText>
        </View>
    </View>
  )
}
styles=StyleSheet.create({
    MediumSection:
    {
        paddingLeft:25,
        paddingRight:30,
        marginTop:'43%',
    },
    medText:
    {
        color:'white',
        fontFamily:'Roboto-Black',
        fontSize:40,
        fontStyle:'normal'
    }
})