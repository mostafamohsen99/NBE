import { View, Text,StyleSheet,Image} from 'react-native'
import React from 'react'
import Button from '../components/UI/Button'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { authActions } from '../store/auth';
import { useDispatch,useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n';
import CustomText from '../components/UI/CustomText';



export default function WelcomeScreen({route}) {
  const{t,i18n}=useTranslation();
    const navigation=useNavigation();
    const dispatch=useDispatch();
    const username=route.params.mobNumber;
    const email=route.params.mobNumber+'@nbe.com';
    const password=route.params.password;
    async function  nextHandler()
    {
    const user=await auth().createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
         return credentials.user;
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
  const user_firestore=await firestore().collection('Users').doc(username).set({
    name: username,
    email:email,
    price:+20000
  })
  .then(() => {
    console.log('added');
  });
  dispatch(authActions.login({
    username:username,
    userid:user.uid,
    price:20000
  }))


// navigation.navigate('BottomTabNav');
navigation.navigate('FirstDrawerNav');

    }
  return (
    <View style={styles.container}>
        <View style={styles.bankLogo}>
            <Image
            source={require('.././assets/images/logo_2.png')}
             />
        </View>
        <View style={styles.congratsPar}>
            <View>
                <CustomText style={styles.congratsWord}>{t('Congratulations')}</CustomText>
            </View>
            <View style={styles.congratsTextBar}>
                <CustomText style={styles.congratsText}>{t('you have successfully registered in NBE online banking service')}
                </CustomText>
            </View>
        </View>
        <View style={styles.bgImage}>
            <Image
            source={require('.././assets/images/WelcomeImage.png')}
            >
            </Image> 
        </View> 
        <View>
        <Button style={[styles.loginButton,styles.loginButtonText]}
        onPress={nextHandler}
        >
                {t('Finish')}
       </Button>
        </View>   
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'#007236',
        flex:1
    },
    bankLogo:
    {
        position:'absolute',
        right:15,
        top:25
    },
    bgImage:
    {
        position:'absolute',
        top:70,
        zIndex:-1
    },
    congratsPar:
    {
        marginTop:70,
        marginLeft:10
    },
    congratsWord:
    {
        color:'white',
        fontSize:24,
        fontFamily:'Roboto-Bold'
    },
    congratsText:
    {
        color:'white',
        fontFamily:'Roboto-Medium'
    },
    congratsTextBar:
    {
        width:'80%'
    },
    loginButton:
    {
        backgroundColor:'white',
        color:'green',
        borderRadius:12.5,
        width:'88%',
        position:'absolute',
        top:550,
        left:20
    },
    loginButtonText:
    {
        color:'#007236',
        fontFamily:'Roboto-Bold',
        fontSize:15,
        fontStyle:'normal',
        textAlign:'center',
        paddingVertical:15
    }
})
