import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import UserCard from '../UI/UserCard';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';


const BenUserList = ({id,name,img,price,phonenumber,email}) => {
    const navigation=useNavigation();
    const username=useSelector(state=>state.auth.username);
    let list=[];
    async function UserPressHandler()
    {
        try{
            const firestore_data=await firestore().collection('Transactions').get().then((querysnapShot)=>{
                querysnapShot.forEach(snapshot=>{
                    let data=snapshot.data();
                    if((data.transferFrom===username&&data.transferTo===phonenumber)||
                    (data.transferFrom===phonenumber&&data.transferTo===username))
                    {
                        list.push({...data,id:Math.random()});
                    }
                })
            })
            
           const TransactionBetweenUsers=firestore_data;
           console.log('TransactionBetwen',TransactionBetweenUsers);
        }
        catch(err){
            console.log('err',err);
        }
        console.log('list',list);
        navigation.navigate('TransactionsHistoryScreen',{
            Userid:phonenumber,
            Username:name,
            Userimg:img,
            Userprice:price,
            Userphonenumber:phonenumber,
            Useremail:email,
            list:list
        })
    }
    
  return (
    <Pressable onPress={UserPressHandler}>
        <UserCard
        id={phonenumber}
        name={name}
        img={img}
        price={price}
        phonenumber={phonenumber}
        />
    </Pressable>
  )
}

export default BenUserList

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
        height:100
    },
    ImagePar:
    {
        marginLeft:0,
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
    }
})