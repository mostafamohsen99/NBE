import React, {useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomText from '../UI/CustomText';
const Timer = ({ seconds }) => {
    const[t,i18n]=useTranslation();
    const langSelector=useSelector(state=>state.lang.lang);
    const [timeLeft, setTimeLeft] = useState(seconds);
    useEffect(() => {
      if (!timeLeft) return;
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }, [timeLeft]);
    useEffect(()=>{
      i18n.changeLanguage(langSelector);
    },[])
    return (
      <View style={styles.request}>
        <CustomText style={styles.requestText}>{t('Request new one in')} 00:{timeLeft>=10?timeLeft:'0'+timeLeft}</CustomText>
      </View>
    );
  };
  export default Timer;
  const styles=StyleSheet.create({
    request:{
        marginLeft:20
    },
    requestText:
    {
        color:'#1C2437',
        fontFamily:'Roboto-Medium',
        fontSize:16
    }
  })