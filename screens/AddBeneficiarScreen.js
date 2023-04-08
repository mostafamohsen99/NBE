import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React,{useState} from 'react'
import FirstSection from '../components/MobileNumber/FirstSection'
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePick from '../components/UI/ImagePick';
import Input from '../components/UI/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../components/UI/Button';
import DropDown from '../components/UI/DropDown';
import { BenefecierActions } from '../store/Benefecier-slice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const AddBeneficiarScreen = () => {
  const navigation=useNavigation();
  const [t,i18n]=useTranslation();
  const dispatch=useDispatch();
  const[imageUri,setimageUri]=useState('');
  const[firstname,setFirstName]=useState('');
  const[lastname,setLastName]=useState('');
  const[bankbranch,setBankbranch]=useState('');
  const[accountNumber,setAccountNumber]=useState('');
  const[phonenumber,setPhoneNumber]=useState('');
  const[email,setEmailHandler]=useState('');
  const openGallery=()=>{
    let options=
    {
      storageOptions:{
        path:'images',
        mediaType:'photo'
      },
      includeBase64:true
    }
    launchImageLibrary(options, response=>{
      if(response.didCancel){
        console.log('User cancelled image picker')
      }else if(response.error){
        console.log('ImagePicker Error',response.error)
      }else if(response.customButton){
        console.log('User tapped custom button:',response.customButton)
      }else{
        const source={uri:response.assets[0].uri}
        setimageUri(source);
      }
    });
  }
  function FirstnameHandler(text)
  {
    setFirstName(text)
  }
  function lastnameHandler(text)
  {
    setLastName(text);
  }
  function BankbranchHandler(text)
  {
    setBankbranch(text)
  }
  function AccountnumberHandler(text)
  {
    setAccountNumber(text)
  }
  function PhonenumberHandler(text)
  {
    setPhoneNumber(text)
  }
  function EmailHandler(text)
  {
    setEmailHandler(text);
  }
  function loginHandler()
  {
    const id=Math.random().toString();
    const price=0;
   navigation.navigate('SecondMobNumber',
   {
    id:id,
    imageUri:imageUri,
    phonenumber:phonenumber,
    price:price,
    firstname:firstname,
    lastname:lastname,
    bankbranch:bankbranch,
    accountNumber:accountNumber,
    email:email,
    position:'AddBenefeciarScreen'
   });
  }
  return (
    <View>
      <KeyboardAwareScrollView>
      <View>
      <FirstSection 
      img={require('../assets/images/Form/Notifications.png')}
      />
      </View>
      <View>
        <View>
          <ImagePick
          imageUri={imageUri}
          openGallery={openGallery}
          />
        </View>
        <View style={{flexDirection:'row'}}>
        <View style={{width:170,marginTop:10}}>
          <Input
          Textname={t("First name")}
          TextHandler={FirstnameHandler}
          src={null}
          bgBeforeFocus={styles.BgBeforeFocus}
          bgAfterFocus={styles.BgAfterFocus}
          TextColorBeforeFocus={styles.TextColorBeforeFocus}
          TextColorAfterFocus={styles.TextColorAfterFocus}
          Textstate={firstname}
          />
        </View>
        <View style={{width:200,marginTop:10}}>
          <Input
          Textname={t("Last name")}
          TextHandler={lastnameHandler}
          src={null}
          bgBeforeFocus={styles.BgBeforeFocus}
          bgAfterFocus={styles.BgAfterFocus}
          TextColorBeforeFocus={styles.TextColorBeforeFocus}
          TextColorAfterFocus={styles.TextColorAfterFocus}
          Textstate={lastname}
          />
        </View>
        </View>
        <DropDown
        setBankbranch={setBankbranch}
        bankbranch={bankbranch}
        />
        <View>
        <Input
          Textname={t("Account number")}
          TextHandler={AccountnumberHandler}
          src={null}
          bgBeforeFocus={styles.BgBeforeFocus}
          bgAfterFocus={styles.BgAfterFocus}
          TextColorBeforeFocus={styles.TextColorBeforeFocus}
          TextColorAfterFocus={styles.TextColorAfterFocus}
          Textstate={accountNumber}
          />
        </View>
        <View>
        <Input
          Textname={t("Phone number")}
          TextHandler={PhonenumberHandler}
          src={null}
          bgBeforeFocus={styles.BgBeforeFocus}
          bgAfterFocus={styles.BgAfterFocus}
          TextColorBeforeFocus={styles.TextColorBeforeFocus}
          TextColorAfterFocus={styles.TextColorAfterFocus}
          Textstate={phonenumber}
          />
        </View>
        <View>
        <Input
          Textname={t("Email")}
          TextHandler={EmailHandler}
          src={null}
          bgBeforeFocus={styles.BgBeforeFocus}
          bgAfterFocus={styles.BgAfterFocus}
          TextColorBeforeFocus={styles.TextColorBeforeFocus}
          TextColorAfterFocus={styles.TextColorAfterFocus}
          Textstate={email}
          />
        </View>
      </View>
      <View>
      <Button style={[styles.loginButton,styles.loginButtonText]}
            onPress={loginHandler}
            >
                {t('Add Benefencier')}
            </Button>
      </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default AddBeneficiarScreen

const styles = StyleSheet.create({
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
      width:'90%',
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
  }
})