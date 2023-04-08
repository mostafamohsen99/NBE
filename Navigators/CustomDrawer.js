import { StyleSheet, Text, View,Image,Pressable} from 'react-native'
import React, { useState,useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { useSelector,useDispatch } from 'react-redux'
import {I18nManager} from "react-native";
import RNRestart from "react-native-restart";
import { langActions } from '../store/lang';
import { authActions } from '../store/auth';
import { BenefecierActions } from '../store/Benefecier-slice';
import { TransferActions } from '../store/Transfer-slice';
import i18n from '../i18n/i18n';
import CustomText from '../components/UI/CustomText';

const CustomDrawer = props => {
    const navigation=useNavigation();
  const username=useSelector(state=>state.auth.username);
  const dispatch=useDispatch();
  const langSelector=useSelector(state=>state.lang.lang);
  const isFromDrawer=useSelector(state=>state.lang.isFromDrawer);
  const [language,setLanguage]=useState();
  useEffect(()=>{
    if(langSelector==='en')
    {
        setLanguage('ar');
    }
    else if(langSelector==='ar')
    {
        setLanguage('en')
    }
  },[])
  function langHandler()
  {
    return new Promise((resolve,reject)=>{
        if(langSelector==='ar')
        {
           console.log('enHere');
          dispatch(langActions.setLang('en'));
        }
        else if(langSelector==='en')
        {
           console.log('arHere');
          dispatch(langActions.setLang('ar'));
        }
        resolve();
    })
  }
  return (
    <DrawerContentScrollView {...props}>
        <View style={styles.upperRow}>
            <View style={styles.imgView}>
                <Image 
                style={styles.img}
                source={require('.././assets/images/DrawerIcons/logo.png')}
                />
            </View>
            <View>
                <Pressable onPress={()=>{langHandler().then(()=>{I18nManager.forceRTL(!I18nManager.isRTL);i18n.changeLanguage(langSelector); 
                    navigation.dispatch(DrawerActions.closeDrawer())
                    RNRestart.restart();})}}>
                    <View style={styles.button}>
                        <CustomText style={styles.buttonText}>{language}</CustomText>
                    </View>
                </Pressable>
            </View>
        </View>
        <View>
            <DrawerItemList {...props}/>
        </View>
        <View style={styles.footer}>
            <View style={styles.ImgFooter}>
                <Image source={require('.././assets/images/Mashaly.png')}/>
            </View>
            <View style={styles.TextFooter}>
                <CustomText>{username}</CustomText>
                <CustomText>+20 {username}</CustomText>
            </View>
            <View style={styles.lastImgFooter}>
                <Image source={require('.././assets/images/DrawerIcons/.png')}/>
            </View>
        </View>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    upperRow:{
        flexDirection:'row'
    },
    button:{
        backgroundColor:'white',
        marginLeft:50,
        padding:10,
        borderRadius:10,
        marginTop:10,
    },
    buttonText:
    {
        color:'#007236'
    },
    imgView:
    {
        marginTop:12,
        marginBottom:15,
        marginLeft:20
    },
    footer:
    {
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'88%',
        marginLeft:17,
        borderRadius:10,
        padding:10,
        marginTop:50
    },
    ImgFooter:
    {
        width:40,
        height:40
    },
    lastImgFooter:
    {
        marginTop:10
    }
})