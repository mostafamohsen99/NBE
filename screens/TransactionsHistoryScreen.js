import { StyleSheet, Text, View,Image,Modal,Pressable } from 'react-native'
import React,{useState} from 'react'
import UserCard from '../components/UI/UserCard'
import NoData from '../components/UI/NoData';
import TransHistory from '../components/BeneficiariesScreenComp/TransHistory';
import UserCardModel from '../components/BeneficiariesScreenComp/UserCardModel';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/UI/CustomText';
import {useQuery} from 'react-query';
import firestore from '@react-native-firebase/firestore';




const TransactionsHistoryScreen = ({route}) => {
  const username=useSelector(state=>state.auth.username);
  const fetchDataBetweenBen=async()=>{
    let list;
    const transaction_between=await firestore().collection('Transactions').get();
    const newarr=transaction_between.docs.filter((doc)=>{
      let data=doc.data();
      if((data.transferFrom===route.params.Currentuser&&data.transferTo===route.params.Userphonenumber)||(data.transferFrom===route.params.Userphonenumber&&data.transferTo===route.params.Currentuser))
        {
          return true;
        }
    })
    const lastNewArr=newarr.map(item=>{
      return item.data()
    })
    return lastNewArr;
  }
  const[t,i18n]=useTranslation();
  const[modalVisible,setModalVisible]=useState(false);
  const{isLoading,error,isError,isFetching,data:TransBetweenUsers}=useQuery(['TransBetweenUsers',route.params.Currentuser,route.params.Userphonenumber],fetchDataBetweenBen)
  const TRANSACTIONS=useSelector(state=>state.Transfer.items);
  if(isLoading||isFetching)
  {
    return <Text>Loading....</Text>
  }
  return (
    <View>
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
            <Pressable onPress={()=>setModalVisible(false)}>
            <UserCardModel
             id={route.params.Userphonenumber}
             name={route.params.Username}
             img={route.params.Userimg}
             phonenumber={route.params.Userphonenumber}
             email={route.params.Useremail}
            />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={()=>setModalVisible(true)}>
      <UserCard
      id={route.params.Userid}
      name={route.params.Username}
      img={route.params.Userimg}
      price={route.params.Userprice}
      phonenumber={route.params.Userphonenumber}
      />
      </Pressable>
      <View>
        <View style={styles.TransactionView}>
            <CustomText style={styles.TransactionText}>{t('Transactions History')}</CustomText>
        </View>
        {
            TransBetweenUsers.length===0&&<NoData
            img={require('.././assets/images/Benefeciaries/NoTransactions.png')}
            title={t('No History')}
            desc={t('Not a single Transaction was made to this account')}
            />
        }
        {
            TransBetweenUsers.length>0&&<TransHistory
            list={route.params.list}
            />
        }
      </View>
    </View>
  )
}

export default TransactionsHistoryScreen

const styles = StyleSheet.create({
  TransactionView:
  {
    marginLeft:30,
    marginTop:15
  },
  TransactionText:
  {
    fontFamily:'Roboto-Bold',
    color:'#1C2437',
    fontSize:16
  },
  //MODAL
  image:{
    width:'100%',
    height:'100%'
 },
 centeredView: {
     justifyContent:'center',
     alignItems:'center',
     height:1000,
     marginTop:110
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
})