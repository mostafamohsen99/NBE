import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustomText'

const BenUserCard = ({name,img,index}) => {
  return (
    <View style={[styles.container,index%4===0?{marginLeft:20}:{marginLeft:15}]}>
    <View style={styles.ViewImg}>
        <Image 
        style={styles.personImg}
        src={img}/>
    </View>
    <View >
        <CustomText style={styles.TxtName}>{name}</CustomText>
    </View>
 </View>
  )
}

export default BenUserCard

const styles=StyleSheet.create({
    container:
    {
        backgroundColor:'white',
        width:77,
        marginTop:10,
        height:86,
        borderRadius:18
    },
    ViewImg:
    {
       height:'70%'
    },
    personImg:
    {
        width:'100%',
        height:'100%',
        borderTopLeftRadius:18,
        borderTopRightRadius:18
    },
    TxtName:
    {
        textAlign:'center'
    }
})

