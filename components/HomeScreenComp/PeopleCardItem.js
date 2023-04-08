import { StyleSheet, Text, View,ScrollView,Image } from 'react-native'
import React from 'react'
import CustomText from '../UI/CustomText'

const PeopleCardItem = ({name,img,index}) => {
  return (
    <ScrollView>
     <View style={styles.container}>
        <View style={styles.viewImage}>
            <Image source={img}/>
        </View>
        <View style={styles.viewName}>
            <CustomText>{name}</CustomText>
        </View>
     </View>
    </ScrollView>
  )
}

export default PeopleCardItem

const styles = StyleSheet.create({
  container:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginTop:10,
    width:80,
    marginLeft:13,
  },
  viewImage:
  {
    justifyContent:'center',
    alignItems:'center',
    height:'50%',
  },
  viewName:
  {
    justifyContent:'center',
    alignItems:'center',
    borderColor:'red',
    borderRadius:2,
  }
})