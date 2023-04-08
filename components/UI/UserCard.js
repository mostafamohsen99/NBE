import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const UserCard = ({id,name,img,price,phonenumber}) => {
  return (
    <View>
        <View style={styles.container}>
        <View style={styles.Card}>
        <View style={styles.PersonImgView}> 
        <Image 
        style={styles.personImg}
        src={img}/>
      </View>
      <View style={styles.ImagePar}>
        <View style={styles.nameView}>
            <CustomText style={styles.nameText}>{name}</CustomText>
        </View>
        <View>
            <View style={styles.phonePar}>
            <View>
                <Image
                 source={require('../../assets/images/Benefeciaries/toggles/PhoneNumber.png')}/>
            </View>
            <View>
                <CustomText>{phonenumber}</CustomText>
            </View>
            </View>
            <View style={styles.pricePar}>
            <View>
                <Image
                source={require('../../assets/images/Benefeciaries/toggles/Price.png')}
                />
            </View>
            <View>
                <CustomText>{price}</CustomText>
            </View>
            </View>
        </View>
        <View>
        </View>
      </View>
      <View style={styles.Next}>
            <Image source={require('../../assets/images/Benefeciaries/toggles/next.png')}/>
        </View>
        </View>
    </View>
    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
    container:
    {
        marginLeft:20,
        marginTop:20,
        backgroundColor:'white',
        width:350,
        borderRadius:18
    },
    Card:
    {
        flexDirection:'row'
    },
    PersonImgView:
    {
        height:100,
    },
    ImagePar:
    {
        marginLeft:20,
        marginTop:20
    },
    phonePar:
    {
        flexDirection:'row',
        marginVertical:3
    },
    pricePar:
    {
        flexDirection:'row',
        marginVertical:3
    },
    Next:
    {
        position:'absolute',
        left:300
    },
    nameText:
    {
        fontSize:15,
        color:'#1C2437',
        fontFamily:'Roboto-Bold'
    },
    personImg:
    {
        width:70,
        height:70,
        marginTop:20,
        marginLeft:10,
        borderRadius:20
    }
})