import { StyleSheet, Text, View,Image,Pressable} from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import CustomText from '../UI/CustomText'

const CardItem = ({name,image,backgroundColor,setCardsVisible}) => {
    const[t,i18n]=useTranslation();
  return (
    <View style={styles.container}>
        <Pressable onPress={()=>name==='Cards'?setCardsVisible(true):setCardsVisible(false)}>
        <View style={styles.allrow}>
            <View style={[styles.item,{backgroundColor:backgroundColor}]}>
                    <Image 
                    style={styles.img}
                    source={image}/>
            </View>
            <View >
                    <CustomText style={styles.Name}>{t(name)}</CustomText>
            </View>
        </View>
        </Pressable>
    </View>
  )
}

export default CardItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    allrow:
    {
       marginLeft:7
    },
    item:{
        borderRadius:10,
        marginHorizontal:15,
        width:59,
        height:59,
        justifyContent:'center',
        alignItems:'center'
    },
    Name:
    {
        fontSize:14,
        textAlign:'center'
    },
    img:
    {
     

    }
})