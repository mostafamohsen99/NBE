import { StyleSheet, Text, View,FlatList} from 'react-native'
import React from 'react'
import HistoryItems from '../HomeScreenComp/HistoryItems'
const TransHistory = ({list}) => {
 
  return (
    <View style={{height:'90%'}}>
      <FlatList
    data={list}
    renderItem={({item})=>{
        return<HistoryItems
        name={item.reason}
        date={item.date}
        price={item.amount}
        img={null}
        />
    }}
    keyExtractor={(item)=>item.id}
      />
    </View>
  )
}

export default TransHistory

const styles = StyleSheet.create({})