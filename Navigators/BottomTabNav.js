import { StyleSheet,Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import HomeIcon from '.././assets/images/TabBarIcons/Home.png'
import TransferIcon from '.././assets/images/TabBarIcons/Transfer.png'
import BeneficiariesIcon from '.././assets/images/TabBarIcons/airpay_1.png'
import ATMSicon from '.././assets/images/TabBarIcons/ATMS.png'
import AirPayIcon from '.././assets/images/TabBarIcons/AirPay.png'
import { useTranslation } from 'react-i18next'
import HomeScreen from '../screens/HomeScreen'
import ATMS from '../screens/ATMS'
import AirPayScreen from '../screens/AirPayScreen'
import TransferStackNav from './TransferStackNav'
import BeneficierStackNav from './BeneficierStackNav'
import AtmsStackNav from './AtmsStackNav'
import AirPayStackNav from './AirPayStackNav'
import HomeStackNav from './HomeStackNav'


const BottomTabs=createBottomTabNavigator();
const BottomTabNav = () => {
  const[t,i18n]=useTranslation();
  return (
    <BottomTabs.Navigator
    screenOptions={{
      tabBarActiveTintColor:'white',
      tabBarActiveBackgroundColor:'#007236',
      tabBarInactiveBackgroundColor:'#F1F3FB',
      tabBarStyle:{
        height:70
      },
      tabBarItemStyle:{
        borderRadius:10,
        margin:5
      }
    }}
    >
        <BottomTabs.Screen
        options={{
          headerShown:false,
          tabBarIcon:({focused})=>(
            <Image source={HomeIcon}
            style={{width:34,height:30}}
            />
          ),
          tabBarLabel:t('Home')
          
        }}
        name={'Home'}
        component={HomeStackNav}
        />
        <BottomTabs.Screen
        options={{
          headerShown:false,
          tabBarIcon:({focused})=>(
            <Image source={TransferIcon} style={{width:30,height:30}}/>
          ),
          tabBarLabel:t('Transfer')
        }}
        name={'Transfer'}
        component={TransferStackNav}
        />
        <BottomTabs.Screen
        options={{
          headerShown:false,
          tabBarIcon:({focused})=>(
            <Image source={BeneficiariesIcon} style={{width:38,height:30}}/>
          ),
          tabBarLabel:t('Beneficiaries')
        }}
        name={'Beneficiaries'}
        component={BeneficierStackNav}
        />
        <BottomTabs.Screen
        options={{
          headerShown:false,
          tabBarIcon:({focused})=>(
            <Image source={ATMSicon} style={{width:23,height:30}}/>
          ),
          tabBarLabel:t('ATMS')
        }}
        name={'ATMS'}
        component={AtmsStackNav}
        />
        <BottomTabs.Screen
        options={{
          headerShown:false,
          tabBarIcon:({focused})=>(
            <Image source={AirPayIcon} style={{width:35.12,height:33.19}}/>
          ),
          tabBarLabel:t('AirPay')
        }}
        name={'AirPay'}
        component={AirPayStackNav}
        />
    </BottomTabs.Navigator>
   )
}

export default BottomTabNav

const styles = StyleSheet.create({})