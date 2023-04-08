import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'


const Header = (props) => {
  return (
    <View style={styles.container}>
        <View style={styles.allheader}>
        <View style={styles.ImageView}>
        <Image source={props.image}/>
        </View>
        <View style={styles.headerWord}>
        <Text style={styles.welcome}>{props.welcome}</Text>
      <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.NotificationsView}>
            <Image source={require('../../assets/images/Notification.png')}/>
        </View>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
   container:{
    position:'absolute',
    marginRight:100,
   },
   allheader:
   {
    flexDirection:'row',
   },
   headerWord:
   {
    marginLeft:10
   },
   name:
   {
    fontWeight:'bold',
    color:'black'
   },
   NotificationsView:
   {
    marginLeft:120
   }
})