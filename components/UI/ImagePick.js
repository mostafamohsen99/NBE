import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'

const ImagePick = ({imageUri,openGallery}) => {
  return (
    <View>
       <View style={styles.FileImage}>
          <Pressable onPress={()=>{
            openGallery()
          }}>
            {imageUri?
             <Image
             style={{width:120,height:120}}
              source={imageUri}/>
              :
              <Image
              source={require('../../assets/images/Form/Image.png')}/>  
            }
            
          </Pressable>
        </View>
    </View>
  )
}

export default ImagePick

const styles = StyleSheet.create({
    FileImage:
    {
      justifyContent:'center',
      alignItems:'center',
    }
})