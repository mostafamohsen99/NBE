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
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query'


  //UseQuery
  const fetchPriceFromUser=async(firstCol,firstDoc)=>{
    const Price=await firestore().collection(firstCol).doc(firstDoc).get();
    let price_data={id:Price.data().name,updatedPrice:Price.data().price}
    return price_data;
  }

  const fetchTransactions=async(firstCol,firstDoc)=>{
    const TransactionsFirst=await firestore().collection(firstCol).where('transferFrom','==',firstDoc).get();
    const TransactionsSecond=await firestore().collection(firstCol).where('transferTo','==',firstDoc).get();
   const TransFirst=TransactionsFirst.docs.map(doc=>({id:doc.data().transferFrom,...doc.data()}))
   const TransSecond=TransactionsSecond.docs.map(doc=>({id:doc.data().transferFrom,...doc.data()}))
   let TransTotal=[...TransFirst,...TransSecond];
   return TransTotal;
  }

export default function HomeScreen({navigation}) {
  const[t,i18n]=useTranslation();
  const[modalVisible,setModalVisible]=useState(false);
  const[balanceVal,showBalanceVal]=useState(false);
  const[cardsVisible,setCardsVisible]=useState(false);
  const username=useSelector(state=>state.auth.username);

 
  const{isLoading:Loading1,error:error1,isError:Error1,isFetching:Fetching1,data:updatedPrice}=useQuery('updatedPrice',()=>fetchPriceFromUser('Users',username))
  const{isLoading:Loading2,error:error2,isError:Error2,isFethcing:Fetching2,data:Transactions}=useQuery('Transactions',()=>fetchTransactions('Transactions',username))
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      setCardsVisible(false);
    }); 
  },[cardsVisible]);

  
  function showBalanceHandler()
  {
    setModalVisible(true);
  }
  function showBalanceValue()
  {
    showBalanceVal(true);
    setModalVisible(false);
  }
  if(Loading1||Fetching1||Loading2||Fetching2)
  {
    return <Text>Loading....</Text>;
  }
  if(Error1)
  {
    return <Text>{error1}</Text>
  }
  if(Error2)
  {
    return <Text>{error2}</Text>
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
      price={updatedPrice?.updatedPrice}
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