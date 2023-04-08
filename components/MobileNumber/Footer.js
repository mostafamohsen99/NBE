import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import CustomText from '../UI/CustomText';
export default function Footer() {
  const langSelector=useSelector(state=>state.lang.lang);
  const {t, i18n} = useTranslation();
  useEffect(()=>{
      i18n.changeLanguage(langSelector);
  },[])
  return (
    <View>
      <View style={styles.footer}>
            <CustomText style={[styles.footerText,i18n.language==='en'?{direction:'ltr'}:{direction:'rtl'}]}>
                {t('By signing up,you agree to our')+' '}<Text style={{color:'blue'}}>{t('Terms of Service')}</Text>  {' '+
                  t('and acknowledge that you have read our')+' '
                }<Text style={{color:'blue'}}>{t('Privacy Policy')}</Text>
            </CustomText>
         </View>
    </View>
  )
}
const styles=StyleSheet.create({
    footer:
    {
     width:'90%',
     marginHorizontal:20,
     position:'absolute',
    },
    footerText:
    {
        color: '#808080',
    },
})