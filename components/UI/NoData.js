import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from 'react-i18next';
import CustomText from './CustomText';

const NoData = ({img,title,desc,secImg}) => {
    const navigation=useNavigation();
    const[t,i18n]=useTranslation();
  return (
    <View style={styles.NoBenView}>
    <View style={styles.NoBenImageView}>
        <Image
        style={styles.NoBenImage}
        source={img}
        />
    </View>
    <View style={styles.NoBenParagraph}>
        <CustomText style={styles.NoBenWord}>{title}</CustomText>
        <CustomText style={styles.NoBenWarning}>{desc}</CustomText>
        {title!==t('No History')&&<View style={styles.AddImage}>
            <Pressable
            onPress={()=>navigation.navigate('AddBeneficiarScreen')}
             >
            {secImg&&<Image
            source={secImg}
            />}
            </Pressable>
        </View>}
    </View>
</View>
  )
}

export default NoData

const styles = StyleSheet.create({
    NoBenView:
    {
        width:'100%',
        height:'100%',
    },
    NoBenImageView:
    {
        marginTop:150,
        marginLeft:100
    },
    NoBenParagraph:
    {
        marginLeft:0
    },
    NoBenWord:
    {
        marginLeft:130,
        marginVertical:10,
        color:'#34343F',
        fontSize:18
    },
    NoBenWarning:
    {
        color:'#464665',
        fontSize:14,
        textAlign:'center',
    },
    AddImage:
    {
        marginLeft:150,
        marginTop:10
    }
})