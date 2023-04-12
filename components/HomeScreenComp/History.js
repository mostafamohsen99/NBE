import { StyleSheet, Text, View,FlatList,ScrollView} from 'react-native'
import React from 'react'
import { HISTORY } from '../../dummy_data/dummyData'
import HistoryItems from './HistoryItems'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import CustomText from '../UI/CustomText'
import {useQueryClient} from 'react-query';

const History = ({cardsVisible}) => {
  const queryClient=useQueryClient();
  const items=queryClient.getQueryData('Transactions');
  const [t,i18n]=useTranslation();
  const username=useSelector(state=>state.auth.username);
  //const items=useSelector(state=>state.Transfer.items);
  //console.log('items',items);
  return (
    <View>
      <View style={styles.HeaderView}>
        <View style={styles.HistoryView}>
            <CustomText style={styles.History}>{t('History')}</CustomText>
        </View>
        <View style={styles.viewAllView}>
            <CustomText style={styles.ViewAll}>{t('View All')}</CustomText>
        </View>
      </View>
      {items.length>0&&<View style={cardsVisible?{height:400}:{height:200}}>
      <FlatList
        data={items}
        renderItem={({item})=>{
           return <HistoryItems
           id={item.id}
           name={item.transferFrom===username?item.transferTo:item.transferFrom}
           date={item.date}
           img={item.img}
           price={item.amount}
           />
        }}
        keyExtractor={item=>item.date}
        />  
      </View>}
      {items.length===0&&<View style={styles.noTransactionView}>
        <CustomText style={styles.noTransactionText}>no Transactions added yet!</CustomText>
      </View>}
    </View>
  )
}

export default History

const styles = StyleSheet.create({
    History:{
        color:'#1C2437',
        fontSize:20,
        fontFamily:'Roboto-Medium',
        marginBottom:10
    },
    ViewAll:{
        fontSize:14,
        fontFamily:'Roboto-bold'
    },
    HeaderView:{
        flexDirection:'row'
    },
    HistoryView:
    {
        marginLeft:20
    },
    viewAllView:
    {
        marginTop:5,
        marginLeft:240
    },
    noTransactionView:
    {
      justifyContent:'center',
      alignItems:'center',
      marginTop:100
    },
    noTransactionText:
    {
      fontFamily:'Roboto-Bold',
      fontSize:14,
      color:'red'
    }
})