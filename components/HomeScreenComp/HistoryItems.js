import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustomText';

const HistoryItems = ({name,price,date,img}) => {
  return (
    <View>
    <View style={styles.HistoryView}>
       {img!==null&& <View style={styles.ViewImg}>
            <Image 
            src={img}
            style={styles.personImg}
            />
        </View>}
        <View style={styles.MarketDesc}>
            <CustomText style={styles.MarketName}>{name}</CustomText>
            <CustomText>{date}</CustomText>
        </View>
        <View style={styles.MarketPrice}>
            <CustomText>${price}</CustomText>
        </View>
    </View>
    <View style={{width:'90%',height:1,backgroundColor:'#B7B7B7',marginLeft:20}}>

    </View>
    </View>
  )
}

export default HistoryItems

const styles = StyleSheet.create({
    HistoryView:{
        flexDirection:'row',
         backgroundColor:'transparent',
        width:'88%',
         marginLeft:20,
         marginVertical:1,
         height:60,
         paddingVertical:3
    },
    MarketName:
    {
        color:'#1C2437',
        fontSize:15
    },
    MarketDesc:
    {
        marginLeft:10
    },
    MarketPrice:
    {
        position:'absolute',
        left:300
    },
    ViewImg:
    {
        height:'100%',
        width:'30%'
    },
    personImg:
    {
        width:'100%',
        height:'100%'
    }
})