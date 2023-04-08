import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AccountSummary from '../DrawerNav/AccountSummary';
import Calculators from '../DrawerNav/Calculators'
import Cards from '../DrawerNav/Cards';
import CustomerServices from '../DrawerNav/CustomerServices';
import DarkMode from '../DrawerNav/DarkMode';
import HardToken from '../DrawerNav/HardToken';
import Logout from '../DrawerNav/Logout';
import Offers from '../DrawerNav/Offers';
import OpenCertificate from '../DrawerNav/OpenCertificate';
import Payment from '../DrawerNav/Payment';
import Header from './CustomNavs/Header';
import AccountIcon from '.././assets/images/DrawerIcons/AccountSummary.png'
import OpenCertificatesIcon from '.././assets/images/DrawerIcons/OpenCertificates.png'
import PaymentIcon from '.././assets/images/DrawerIcons/Payment.png'
import CardsIcon from '.././assets/images/DrawerIcons/Cards.png'
import HardTokenIcon from '.././assets/images/DrawerIcons/HardToken.png'
import offersIcon from '.././assets/images/DrawerIcons/offers.png'
import CustomerServicesIcon from '.././assets/images/DrawerIcons/customerServices.png'
import CalculatorsIcon from '.././assets/images/DrawerIcons/calculators.png'
import DarkModeIcon from '.././assets/images/DrawerIcons/DarkMode.png'
import LogoutIcon from '.././assets/images/DrawerIcons/Logout.png'
import CustomDrawer from './CustomDrawer';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import BottomTabNav from './BottomTabNav';


const Drawer=createDrawerNavigator();
const FirstDrawerNav = ({route}) => {
const username=useSelector(state=>state.auth.username);
//const username='mostafa'
  const {t,i18n}=useTranslation();
  return (
    <Drawer.Navigator
    initialRouteName=''
    drawerContent={props=><CustomDrawer {...props} />}
    screenOptions={{
      headerTintColor:'#000000',
      sceneContainerStyle:{
        backgroundColor:'#ffffff'
        },
        headerTitle:()=><Header image={require('.././assets/images/Mashaly.png')} welcome={t('Good morning')} name={username}/>,
        headerTitleStyle:{
        fontSize:20,
        },
        headerStyle:{
          height:70
        },
        drawerStyle:
        {
          backgroundColor:'#F1F3FB',
          borderTopRightRadius:40,
          borderBottomRightRadius:40
        },
        drawerItemStyle:{
          borderRadius:10
        },
        drawerInactiveTintColor:'black',
        drawerActiveTintColor:'white',
        drawerActiveBackgroundColor:'#007236'
    }}
    >
        <Drawer.Screen
        name={'AccountSummary'}
        component={BottomTabNav}
        options={{
          drawerIcon:()=><Image source={AccountIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Account Summary')
        }}
        />
        <Drawer.Screen
        name={'Open Certificates & Deposits'}
        component={OpenCertificate}
        options={{
          drawerIcon:()=>
          <Image source={OpenCertificatesIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Open Certificates & Deposits')
        }}
        />
           <Drawer.Screen
        name={'Payement Services'}
        component={OpenCertificate}
        options={{
          drawerIcon:()=>
          <Image source={PaymentIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Payement Services')
        }}
        />
        <Drawer.Screen
        name={'Cards Services'}
        component={Cards}
        options={{
          drawerIcon:()=>
          <Image source={CardsIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Cards Services')
        }}
        />
        <Drawer.Screen
        name={'Hard Token'}
        component={HardToken}
        options={{
          drawerIcon:()=>
          <Image source={HardTokenIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Hard Token')
        }}
        />
        <Drawer.Screen
        name={'Offers'}
        component={Offers}
        options={{
          drawerIcon:()=>
          <Image source={offersIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Offers')
        }}
        />
        <Drawer.Screen
        name={'Customer Services'}
        component={CustomerServices}
        options={{
          drawerIcon:()=>
          <Image source={CustomerServicesIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Customer Services')
        }}
        />
        <Drawer.Screen
        name={'Calculators'}
        component={Calculators}
        options={{
          drawerIcon:()=>
          <Image source={CalculatorsIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Calculators')
        }}
        />
        <Drawer.Screen
        name={'Dark Mode'}
        component={DarkMode}
        options={{
          drawerIcon:()=>
          <Image source={DarkModeIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Dark Mode')
        }}
        />
        <Drawer.Screen
        name={'Logout'}
        component={Logout}
        options={{
          drawerIcon:()=>
          <Image source={LogoutIcon} style={{width:30,height:30}}/>,
          drawerLabel:t('Logout')
        }}
        />
    </Drawer.Navigator>
  )
}

export default FirstDrawerNav

const styles = StyleSheet.create({})