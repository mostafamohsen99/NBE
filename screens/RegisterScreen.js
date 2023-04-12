import { StyleSheet,
    ImageBackground,
    Pressable,
    View,
    Text,
    Image
} from 'react-native'
import React, { useEffect } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {useState} from 'react';
import FirstSection from '../components/RegisterScreenComp/FirstSection'
import MediumSection from '../components/RegisterScreenComp/MediumSection'
import NbeForm from '../components/RegisterScreenComp/NbeForm'
import Footer from '../components/RegisterScreenComp/Footer'
import { useNavigation } from '@react-navigation/native';
import { authActions } from '../store/auth';
import { useDispatch,useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Modall from '../components/UI/Modal';
import {I18nManager} from "react-native";
import RNRestart from "react-native-restart";
import { langActions } from '../store/lang';
import { BenefecierActions } from '../store/Benefecier-slice';
import { TransferActions } from '../store/Transfer-slice';
import  '../i18n/i18n';
import {useTranslation} from 'react-i18next';
import { useMutation } from 'react-query';

export default function RegisterScreen() {
  const {t, i18n} = useTranslation();
    const langSelector=useSelector(state=>state.lang.lang);
    const isFromDrawerSelector=useSelector(state=>state.lang.isFromDrawer);
    const authSelector=useSelector(state=>state.auth.username);
    const navigation=useNavigation();
    const dispatch=useDispatch();
    const [TextFocus,setTextFocus]=useState(false);
    const[passwordFocus,setPasswordFocus]=useState(false);
    const[showPassword,setShowpassword]=useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const[language,setLanguage]=useState('');
    const[username,setUsername]=useState();
    const[password,setPassword]=useState();
    //authstatechange
    const[user,SetUser]=useState();
    const[initializing,setInitializing]=useState(true);
    //console.log('language inside reg screen',langSelector);
    function onPress()
    {
      console.log('pressed');
        if(I18nManager.isRTL)
        {

          dispatch(langActions.setLang('en'));
          I18nManager.forceRTL(false);
        }
        else if(!I18nManager.isRTL)
        {
          dispatch(langActions.setLang('ar'));
          I18nManager.forceRTL(true);
        }
        RNRestart.restart();
    }
    function showPasswordHandler()
    {
        setShowpassword(current=>!current)
    }
    function signupHandler()
    {
      console.log('pressed');
        navigation.navigate('MobileNumber');
    }
    function fingerprintHandler()
    {
        setModalVisible(true);
    }
    const LoginHandler=useMutation(
      async ()=>{
        const email=username+'@nbe.com';
        const user=await auth()
        .signInWithEmailAndPassword(email,password)
        .then((credentials) => {
          console.log('User account created & signed in!');
          return credentials;
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.error(error);
        });
        dispatch(authActions.login({
          username:username,
          userid:user.user.uid,
        }))
        navigation.navigate('FirstDrawerNav');
      }
    )
  //   async function loginHandler()
  //   {
  //     const email=username+'@nbe.com';
  //     const user=await auth()
  // .signInWithEmailAndPassword(email,password)
  // .then((credentials) => {
  //   console.log('User account created & signed in!');
  //   return credentials;
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }
  //   console.error(error);
  // });
  // dispatch(authActions.login({
  //   username:username,
  //   userid:user.user.uid,
  // }))
  // navigation.navigate('FirstDrawerNav');
  //   }
    function usernameHandler(name)
    {
      setUsername(name);
    }
    function passwordHandler(pass)
    {
      setPassword(pass)
    }
    const ModalPressFn=useMutation(
      async()=>{
        setModalVisible(false);
      const username='123456789';
      const email=username+'@nbe.com';
      const password='123456789Mm-';
      const user=await auth()
      .signInWithEmailAndPassword(email,password)
      .then((credentials) => {
        console.log('User account created & signed in!');
        return credentials;
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
      dispatch(authActions.login({
        username:username,
        userid:user.user.uid,
      }))
      navigation.navigate('FirstDrawerNav');
      }
    )
    // async function ModalPressHandler()
    // {
    //   setModalVisible(false);
    //   const username='123456789';
    //   const email=username+'@nbe.com';
    //   const password='123456789Mm-';
    //   const user=await auth()
    //   .signInWithEmailAndPassword(email,password)
    //   .then((credentials) => {
    //     console.log('User account created & signed in!');
    //     return credentials;
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }
    
    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }
    //     console.error(error);
    //   });
    //   dispatch(authActions.login({
    //     username:username,
    //     userid:user.user.uid,
    //   }))
    //   navigation.navigate('FirstDrawerNav');
    // }
    function onAuthStateChanged(user)
    {
    //  console.log('AuthStateChanged-----------');
      SetUser(user)
   //   console.log('user----------------------------------------------------',user);
      if(initializing)
      setInitializing(false)
    }
    useEffect(()=>{
      const subscriber=auth().onAuthStateChanged(onAuthStateChanged)
      return subscriber;
    },[])
    useEffect(()=>{
      if(I18nManager.isRTL)
      {
        setLanguage('en');
      }
      else
      {
        setLanguage('ar');
      }
      dispatch(BenefecierActions.removeBeneficiers());
      dispatch(TransferActions.removeTransfer());
   //   console.log('isRTL',I18nManager.isRTL);
   //   console.log('isFromDrawerSelector',isFromDrawerSelector);
   //   console.log('langSelector After RegScreen',langSelector);
    },[])
    if(initializing)
    return null;
  return (
    <View>
      <Modall
      word={t('loginwithFingerPrint')}
      // PressHandler={ModalPressHandler}
      PressHandler={ModalPressFn.mutate}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      />
      <View>
      <Pressable>
                    <ImageBackground
                source={require('../assets/images/Bg_Girl_Image.png')}
                     >
     <KeyboardAwareScrollView
            //  behavior='height'
            //  
             automaticallyAdjustContentInsets='false'
              contentContainerStyle={modalVisible?styles.containerModal:styles.container}
        >
     <FirstSection
     onPress={onPress}
     language={language}
     setLanguage={setLanguage}
     />
      <MediumSection/>
      <NbeForm
      usernameHandler={usernameHandler}
      passwordHandler={passwordHandler}
      showPasswordHandler={showPasswordHandler}
      TextFocus={TextFocus}
      setTextFocus={setTextFocus}
      passwordFocus={passwordFocus}
      setPasswordFocus={setPasswordFocus}
      showPassword={showPassword}
      signupHandler={signupHandler}
      fingerprintHandler={fingerprintHandler}
      loginHandler={LoginHandler.mutate}
      username={username}
      password={password}
      />
      <Footer/>
        </KeyboardAwareScrollView>
      </ImageBackground>
        </Pressable>
      </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'transparent'
    },
    containerModal:
    {
        backgroundColor:'rgba(28, 36, 55, 0.77)'
    },
    image:{
       width:'100%',
       height:'100%'
    },
    centeredView: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems:'center',
      },
      modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingTop:10,
        elevation:5,
        width:'100%',
        height:'30%'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: '#007236',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 10,
        marginLeft:10,
        fontSize:18,
        color:'#1C2437',
        fontFamily:'Roboto-Medium'
      },
      modalSecText:
      {
        marginLeft:10,
        fontSize:15,
        fontFamily:'Roboto-Regular',
        color:'#1C2437'
      },
      cancel:
      {
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginRight:30,
        marginBottom:20
      },
      fingerPrintImage:
      {
      },
      fingerPrintView:
      {
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
      },
})
