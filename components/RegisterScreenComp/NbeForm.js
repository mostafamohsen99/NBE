import { View, Text, StyleSheet,Image,TextInput,Pressable} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import React from 'react'
import Button from '../UI/Button'
import {useState,useEffect} from 'react'
import Input from '../UI/Input'
import i18n from '../../i18n/i18n';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomText from '../UI/CustomText'

export default function NbeForm({
    usernameHandler,
    passwordHandler,
    showPasswordHandler,
    showPassword,
    loginHandler,
    signupHandler,
    fingerprintHandler,
    username,
    password
}) {
const[isSelected,setSelection]=useState(false);
const langSelector=useSelector(state=>state.lang.lang);
const {t, i18n} = useTranslation();
useEffect(()=>{
    i18n.changeLanguage(langSelector);
},[])
  return (
    <View>
        <View>
            <Input
            Textname={t('Username')}
            Textstate={username}
            TextHandler={usernameHandler}
            src={require('../../assets/images/signs/at.png')}
            bgBeforeFocus={styles.BgBeforeFocus}
            bgAfterFocus={styles.BgAfterFocus}
            TextColorBeforeFocus={styles.TextColorBeforeFocus}
            TextColorAfterFocus={styles.TextColorAfterFocus}
             />
            <Input
            Textname={t('password')}
            Textstate={password}
            TextHandler={passwordHandler}
            TextPasswordHandler={showPasswordHandler}
            showPassword={showPassword}
            src={require('../../assets/images/signs/lock.png')}
            bgBeforeFocus={styles.BgBeforeFocus}
            bgAfterFocus={styles.BgAfterFocus}
            TextColorBeforeFocus={styles.TextColorBeforeFocus}
            TextColorAfterFocus={styles.TextColorAfterFocus}
            />
        </View>
        <View style={styles.submitButtons}>
            <View style={{flexDirection:'row'}}>
                <View>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.Checkbox}
                  tintColors={{ true: '#007236', false: 'white' }}
                />
                </View>
                <View>
                <CustomText style={styles.Rememberme}>{t('Rememberme')}</CustomText>
                </View>
                <View style={{marginLeft:40}}>
                <CustomText style={styles.forgotPassword}>{t('Forgotpassword')}</CustomText>
                </View>
            </View>
        </View>
        <View>
        <View style={styles.loginRow}>
            <View style={styles.Login}>
            <Button style={[styles.loginButton,styles.loginButtonText]}
            onPress={loginHandler}
            >
                {t('Login')}
            </Button>
            </View>
           
            <View style={styles.fingerPrint}>
                <Pressable onPress={fingerprintHandler}>
                    <Image
                    source={require('../../assets/images/signs/fingerprint.png')}
                    />
                </Pressable>
            </View>
        </View>
        <View style={styles.signup}>
            <CustomText style={styles.signupText}>
               {t('Dont have an account')}
             </CustomText>
             <View>
                <Pressable>
                <CustomText style={styles.signupTextTwo} onPress={signupHandler}>{t('Sign up')}</CustomText>
                </Pressable>
             </View>
        </View>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    submitButtons:
    {
        width:'88%',
        marginLeft:22,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    Rememberme:
    {
        color:'white',
        paddingTop:4,
        fontFamily:'Roboto-Bold',
        fontSize:14
    },
    forgotPassword:
    {
        paddingTop:4,
        color:'white',
        fontFamily:'Roboto-Bold',
        marginLeft:85
    },
    Checkbox:
    {
        alignSelf:'center',
    },
    loginButton:
    {
        backgroundColor:'#007236',
        color:'green',
        borderRadius:12.5
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
    Login:
    {
        
        width:'67%',
        marginLeft:22,
        marginTop:5
    },
    loginRow:
    {
        flexDirection:'row'
    },
    fingerPrint:
    {
        borderColor:'#F6A721',
        borderWidth:1.5,
        marginLeft:30,
        marginTop:5,
        height:'90%',
        padding:10,
        borderRadius:10
    },
    signup:
    {
        marginLeft:22,
        paddingBottom:10,
        flexDirection:'row'
    },
    signupText:
    {
        color:'white',
        marginLeft:80,
        paddingBottom:10
    },
    signupTextTwo:
    {
        color:'#F6A721',
        borderBottomWidth:1,
        borderBottomColor:'#F6A721',
        fontSize:13
    },
    BgBeforeFocus:
    {
        backgroundColor:'transparent'
    },
    BgAfterFocus:
    {
        backgroundColor:'white'
    },
    TextColorBeforeFocus:
    {
        color:'white'
    },
    TextColorAfterFocus:
    {
        color:'green'
    }
})