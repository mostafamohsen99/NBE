import { View, Text,Pressable,StyleSheet,Modal,Image,ScrollView} from 'react-native'
import React, { useEffect } from 'react'
import Balance from '../components/HomeScreenComp/Balance'
import {useState} from 'react';
import Modall from '../components/UI/Modal';
import History from '../components/HomeScreenComp/History';
import { FlatList } from 'react-native-gesture-handler';
import { CREDITCARDIMAGES } from '../dummy_data/dummyData';
import firestore from '@react-native-firebase/firestore';
import { useSelector,useDispatch } from 'react-redux';
import { PriceActions } from '../store/price-slice';
import { TransferActions } from '../store/Transfer-slice';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({navigation}) {
  const[t,i18n]=useTranslation();
  const[modalVisible,setModalVisible]=useState(false);
  const[balanceVal,showBalanceVal]=useState(false);
  const[cardsVisible,setCardsVisible]=useState(false);
  const[foundTransactions,setFoundTransactions]=useState(true);
  const username=useSelector(state=>state.auth.username);
  const priceRedux=useSelector(state=>state.price.initialPrice);
 

  const dispatch=useDispatch();
  
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      setCardsVisible(false);
    }); 
  },[cardsVisible]);

  useEffect(()=>{
    async function getPrice()
    {
      try
      {
        const Price=await firestore().collection('Users').doc(username).get();
       dispatch(PriceActions.addPrice({
        updatedPrice:Price._data.price
       }))
      }
      catch(err)
      {
        console.log('err',err);
      }
    }
    getPrice();
  },[])
  useEffect(()=>{
    async function getTransactions()
    {
      try
      {
        console.log('username',username);
        const Transactions=[];
        const TransactionsFirst=await firestore().collection('Transactions').where('transferFrom','==',username).get();
        const TransactionsSecond=await firestore().collection('Transactions').where('transferTo','==',username).get();
        const [TransactionFirst, TransactionSecond] = await Promise.all([
          TransactionsFirst,
          TransactionsSecond
        ]);
        const TransactionOne=TransactionFirst.docs;
        const TransactionTwo=TransactionSecond.docs;
        console.log('TransactionOne',TransactionOne);
        console.log('TransasctionTwo',TransactionTwo);
        console.log('TransactionOnelength',TransactionOne.length);
        console.log('TransactionTwoLength',TransactionTwo.length);
        if(TransactionOne.length>0&&TransactionTwo.length>0)
        {
          TransactionOne.forEach(Trans=>
            Transactions.push(Trans._data)
          )
          TransactionTwo.forEach(Trans=>
              Transactions.push(Trans._data)
          )
        }
        if(TransactionOne.length>0&&TransactionTwo.length===0)
        {
          TransactionOne.forEach(Trans=>
            Transactions.push(Trans._data)
            )
        }
        if(TransactionOne.length===0&&TransactionTwo.length>0)
        {
          TransactionTwo.forEach(Trans=>
            Transactions.push(Trans._data)
            )
        }
         console.log("Transactions",Transactions);
       let list=[];

       Transactions.forEach((Trans)=>{
        list.push({id:Math.random(),...Trans})
        dispatch(TransferActions.addTransfer({
          id:Math.random(),
         typeofTransfer:Trans.typeofTransfer,
         amount:Trans.amount,
         reason:Trans.reason,
         date:Trans.date,
         img:Trans.img,
         transferFrom:Trans.transferFrom,
         transferTo:Trans.transferTo
       }))
       }
       )
      }
      catch(err)
      {
        console.log('err',err);
      }
    }
    getTransactions();
  },[])
  function showBalanceHandler()
  {
    setModalVisible(true);
  }
  function showBalanceValue()
  {
    showBalanceVal(true);
    setModalVisible(false);
  }
  return (
        <View style={styles.container}>
           <Modall
    word={t("show balance with your fingerprint")}
    PressHandler={showBalanceValue}
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    />
      {cardsVisible&&<View>
        <FlatList
        horizontal={true}
        data={CREDITCARDIMAGES}
        renderItem={({item})=>{
          return <View style={{marginLeft:20,marginTop:20,marginBottom:10}}>
            <Image source={item.img}/>
            </View>
        }}
        />
      </View>}
      {!cardsVisible&&<Balance
      showBalanceHandler={showBalanceHandler}
      balanceVal={balanceVal}
      setCardsVisible={setCardsVisible}
      price={priceRedux}
      />}
     { <History
      cardsVisible={cardsVisible}
      />}
    </View>
  )
}
const styles=StyleSheet.create({
  container:
  {
   backgroundColor:'#E5E5E5',
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