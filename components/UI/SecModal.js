import { StyleSheet, Text, View,Image,Modal} from 'react-native'
import React from 'react'
import Button from './Button'
import { I18nManager } from 'react-native'
import { useTranslation } from 'react-i18next'
import CustomText from './CustomText'

const SecModal = ({img,Txt,firstname,lastname,buttonWord,finishHandler,modalVisible,setModalVisible,success,transferFrom,transferTo}) => {
  const [t,i18n]=useTranslation();
 // console.log('success',success);
 // console.log('buttonWord',buttonWord)
  return (
    <Modal
    animationType="none"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      //Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.ModalImg}>
    <Image source={img}/>
        </View>
        <View style={styles.ModalTxt}> 
          <CustomText style={success==='success'?styles.MissionTxt:styles.WrongTxt}>{Txt}</CustomText>
          {firstname&&lastname&&i18n.language==='en'&&
          <CustomText style={styles.AdditionTxt}>
            {firstname+lastname} was successfully added{'\n'}
            to your benefeciaries list
          </CustomText>}
          {
            firstname&&lastname&&i18n.language==='ar'&&
            <CustomText style={styles.AdditionTxt}>
                بنجاح الي قائمة المستفيدين{firstname+lastname} تمت اضافة
            </CustomText>
          }
          {
            transferFrom&&transferTo&&i18n.language==='en'&&
            <CustomText style={styles.AdditionTxt}>
              Transfer to {transferTo} was successful
            </CustomText>
          }
          {
            transferFrom&&transferTo&&i18n.language==='ar'&&
            <CustomText style={styles.AdditionTxt}>
              تم التحويل الي {transferTo}
            </CustomText>
          }
          {
            success==='success'&&i18n.language==='en'&&
            <View>
              <CustomText style={styles.firstText}>Your Payment to <CustomText style={{fontWeight:'bold'}}>IKEA</CustomText> Was Successful</CustomText>
              <CustomText style={styles.secondText}>$5542.00</CustomText>
            </View>
          }
           {
            success==='success'&&i18n.language==='ar'&&
            <View>
              <CustomText style={styles.firstText}>نجحت عملية الدفع ل <CustomText style={{fontWeight:'bold'}}>IKEA</CustomText></CustomText>
              <CustomText style={styles.secondText}>$5542.00</CustomText>
            </View>
          }
          {
            success==='notsuccess'&&
              <View>
                <CustomText style={styles.firstText}>{t('Your Payment to didnt go through')}</CustomText>
                <CustomText style={styles.secondText}>$5542.00</CustomText>
            </View>
          }
        </View>
        <View>
          {(success==='success'||(firstname&&lastname)||(transferFrom&&transferTo))&&
              <Button
              style={[styles.loginButton,styles.loginButtonText] }
              onPress={finishHandler}
              >
                {buttonWord}
              </Button>
          }
          {
            success==='notsuccess'&&
            <View style={{flexDirection:'row'}}>
              <Button style={[styles.CancelButton,styles.CancelButtonText] }
              onPress={finishHandler}>{t('Cancel')}</Button>
              <Button style={[styles.TryAgainButton,styles.TryAgainButtonText] }
              onPress={finishHandler}>{t('Try again')}</Button>
            </View>
          }
        </View>
      </View>
    </View>
  </Modal>
  )
}

export default SecModal

const styles = StyleSheet.create({
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
  CancelButton:
  {
    backgroundColor:'white',
    color:'white',
    borderRadius:12.5,
    borderColor:"red",
    borderWidth:1.5,
    marginBottom:'8%',
    width:'30%',
    marginLeft:20
  },
  CancelButtonText:
  {
    color:'red',
    fontFamily:'Roboto-Bold',
    fontSize:15,
    fontStyle:'normal',
    textAlign:'center',
    paddingVertical:15
  },
  TryAgainButton:
  {
    backgroundColor:'#007236',
    color:'green',
    borderRadius:12.5,
    marginBottom:'8%',
    width:'50%',
    marginLeft:20
  },
  TryAgainButtonText:
  {
    color:'white',
    fontFamily:'Roboto-Bold',
    fontSize:15,
    fontStyle:'normal',
    textAlign:'center',
    paddingVertical:15
  },
  //MODAL
  image:{
    width:'100%',
    height:'100%'
 },
 centeredView: {
     width:'90%',
     height:'130%',
     marginLeft:20,
     marginTop:250,
     justifyContent:'flex-start',
     alignItems:'center',
   },
   modalView: {
     backgroundColor: 'white',
     borderRadius:20,
     paddingTop:10,
     elevation:5,
     width:'100%',
     height:'30%'
   },
   ModalImg:
   {
    justifyContent:'center',
    alignItems:'center'
   },
   ModalTxt:
   {
    justifyContent:'center',
    alignItems:'center'
   },
   MissionTxt:
   {
    fontWeight:'bold',
    color:'#1C2437',
    fontSize:20
   },
   WrongTxt:
   {
    color:'#EB001B',
    fontSize:20,
    fontWeight:'bold'
   },
   AdditionTxt:
   {
    color:'#B7B7B7'
   },
   firstText:
   {
    fontSize:16,
    fontFamily:'Roboto-Medium',
    color:'#B7B7B7'
   },
   secondText:
   {
    fontSize:40,
    color:'#1C2437',
    justifyContent:'center',
    marginLeft:60
   }
})