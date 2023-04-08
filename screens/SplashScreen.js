import { View, Text,Image,StyleSheet} from 'react-native'
import {useEffect,useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {

 // const navigation=useNavigation();// to navigate to login page
  const[isLoading,setisLoading]=useState(true);


  return (
    <View style={styles.container}>
      <Image
      style={styles.firstImage}
      source={require('../assets/images/Logo.png')}
      />
      {isLoading&&<LoadingOverlay/>}
      <Image
      style={styles.secondImage}
      source={require('../assets/images/bank-ahly.png')}
      />
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    },
    firstImage:{
        marginTop:'70%'
    },
    secondImage:{
        marginTop:'50%'
    }
})