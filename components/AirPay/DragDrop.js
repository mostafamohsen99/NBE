import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import Draggable from 'react-native-draggable'
import { CREDITCARDIMAGES } from '../../dummy_data/dummyData'

const DragDrop = ({img,card,setCard,isDragged,setIsDragged,index}) => {
  return (
    <View  style={{marginLeft:20,marginTop:20,marginBottom:10,height:420,width:320}}>
        <Draggable  key={isDragged} onDrag={()=>{setIsDragged(true)}} onRelease={()=>{setIsDragged(false),setCard(img)}}
        x={!isDragged?0:undefined} y={!isDragged?0:undefined}
        >
         <Image source={img}/>
        </Draggable>
    </View>
  )
}

export default DragDrop

const styles = StyleSheet.create({})