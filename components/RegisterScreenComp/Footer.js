import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n/i18n';
import CustomText from '../UI/CustomText';

export default function Footer() {
const langSelector=useSelector(state=>state.lang.lang);
const {t, i18n} = useTranslation();
useEffect(()=>{
    i18n.changeLanguage(langSelector);
},[])
  return (
    <View style={styles.footer}>
            <View style={styles.footerBar}>
                <CustomText style={styles.footerBarText}>{t('ContactUs')}</CustomText>
                <CustomText style={styles.footerBarText}>{t('FAQS')}</CustomText>
                <CustomText style={styles.footerBarText}>{t('Help')}</CustomText>
            </View>
            <View style={styles.footerTextView}>
                <CustomText style={styles.footerText}>
               {t('Copyright')}
                </CustomText>
            </View>
    </View>
  )
}
const styles=StyleSheet.create({
    footer:
    {
        backgroundColor:'rgba(0, 0, 0, 0.4)',
        height:79.5
    },
    footerBar:
    {
        flexDirection:'row',
        paddingTop:20,
        paddingHorizontal:100
    },
    footerBarText:
    {
        color:'#F6A721',
        marginHorizontal:4,
        fontFamily:'Roboto-Bold'
    },
    footerText:
    {
        color:'white',
        fontSize:12,
        marginTop:8
    },
    footerTextView:
    {
        marginLeft:20,
        fontFamily:'Roboto-Bold'
    }
})