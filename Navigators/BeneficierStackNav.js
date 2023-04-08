import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BeneficiariesFirstScreen from '../screens/BeneficiariesFirstScreen';
import TransactionsHistoryScreen from '../screens/TransactionsHistoryScreen';
import AddBeneficiarScreen from '../screens/AddBeneficiarScreen';
import SecondMobnumber from '../screens/SecondMobnumber';


const Stack=createStackNavigator();

const BeneficierStackNav = ({navigation}) => {
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
          navigation.navigate('BeneficiariesFirstScreen')
        });
      },[]);
  return (
    <Stack.Navigator
    initialRouteName='BeneficiariesFirstScreen'
    screenOptions={{ headerShown:'false' }}
    >
        <Stack.Screen
        name='BeneficiariesFirstScreen'
        options={{headerShown:false}}
        component={BeneficiariesFirstScreen}
        />
        <Stack.Screen
        name='TransactionsHistoryScreen'
        options={{headerShown:false}}
        component={TransactionsHistoryScreen}
        />
        <Stack.Screen
        name='AddBeneficiarScreen'
        options={{headerShown:false}}
        component={AddBeneficiarScreen}
        />
        {/* <Stack.Screen
        name='AddBenOtp'
        options={{headerShown:false}}
        component={SecondMobnumber}
        /> */}
    </Stack.Navigator>
  )
}

export default BeneficierStackNav

const styles = StyleSheet.create({})