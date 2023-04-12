import { StyleSheet, Text, View,FlatList,Image} from 'react-native'
import { CREDITCARDIMAGES } from '../dummy_data/dummyData'
import React from 'react'
import DragDrop from '../components/AirPay/DragDrop'
import {useState} from 'react';
import Button from '../components/UI/Button';
import Modall from '../components/UI/Modal';
import SecModal from '../components/UI/SecModal';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/UI/CustomText';
import {useQueryClient} from 'react-query'

const AirPayScreen = () => {
  const queryClient=useQueryClient();
    const[card,setCard]=useState(null);
    const[isDragged,setIsDragged]=useState(null);
    const[modalVisible,setModalVisible]=useState(false);
    const[modalTwoVisible,setModalTwoVisible]=useState(false);
    const[successPayment,setSuccessPayment]=useState(true);
    const [t,i18n]=useTranslation();
    function NextModal()
    {
        setModalTwoVisible(true);
        setModalVisible(false);
    }
    function finishHandler()
    {
      setModalTwoVisible(false);
    }
  return (
    <View>
      <View>
      <Modall
    word={t('AirPayment')}
    PressHandler={NextModal}
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    />
    <SecModal
    img={successPayment?require('.././assets/images/cards.png'):require('.././assets/images/cardsTwo.png')}
    Txt={successPayment?t("Mission Complete"):t("Oops...")}
    success={successPayment?"success":"notsuccess"}
    buttonWord={t('Done')}
    finishHandler={finishHandler}
    modalVisible={modalTwoVisible}
    setModalVisible={setModalTwoVisible}
    />
        <View style={styles.cardsHeader}>
          <CustomText style={styles.cardsText}>{t('Cards')}</CustomText>
        </View>
        <View style={{zIndex:1,elevation:5}}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={CREDITCARDIMAGES}
        renderItem={({item,index})=>{
          return <DragDrop img={item.img} card={card} setCard={setCard} isDragged={isDragged} setIsDragged={setIsDragged} index={index}/>
        }}
        keyExtractor={(item)=>item.img}
        />
        </View>
        <View style={styles.box}>
       {card==null ? <View style={{justifyContent:'center',alignItems:'center',marginTop:100,width:'80%',marginLeft:40}}>
                        <CustomText style={{fontSize:16,color:'#007236'}}>{t('Touch hold a card when drag it to this box')}</CustomText>
                    </View>
        :
        <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
            <Image source={card}/>
        </View> }
        </View>
        <View style={styles.buttonView}>
        <Button style={[styles.loginButton,styles.loginButtonText]}
        onPress={()=>setModalVisible(true)}
        img={require('../assets/images/register.png')}
        >
              {t('Pay Now')}
            </Button>
        </View>
      </View>
    </View>
  )
}

export default AirPayScreen

const styles = StyleSheet.create({
    cardsHeader:
  {
    marginLeft:30
  },
  cardsText:
  {
    fontSize:20,
    fontWeight:700,
    color:'#1C2437'
  },
  box:
  {
    borderRadius:20,
    borderWidth:2,
    borderStyle:'dashed',
    width:'88%',
    marginLeft:20,
    height:220,
    borderColor:'#007236',
    zIndex:-1,
    elevation:-1,
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    marginBottom:50
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
  },
  buttonView:
  {
    top:50
  }
})