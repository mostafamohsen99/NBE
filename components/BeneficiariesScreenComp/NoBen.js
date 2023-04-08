import { StyleSheet, View,Image,Pressable } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustomText'

const NoBen = () => {
  return (
    <View style={styles.NoBenView}>
    <View style={styles.NoBenImageView}>
        <Image
        style={styles.NoBenImage}
        source={require('../../assets/images/Benefeciaries/NoBeneficiaries.png')}
        />
    </View>
    <View style={styles.NoBenParagraph}>
        <CustomText style={styles.NoBenWord}>No Benefeciaries</CustomText>
        <CustomText style={styles.NoBenWarning}>you don't have beneficiaries,add {'\n'}some so you can send money</CustomText>
        <View style={styles.AddImage}>
            <Pressable>
            <Image
            source={require('../../assets/images/Benefeciaries/GreenAdd.png')}
            />
            </Pressable>
        </View>
    </View>
</View>
  )
}

export default NoBen

const styles = StyleSheet.create({
    NoBenView:
    {
        width:'100%',
        height:'100%',
    },
    NoBenImageView:
    {
        marginTop:200,
        marginLeft:100
    },
    NoBenParagraph:
    {
        marginLeft:100
    },
    NoBenWord:
    {
        marginLeft:40,
        marginVertical:10,
        color:'#34343F',
        fontSize:18
    },
    NoBenWarning:
    {
        color:'#464665',
        fontSize:14
    },
    AddImage:
    {
        marginLeft:60,
        marginTop:10
    }
})