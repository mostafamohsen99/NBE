import { StyleSheet, Text, View,Modal,Pressable,Image} from 'react-native'
import React from 'react'
import {useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import i18n from '../../i18n/i18n';
import CustomText from './CustomText';

const Modall = ({word,PressHandler,modalVisible,setModalVisible}) => {
  const langSelector=useSelector(state=>state.lang.lang);
  const {t, i18n} = useTranslation();
  useEffect(()=>{
      i18n.changeLanguage(langSelector);
  },[])
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
            <CustomText style={styles.modalText}>{t('Fingerprint for NBE Mobile')}</CustomText>
            <CustomText style={styles.modalSecText}>{word}</CustomText>
            <View style={styles.fingerPrintView}>
            <Pressable
            onPress={PressHandler}
            >
                <Image
                style={styles.fingerPrintImage}
                source={require('../../assets/images/fingerPrint.png')}
                />
            </Pressable>
            <View style={{marginTop:5}}>
                <CustomText>
                    {t('Touch the fingerprint sensor')}
                </CustomText>
            </View>
            </View>
            <Pressable
            style={styles.cancel}
              onPress={() => setModalVisible(!modalVisible)}>
              <CustomText style={styles.textStyle}>{t('Cancel')}</CustomText>
            </Pressable>
          </View>
        </View>
      </Modal>
  )
}

export default Modall

const styles=StyleSheet.create({
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