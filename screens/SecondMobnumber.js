import { View, Text ,StyleSheet,Modal,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import FirstSection from '../components/MobileNumber/FirstSection';
import OTP from '../components/MobileNumber/OTP';
import Timer from '../components/MobileNumber/Timer';
import Button from '../components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import { BenefecierActions } from '../store/Benefecier-slice';
import { TransferActions } from '../store/Transfer-slice';
import { PriceActions } from '../store/price-slice';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/auth';
import SecModal from '../components/UI/SecModal';
import {useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n';
import CustomText from '../components/UI/CustomText';

export default function SecondMobnumber({route}) {
  const{t,i18n}=useTranslation();
  const user=useSelector(state=>state.auth.username);
  const langSelector=useSelector(state=>state.lang.lang);
  const navigation=useNavigation();
  const dispatch=useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [count,setCount]=useState(0);
  const mobileNumber=route.params.mobNumber;
  const seconds=30;
  const items=useSelector(state=>state.Transfer.items);
  const priceRedux=useSelector(state=>state.price.initialPrice);
  useEffect(()=>{
    i18n.changeLanguage(langSelector);
  },[])
  async function finishHandler()
    {
    if(route.params.position==='AddBenefeciarScreen')
    {
      console.log('hereee');
      const reference =storage().ref(route.params.phonenumber+'.png');
      await reference.putFile(route.params.imageUri.uri);
       const url = await storage().ref(route.params.phonenumber+'.png').getDownloadURL();
      const PhoneNum=route.params.phonenumber;
      try
      {
        const user_firestore=await firestore().collection('Benefeciaries').doc(user).collection('myBenefeciaries').doc(PhoneNum).set({
          firstname:route.params.firstname,
          lastname:route.params.lastname,
          img:url,
          price:route.params.price,
          phonenumber:route.params.phonenumber,
          bankbranch:route.params.bankbranch,
          accountNumber:route.params.accountNumber,
          email:route.params.email
         })
         .then(() => {
           console.log('added');
         });
      }
      catch(err)
      {
        console.log('err',err);
      }
      dispatch(BenefecierActions.addBenefecier({
        id:route.params.id,
        imageUri:url,
        phonenumber:route.params.phonenumber,
        price:route.params.price,
        firstname:route.params.firstname,
        lastname:route.params.lastname,
        bankbranch:route.params.bankbranch,
        accountNumber:route.params.accountNumber,
        email:route.params.email
      }))
      navigation.navigate('BeneficiariesFirstScreen');
    }
    if(route.params.position==='TransferScreen')
    {
      const Transferfrom=route.params.transferFrom;
      const Transferto=route.params.transferTo;
      console.log('Transferfrom',Transferfrom);
      console.log('Transferto',Transferto)
      try
      {
        const firestoreVar=await firestore().collection('Benefeciaries').doc(Transferfrom).collection('myBenefeciaries').doc(Transferto).get();
        const img_firestore=firestoreVar._data.img;
        console.log('img_firestore',img_firestore);
        const transfer_firestore=await firestore().collection('Transactions').add(
          {
            typeofTransfer:route.params.typeofTransfer,
            transferFrom:route.params.transferFrom,
            transferTo:route.params.transferTo,
            amount:route.params.amount,
            reason:route.params.reason,
            date:route.params.date,
            img:img_firestore
          }
        )
        dispatch(TransferActions.addTransfer({
          id:route.params.id,
          typeofTransfer:route.params.typeofTransfer,
          transferFrom:route.params.transferFrom,
          transferTo:route.params.transferTo,
          amount:route.params.amount,
          reason:route.params.reason,
          date:route.params.date,
          img:img_firestore
        }))
        // console.log('items',items);
        const priceReduxInt=parseInt(priceRedux);
        console.log('priceReduxInt',priceReduxInt);
        let priceReduxInt_to=priceReduxInt+parseInt(route.params.amount);
        console.log('priceReduxInt_to',priceReduxInt_to);
        let priceReduxInt_from=priceReduxInt-parseInt(route.params.amount);
        console.log('priceReduxInt_from',priceReduxInt_from);
        console.log('transferto',route.params.transferTo);
        console.log('transferFrom',route.params.transferFrom);
        const price_to_firestore=await firestore().collection('Users').doc(route.params.transferTo).update({
          price:priceReduxInt_to
        });
        //console.log('price_from_firestore',price_from_firestore);
        const price_from_firestore=await firestore().collection('Users').doc(route.params.transferFrom).update({
          price:priceReduxInt_from
        })
       // console.log('price_to_firestore',price_to_firestore);
        dispatch(PriceActions.addPrice({
          updatedPrice:priceReduxInt_from
        }))
        console.log('ReduxPriceInside',priceReduxInt);
       // const firestore_price_var=await firestore().collection('Benefeciaries').doc(route.params.transferFrom).collection('myBenefeciaries').doc(route.params.transferTo).get();
        //console.log('firestore_price_var',firestore_price_var._data.price);
        let ben_price_redux=parseInt(firestoreVar._data.price);
        ben_price_redux+=parseInt(route.params.amount);
        // console.log('ben_price',ben_price_redux);
        //console.log('items_inside_transfer',items.length);
        for(let i=0;i<items.length;i++)
        {
            if(items[i].phonenumber==='01224786139')
            {
                items[i].price=ben_price_redux;
            }
            // console.log('items['+i+']',items[i]);
        }
        const price_to_benefecier=await firestore().collection('Benefeciaries').doc(route.params.transferFrom).collection('myBenefeciaries').doc(route.params.transferTo).update({
            price:ben_price_redux
        })
      }
      catch(err)
      {
        console.log('err',err);
      }
      navigation.navigate('TransferFirstScreen');
    }
    }
  function nextHandler()
    {
      if(route.params.position==='MobileNumber')
     navigation.navigate('passwordScreen',{
      mobNumber:mobileNumber,
     })
     if(route.params.position==='AddBenefeciarScreen')   
     {
      setModalVisible(true);
     }
     if(route.params.position==='TransferScreen')
     {
      setModalVisible(true);
     }
    }
    console.log('items_outside',items);
   // console.log(seconds);
   // console.log('PriceAfterRedux',priceRedux);
  return (
    <View>
      <SecModal
      img={require('.././assets/images/Benefeciaries/Paper.png')}
      txt={t("Mission Complete")}
      firstname={route.params.firstname}
      lastname={route.params.lastname}
      transferTo={route.params.transferTo}
      transferFrom={route.params.transferFrom}
      buttonWord={t("Finish")}
      finishHandler={finishHandler}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      />
      <FirstSection/>
      <View style={styles.verificationView}>
        <CustomText style={styles.verification}>{t('Verification')}</CustomText>
      </View>
      <View style={styles.verWordView}>
        <CustomText style={styles.verWord}>{t('Enter 5 digit code we sent to')}  {mobileNumber}</CustomText>
      </View>
      <View>
        <OTP/>
      </View>
      <View style={styles.question}>
        <CustomText style={styles.questionWord}>{t('Didnt receive the code?')}</CustomText>
      </View>
      <View>
        <Timer seconds={seconds}/>
      </View>
      <View>
      <Button style={[styles.loginButton,styles.loginButtonText] }
         onPress={nextHandler}
         >
                {t('Next')}
       </Button>
      </View>
    
    </View>
  )
}
const styles=StyleSheet.create({
    verificationView:
    {
        marginLeft:20
    },
    verification:
    {
        fontFamily:'Roboto-Medium',
        fontSize:20,
        color:'#1C2437',
    },
    verWordView:
    {
        marginLeft:20
    },
    verWord:
    {
        fontSize:15,
        marginTop:5
    },
    question:
    {
        marginTop:80,
    },
    questionWord:
    {
        fontFamily:'Roboto-Medium',
        fontSize:15,
        marginLeft:20,
        color:'#B7B7B7'
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
})