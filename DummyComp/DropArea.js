import { StyleSheet, Text, View,ScrollView,FlatList} from 'react-native'
import React from 'react'
import PanResponderFirst from './PanResponderFirst'


const PAN_RESPONDER_FIRST=[
    {
    id:'1'
    },
    {
        id:'2'
    },
    {
        id:'3'
    },
    {
        id:'4'
    },
    {
        id:'5'
    }
]

const DropArea = () => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.dropZone}>
      <Text style={styles.text}>Drop them here!</Text>
    </View>
    <View style={styles.ballContainer} />
    <FlatList
    contentContainerStyle={{flex:1}}
    horizontal={true}
    data={PAN_RESPONDER_FIRST}
    renderItem={({item})=>{
        return  <View style={styles.row}>
            <PanResponderFirst id={item.id}/>
        </View>
    }}
    keyExtractor={(item)=>item.id}
    />
  </View>
  )
}

export default DropArea

const styles = StyleSheet.create({
    mainContainer: {
    
    },
    ballContainer: {
      height:200
    },
    row: {
      flexDirection: "row",
      height:500
    },  
    dropZone: {
      height: 200,
      backgroundColor: "#00334d"
    },
    text: {
      marginTop: 25,
      marginLeft: 5,
      marginRight: 5,
      textAlign: "center",
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
    }
  });