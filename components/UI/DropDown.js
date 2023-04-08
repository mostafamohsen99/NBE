import { StyleSheet, Text, View,TextInput} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useTranslation } from 'react-i18next';

import React from 'react';
import {useState} from 'react';
import CustomText from './CustomText';


const DropDown = ({setBankbranch,bankbranch}) => {
    const[val,setVal]=useState('');
    const[t,i18n]=useTranslation();
    const countries = [t("040-NasrCity"),
t("041-Agouza"),
t("042-Sheration"),
t("043-Fifth Settlement"),
t("044-Haram"),
t("045-Almaza"),
t("046-Shoubra"),
t("047-Rehab"),
t("048-Mokattam"),
]
  return (
    <View style={styles.container}>
        <View>
            <CustomText style={styles.Banktext}>{t('Bank Branch')}</CustomText>
        </View>
        <View style={styles.dropDownStyle}>
        <SelectDropdown
	data={countries}
	onSelect={(selectedItem, index) => {
		//console.log(selectedItem, index)
        setBankbranch(selectedItem);
        //console.log("bankbranch",bankbranch);
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		return item
	}}
    defaultButtonText='043-FifthSettlement'
    buttonStyle={styles.ButtonStyle}
    buttonTextStyle={{
        
        position:'absolute',
        right:10
    }}
/>
    </View>
    </View>
  )
}

export default DropDown

const styles = StyleSheet.create({
    container:
    {
        backgroundColor:'white',
        width:'88%',
        marginLeft:20,
        marginBottom:15
    },
    Banktext:
    {
        marginLeft:14,
        fontSize:14,
        fontFamily:'Roboto-Medium',
        color:'black'
    },
    dropDownStyle:
    {
        width:40
    },
    ButtonStyle:
    {
        backgroundColor:'white',
    }

})