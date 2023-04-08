import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import useState from 'react'
import PanResponderFirst from './PanResponderFirst'

const PanRespFlatList = () => {
 const[shifting,setShifting]=useState(false);
  return (
    <View>
        <PanResponderFirst shifting={shifting}/>
        <PanResponderFirst  shifting={shifting}/>
    </View>
  )
}

export default PanRespFlatList

const styles = StyleSheet.create({
    
})