import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';

const BenificiariesHeader = ({gridPressed,setGridPressed,listPressed,setListPressed}) => {
    const navigation=useNavigation();
    const [t,i18n]=useTranslation();
    function gridPressHandler()
    {
        setGridPressed(true);
        setListPressed(false);
    }
    function listPressHandler()
    {
        setGridPressed(false);
        setListPressed(true);
    }
  return (
    <View>
      <View style={styles.headerBen}>
        <View style={styles.BenWordView}>
        <Text style={styles.BenWordText}>{t('Beneficiaries')}</Text>
      </View>
      <View style={styles.buttonsHeader}>
        <Pressable onPress={gridPressHandler}>
            <View style={[styles.gridsView,gridPressed?{backgroundColor:'green'}:{backgroundColor:'white'}]}>
            <Image  
            style={styles.gridsImage}
            source={require('../../assets/images/Benefeciaries/toggles/grids.png')}/>
            </View>
        </Pressable>
        <Pressable onPress={listPressHandler}>
            <View style={[styles.listView,listPressed?{backgroundColor:'green'}:{backgroundColor:'white'}]}>
            <Image
            style={styles.listImage} 
            source={require('../../assets/images/Benefeciaries/toggles/list.png')}/>
            </View>
        </Pressable>
      </View>
      <View style={styles.addView}>
        <Pressable onPress={()=>navigation.navigate('AddBeneficiarScreen')}>
            {i18n.language==='en'&&
        <Image 
        style={styles.addImage}
        source={require('../../assets/images/Benefeciaries/toggles/Add.png')}/>
          }
          {
            i18n.language==='ar'&&
            <Image 
        style={styles.addImage}
        source={require('../../assets/images/Benefeciaries/اضافة.png')}/>
          }
        </Pressable>
      </View>
        </View>
        <View>
            
        </View>
    </View>
  )
}

export default BenificiariesHeader

const styles = StyleSheet.create({
    headerBen:
    {
        flexDirection:'row',
        paddingTop:10
    },
    buttonsHeader:
    {
        flexDirection:'row'
    },
    BenWordView:
    {
        marginLeft:25
    },
    BenWordText:
    {
        fontSize:20,
        color:'#1C2437',
        fontFamily:'Roboto-Medium'
    },
    buttonsHeader:
    {
        marginLeft:100,
        flexDirection:'row',
        height:'80%',
        paddingBottom:10,
        paddingHorizontal:5,
        borderRadius:20,
        backgroundColor:'white'
    },
    addView:
    {
        marginLeft:10
    },
    gridsView:
    {
        paddingVertical:5,
        paddingHorizontal:5,
        borderRadius:10,
        marginTop:5
    },
    listView:
    {
        paddingVertical:5,
        paddingHorizontal:5,
        marginTop:5,
        borderRadius:10
    }
})