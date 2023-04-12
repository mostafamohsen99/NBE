import { View,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import FirstSection from '../components/MobileNumber/FirstSection';
import OTP from '../components/MobileNumber/OTP';
import Timer from '../components/MobileNumber/Timer';
import Button from '../components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import SecModal from '../components/UI/SecModal';
import {useTranslation} from 'react-i18next';
import CustomText from '../components/UI/CustomText';
import {useQueryClient,useMutation} from 'react-query';

const AddBenefecierQuery=async (dataa)=>{
  let user=dataa.currentUser;
  delete dataa.currentUser;
  await firestore().collection('Benefeciaries').doc(user).collection('myBenefeciaries').doc(dataa.phonenumber).set(dataa)
}

const AddTransferQuery=async(data)=>{
  await firestore().collection('Transactions').add(data)
}



export default function SecondMobnumber({route}) {
  const queryClient=useQueryClient();
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
  const priceRedux=queryClient.getQueryData('updatedPrice');
  const {mutate:AddBenReactQuery}=useMutation(AddBenefecierQuery,{
    onSuccess:()=>{
      queryClient.invalidateQueries('Benefeciaries')
    }
  })
  const {mutate:AddTransReactQuery}=useMutation(AddTransferQuery,{
    onSuccess:()=>{
      queryClient.invalidateQueries('Transactions')
    }
  })

  const {mutate:AddPricetoReciever}=useMutation(async(priceReduxInt_to)=>{
    await firestore().collection('Users').doc(route.params.transferTo).update({
      price:priceReduxInt_to
    });
  })

  const {mutate:AddPricetoSender}=useMutation(async(priceReduxInt_from)=>{
   await firestore().collection('Users').doc(route.params.transferFrom).update({
      price:priceReduxInt_from
    })
  },
  {
    onSuccess:()=>{
      queryClient.invalidateQueries('updatedPrice')
    }
  })

  const {mutate:AddPricetoBenefecier}=useMutation(async(ben_price_redux)=>{
   await firestore().collection('Benefeciaries').doc(route.params.transferFrom).collection('myBenefeciaries').doc(route.params.transferTo).update({
      price:ben_price_redux 
  })
  })

  console.log('Price_Redux_Before',priceRedux);
  useEffect(()=>{
    i18n.changeLanguage(langSelector);
  },[])
  async function finishHandler()
    {
    if(route.params.position==='AddBenefeciarScreen')
    {
      const reference =storage().ref(route.params.phonenumber+'.png');
      await reference.putFile(route.params.imageUri.uri);
       const url = await storage().ref(route.params.phonenumber+'.png').getDownloadURL();
      const PhoneNum=route.params.phonenumber;
      const dataa={
        currentUser:user,
        firstname:route.params.firstname,
        lastname:route.params.lastname,
        img:url,
        price:route.params.price,
        phonenumber:route.params.phonenumber,
        bankbranch:route.params.bankbranch,
        accountNumber:route.params.accountNumber,
        email:route.params.email
       }
       AddBenReactQuery(dataa,currentUser)
      navigation.navigate('BeneficiariesFirstScreen');
    }
    if(route.params.position==='TransferScreen')
    {
      const Transferfrom=route.params.transferFrom;
      const Transferto=route.params.transferTo;
      try
      {
        const firestoreVar=await firestore().collection('Benefeciaries').doc(Transferfrom).collection('myBenefeciaries').doc(Transferto).get();
        const img_firestore=firestoreVar._data.img;
        let dataa= {
          typeofTransfer:route.params.typeofTransfer,
          transferFrom:route.params.transferFrom,
          transferTo:route.params.transferTo,
          amount:route.params.amount,
          reason:route.params.reason,
          date:route.params.date,
          img:img_firestore
        }
        AddTransReactQuery(dataa)
        let price_Redux_num=priceRedux.updatedPrice;
        const priceReduxInt=parseInt(price_Redux_num);
        let pr_to_fir_store=await firestore().collection('Users').doc(route.params.transferTo).get();
        let sec_user_price=pr_to_fir_store.data().price;
        //console.log('pr_to_fir_store',pr_to_fir_store);
        let priceReduxInt_to=sec_user_price+parseInt(route.params.amount);
        let priceReduxInt_from=priceReduxInt-parseInt(route.params.amount);
        AddPricetoReciever(priceReduxInt_to);
        AddPricetoSender(priceReduxInt_from);
        let ben_price_redux=parseInt(firestoreVar._data.price);
        ben_price_redux+=parseInt(route.params.amount);
        AddPricetoBenefecier(ben_price_redux);
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