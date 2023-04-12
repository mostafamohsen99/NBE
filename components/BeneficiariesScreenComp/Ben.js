import { StyleSheet, View ,FlatList} from 'react-native'
import React from 'react'
import BenUserCard from './BenUserCard'
import BenUserList from './BenUserList'
import { useSelector } from 'react-redux'
import {useQueryClient } from 'react-query'


const Ben = ({gridPressed,listPressed}) => {
    const queryClient=useQueryClient();
    const beneficier_data=queryClient.getQueryData('Benefeciaries')
    const items=useSelector(state=>state.Benefecier.items);
  return (
    <View>
        {gridPressed&&
        <View style={{height:'95%'}}>
            <FlatList
        data={beneficier_data}
        numColumns={4}
        renderItem={({item,index})=>{
            return(
                    <BenUserCard
                    name={item.firstname}
                    img={item.img}
                    index={index}
                />
            )
        }}
        keyExtractor={(item)=>item.img}
        />
        </View>
        }
        {listPressed&&
            <View style={{height:'95%'}}>
                 <FlatList
            data={beneficier_data}
            renderItem={({item})=>{
                return(
                    <BenUserList
                        id={item.phonenumber}
                        name={item.firstname}
                        img={item.img}
                        price={item.price}
                        phonenumber={item.phonenumber}
                        email={item.email}
                    />
                )
            }}
            keyExtractor={(item)=>item.phonenumber}
            />
            </View>
        }
     
    </View>
  )
}

export default Ben

const styles = StyleSheet.create({})