import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import UserCard from '../UI/UserCard';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';




const BenUserList = ({id,name,img,price,phonenumber,email}) => {
    //console.log('phoneNumberInside',phonenumber);
    const navigation=useNavigation();
    const username=useSelector(state=>state.auth.username);
    //const{isLoading,error,isError,isFetching,data:TransBetweenUsers}=useQuery(['TransBetweenUsers'],()=>fetchDataBetweenBen('Transactions',username,phonenumber))
    let list;
    async function UserPressHandler()
    {
        try{
            list=[];
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
            // const firestore_dat=await firestore().collection('Transactions').get();
            // let firestore_dat_t=firestore_dat.docs.map(doc=> {
            //     let data=doc.data();
            //     if((data.transferFrom===username&&data.transferTo===phonenumber)||
            //     (data.transferFrom===phonenumber&&data.transferTo===username))
            //     {
            //       list_2.push({...data,id:Math.random()});
            //     }
            //     console.log('list_2',list_2);
            //     return list_2;
            // });
            // let firestore_dat_m=firestore_dat_t[0];
            // console.log('firestore_dat_t',firestore_dat_m);
        }
        catch(err){
            console.log('err',err);
        }
        navigation.navigate('TransactionsHistoryScreen',{
            Currentuser:username,
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