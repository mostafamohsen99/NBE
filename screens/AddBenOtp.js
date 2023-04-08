import { View, Text ,StyleSheet,Modal,Image,Pressable} from 'react-native'
import React from 'react'
import { useState } from 'react';
import FirstSection from '../components/MobileNumber/FirstSection';
import OTP from '../components/MobileNumber/OTP';
import Timer from '../components/MobileNumber/Timer';
import Button from '../components/UI/Button';
import { useNavigation } from '@react-navigation/native';
import { BenefecierActions } from '../store/Benefecier-slice';
import { useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const AddBenOtp = ({route}) => {
    const dispatch=useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const navigation=useNavigation();
    const mobileNumber=route.params.phonenumber;
    const seconds=30;
    function nextHandler()
    {
      setModalVisible(true);
    }
    async function finishHandler()
    {
    const PhoneNum=route.params.phonenumber;
    const user_firestore=await firestore().collection('Benefeciaries').doc(PhoneNum).set({
     firstname:route.params.firstname,
     lastname:route.params.lastname,
     price:route.params.price,
     phonenumber:route.params.phonenumber,
     bankbranch:route.params.bankbranch,
     accountNumber:route.params.accountNumber,
     email:route.params.email
    })
    .then(() => {
     console.log('added');
    });
    dispatch(BenefecierActions.addBenefecier({
    id:route.params.id,
    phonenumber:route.params.phonenumber,
    price:route.params.price,
    firstname:route.params.firstname,
    lastname:route.params.lastname,
    bankbranch:route.params.bankbranch,
    accountNumber:route.params.accountNumber,
    email:route.params.email
  }))


  navigation.navigate('BeneficiariesFirstScreen')
    }
  return (
    <View>
       <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.ModalImg}>
        <Image source={require('.././assets/images/Benefeciaries/Paper.png')}/>
            </View>
            <View style={styles.ModalTxt}> 
              <Text style={styles.MissionTxt}>Mission Complete</Text>
              <Text style={styles.AdditionTxt}>
                {route.params.firstname+route.params.lastname} was successfully added{'\n'}
                to your benefeciaries list
              </Text>
            </View>
            <View>
              <Button
              style={[styles.loginButton,styles.loginButtonText] }
              onPress={finishHandler}
              >
                Finish
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <FirstSection/>
      <View style={styles.verificationView}>
        <Text style={styles.verification}>Verification</Text>
      </View>
      <View style={styles.verWordView}>
        <Text style={styles.verWord}>Enter 5 digit code we sent to  {mobileNumber}</Text>
      </View>
      <View>
        <OTP/>
      </View>
      <View style={styles.question}>
        <Text style={styles.questionWord}>Didn't receive the code?</Text>
      </View>
      <View>
        <Timer seconds={seconds}/>
      </View>
      <View>
      <Button style={[styles.loginButton,styles.loginButtonText] }
         onPress={nextHandler}
         >
                Next
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
    //MODALSTYLES
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
      color:'#1C2437'
     },
     AdditionTxt:
     {
      color:'#B7B7B7'
     }
})
export default AddBenOtp