import { View, Text,StyleSheet,Pressable} from 'react-native'
import React, { useState,useEffect } from 'react'
import FirstSection from '../components/MobileNumber/FirstSection'
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import Checkers from '../components/passwordScreen/Checkers';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/UI/CustomText';


export default function PasswordScreen({route}) {
  const {t,i18n}=useTranslation();
  const mobileNumber=route.params.mobNumber;
  const[passwordFocus,setPasswordFocus]=useState(false);
  const[ConfirmpasswordFocus,setConfirmPasswordFocus]=useState(false);
  const[showPassword,setShowpassword]=useState(false);
  const[password,setpassword]=useState();
  const[confirmPassword,setConfirmPassword]=useState();
  const[validate,setValidate]=useState();
  const[error,setError]=useState();
  const navigation=useNavigation();

  function passwordHandler(password_item)
  {
    setpassword(password_item);
  }
  function ConfirmpasswordHandler(password_item)
  {
    setConfirmPassword(password_item);
  }
  function BackgroundHandler()
  {
    setPasswordFocus(false);
    setConfirmPasswordFocus(false);
  }
  function showPasswordHandler()
  {
    setShowpassword(current=>!current)
  }
  function NextHandler()
  {
    if(!validate||(confirmPassword!==password))
    {
    if(!validate)
    {
      setError('data you entered is in correct Try again!');
    }
    if(confirmPassword!==password)
    {
      setError('passwords never matches!!!');
    }
    }
    else
    {
      navigation.navigate('WelcomeScreen',{
        mobNumber:mobileNumber,
        password:password
      });
    }
  }
  return (
    <View>
      <Pressable
      onPress={BackgroundHandler}
      >
      <FirstSection/>
    <View style={{marginLeft:20}}>
      <CustomText style={styles.setPassword}>{t('Set your password')}</CustomText>
    </View>
    <View style={{marginLeft:20}}>
      <CustomText style={styles.enterPassword}>{t('Enter a strong password for your online banking account')}</CustomText>
    </View>
    <View>
      <Input
      Textname={t('password')}
      TextPasswordHandler={showPasswordHandler}
      TextHandler={passwordHandler}
      showPassword={showPassword}
      src={require('../assets/images/signs/lock.png')}
      bgBeforeFocus={styles.BgBeforeFocus}
      bgAfterFocus={styles.BgAfterFocus}
      TextColorBeforeFocus={styles.TextColorBeforeFocus}
      TextColorAfterFocus={styles.TextColorAfterFocus}
      Textstate={password}
      placeholder={t('write your password')}
      />
    </View>
    <View>
    <Input
      Textname={t('confirm password')}
      TextPasswordHandler={showPasswordHandler}
      TextHandler={ConfirmpasswordHandler}
      showPassword={showPassword}
      src={require('../assets/images/signs/lock.png')}
      bgBeforeFocus={styles.BgBeforeFocus}
      bgAfterFocus={styles.BgAfterFocus}
      TextColorBeforeFocus={styles.TextColorBeforeFocus}
      TextColorAfterFocus={styles.TextColorAfterFocus}
      placeholder={t('rewrite your password')}
      Textstate={confirmPassword}
      />
    </View>
    <View>
      <Checkers 
      password={password}
      confirmPassword={confirmPassword}
      setValidate={setValidate}
      validate={validate}
      confirmPasswordl={confirmPassword}
      />
    </View>
    {error&&<View style={styles.error}>
      <CustomText style={styles.errorText}>{error}</CustomText>
      </View>}
    <View style={styles.ButtonView}>
        <Button style={[styles.loginButton,styles.loginButtonText] }
        onPress={NextHandler}
        >
                    {t('Submit')}
        </Button>
    </View>
      </Pressable>
    </View>
  )
}
const styles=StyleSheet.create({
  setPassword:
  {
    color:'#1C2437',
    fontFamily:'Roboto-Medium',
    fontSize:18
  },
  enterPassword:
  {
    color:'#B7B7B7',
    fontSize:16
  },
  BgBeforeFocus:
  {
      backgroundColor:'white',
  },
  BgAfterFocus:
  {
      backgroundColor:'white',
      borderColor:'green',
      borderWidth:1.5
  },
  TextColorBeforeFocus:
  {
      color:'black'
  },
  TextColorAfterFocus:
  {
      color:'green'
  },
  loginButton:
  {
      backgroundColor:'#007236',
      color:'green',
      borderRadius:12.5,
      marginBottom:'8%',
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
  ButtonView:
  {
    marginTop:200
  },
  error:
  {
    marginLeft:20
  },
  errorText:
  {
    fontSize:20,
    color:'red'
  }
})