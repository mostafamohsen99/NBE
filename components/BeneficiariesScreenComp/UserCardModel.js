import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomText from '../UI/CustomText';

const UserCardModel= ({id,name,img,email,phonenumber}) => {
    const navigation=useNavigation();
    const[t,i18n]=useTranslation();
    function PressHandler()
    {
      //  console.log('pressed');
        navigation.navigate(t('Account Summary'),{screen:t('Transfer')})
    }
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
            <View style={{marginTop:3}}>
                <Image
                 source={require('../../assets/images/Benefeciaries/toggles/PhoneNumber.png')}/>
            </View>
            <View>
                <CustomText>{phonenumber}</CustomText>
            </View>
            </View>
            <View style={styles.pricePar}>
            <View style={{marginTop:3}}>
                <Image
                source={require('../../assets/images/Benefeciaries/toggles/Email.png')}
                />
            </View>
            <View>
                <CustomText>{email}</CustomText>
            </View>
            </View>
        </View>
        <View>
        </View>
      </View>
        </View>
    </View>
    <View style={styles.ListContainer}>
        <View style={styles.List}>
            <Pressable onPress={PressHandler}>
            <View style={styles.TransferList}>
                <View>
                    <Image source={require('../../assets/images/Benefeciaries/toggles/Transfer.png')}/>
                </View>
                <View style={styles.transferName}>
                    <CustomText style={styles.transferWord}>{t('Transfer')}</CustomText>
                    <CustomText style={styles.transferDesc}>{t('Transfer money to') +name}</CustomText>
                </View>
                <View style={styles.fingerPrintImg}>
                    <Image source={require('../../assets/images/Benefeciaries/toggles/register.png')}/>
                </View>
            </View>
            </Pressable>

            <View style={styles.editList}>
                <View>
                    <Image source={require('../../assets/images/Benefeciaries/toggles/Edit.png')}/>
                </View>
                <View style={styles.Editname}>
                    <CustomText style={styles.EditWord}>{t('Edit')}</CustomText>
                    {i18n.language==='en'&&
                    <CustomText style={styles.EditDesc}>Edit {name} data</CustomText>
                    }
                    {
                        i18n.language==='ar'&&
                        <CustomText style={styles.EditDesc}>عدل بيانات {name}</CustomText>
                    }
                </View>
            </View>
            <View style={styles.DeleteList}>
                <View>
                    <Image source={require('../../assets/images/Benefeciaries/toggles/delete.png')}/>
                </View>
                <View style={styles.Deletename}>
                    <CustomText style={styles.DeleteWord}>{t('Delete')}{name}</CustomText>
                    {
                        i18n.language==='en'&&
                    <CustomText style={styles.DeleteDesc}>Delete {name} & her transaction History</CustomText>
                    }
                    {
                        i18n.language==='ar'&&
                        <CustomText style={styles.DeleteDesc}>لو مسحت {name} هتمسح معاه كل التحويلات</CustomText>
                    }
                </View>
            </View>

        </View>
    </View>
    </View>
  )
}

export default UserCardModel

const styles = StyleSheet.create({
    container:
    {
        marginLeft:20,
        backgroundColor:'white',
        width:350,
        borderRadius:18,
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
    },
    ListContainer:
    {
        marginLeft:30
    },
    TransferList:
    {
        flexDirection:'row',
        paddingVertical:10
    },
    editList:
    {
        flexDirection:'row',
        paddingVertical:10
    },
    DeleteList:
    {
        flexDirection:'row',
        paddingVertical:10
    },
    fingerPrintImg:
    {
        marginLeft:115
    },
    transferName:
    {
        marginLeft:15,
    },
    transferWord:
    {
        fontSize:16,
        color:'#1C2437',
        fontFamily:'Roboto-Bold'
    },
    transferDesc:
    {
        color:'#848484',
        fontSize:12
    },
    Editname:
    {
        marginLeft:15,
    },
    EditWord:
    {
        fontSize:16,
        color:'#1C2437',
        fontFamily:'Roboto-Bold'
    },
    EditDesc:
    {
        color:'#848484',
        fontSize:12
    },
    Deletename:
    {
        marginLeft:15
    },
    DeleteWord:
    {
        fontSize:16,
        color:'#1C2437',
        fontFamily:'Roboto-Bold'
    },
    DeleteDesc:
    {
        color:'#848484',
        fontSize:12
    }
})