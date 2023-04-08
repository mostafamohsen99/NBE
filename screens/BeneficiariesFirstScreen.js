import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React, { useState,useEffect} from 'react'
import BenificiariesHeader from '../components/BeneficiariesScreenComp/BenificiariesHeader'
import NoBen from '../components/BeneficiariesScreenComp/NoBen'
import Ben from '../components/BeneficiariesScreenComp/Ben'
import NoData from '../components/UI/NoData'
import { useDispatch, useSelector } from 'react-redux'
import { BenefecierActions } from '../store/Benefecier-slice'
import firestore from '@react-native-firebase/firestore';
import LoadingOverlay from '../components/UI/LoadingOverlay'
import { useTranslation } from 'react-i18next'
const BeneficiariesFirstScreen = ({navigation}) => {
    const[t,i18n]=useTranslation();
    const items=useSelector(state=>state.Benefecier.items);
    const username=useSelector(state=>state.auth.username);
   const[gridPressed,setGridPressed]=useState(true);
   const[listPressed,setListPressed]=useState(false);
   const[isFetching,setIsFetching]=useState(true);
   const[benCount,setBenCount]=useState(0);
   const dispatch=useDispatch();
    useEffect(()=>{
        async function getBeneficier()
        {
            setIsFetching(true);
            try{
                const user=await firestore().collection('Benefeciaries').doc(username).collection('myBenefeciaries').get().then((querysnapshot)=>{
                    querysnapshot.forEach(snapshot=>{
                        let data=snapshot.data();
                        dispatch(BenefecierActions.addBenefecier({
                            id:data.phonenumber,
                            imageUri:data.img,
                            phonenumber:data.phonenumber,
                            price:data.price,
                            firstname:data.firstname,
                            lastname:data.lastname,
                            Bankbranch:data.bankbranch,
                            Accountnumber:data.accountNumber,
                            email:data.email
                    }))
                    })
                })
                setIsFetching(false);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        getBeneficier();
    },[])
  return (
    <View style={styles.container}>
        <BenificiariesHeader
        gridPressed={gridPressed}
        setGridPressed={setGridPressed}
        listPressed={listPressed}
        setListPressed={setListPressed}
        />
        {isFetching&&<LoadingOverlay/>}
        {!isFetching&&items.length===0&&<NoData
        img={require('.././assets/images/Benefeciaries/NoBeneficiaries.png')}
        title={t('No Benefeciaries')}
        desc={t('you donot have benefeciaries, add\n some so you can send money')}
        secImg={i18n.language==='en'?require('../assets/images/Benefeciaries/GreenAdd.png'):require('../assets/images/Benefeciaries/edafa.png')}
        />}
        {!isFetching&&
        items.length>0
        &&<Ben
        gridPressed={gridPressed}
        listPressed={listPressed}
        />}
    </View>
  )
}

export default BeneficiariesFirstScreen

const styles = StyleSheet.create({
    container:
    {
    backgroundColor:'#E5E5E5',
    width:'100%',
    height:'100%'
    },
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
        marginLeft:100,
        marginTop:10
    }
})