import { StyleSheet, Text, View,Linking,Platform} from 'react-native'
import React, { useEffect,useState } from 'react'
import { NavigationContainer, useNavigation, useNavigationState,mergeState} from '@react-navigation/native'
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MobileNumber from '../screens/MobileNumber';
import SecondMobnumber from '../screens/SecondMobnumber';
import PasswordScreen from '../screens/PasswordScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FirstDrawerNav from './FirstDrawerNav';
import { NavStateActions } from '../store/NavState-slice';
import { useDispatch,useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack=createNativeStackNavigator();

const PERSISTENCE_KEY='{"index": 1, "key": "stack-eKBuZ5j-MkRlkTkUK3_Q6", "routeNames": ["SplashScreen", "RegisterScreen", "MobileNumber", "SecondMobNumber", "passwordScreen", "WelcomeScreen", "FirstDrawerNav"], "routes": [{"key": "SplashScreen-Dwf3BwpSBXK4UOhfQgUEm", "name": "SplashScreen", "params": undefined}, {"key": "RegisterScreen-8m1lH5yk1x2ain73q5nC5", "name": "RegisterScreen", "params": undefined}], "stale": false, "type": "stack"}'

function Root()
{
  const lastTime=useSelector(state=>state.navState.timeOfState);
  const [initialState,setInitialState]=useState();
  const[isReady,setIsReady]=useState(false);
  const[splash,setSplash]=useState(true);
  const changeState=async(state)=>{
    try{
      const state_t=state?JSON.stringify(state):undefined;
      await AsyncStorage.setItem(PERSISTENCE_KEY,state_t)
    }
    catch(err)
    {

    }
  }
  useEffect(()=>{
    setTimeout(
      ()=>{
        setSplash(false);
    },1000)
  },[])
  useEffect(()=>{
    const loadNavigationState=async()=>{
      try
      {
        const initialUrl=await Linking.getInitialURL();
        if(Platform.OS!=='web'&&initialUrl==null)
        {
          const savedNavigationState=await AsyncStorage.getItem(PERSISTENCE_KEY)
          const state=savedNavigationState?JSON.parse(savedNavigationState):undefined
         // console.log('state_inside_useeffect',state)
          if(state!==undefined)
          {
            setInitialState(state)
          }
        }
      }
      finally{
        console.log('inside Finally');
        setIsReady(true)
      }
    }
    if(!isReady)
    {
      console.log('inside!isReady');
      loadNavigationState();
    }
   },[isReady])
   if(!isReady)
   {
    return null;
   }
  if(splash)
  {
    return <SplashScreen/>
  }
  return(
    <NavigationContainer
    initialState={initialState}
    onStateChange={changeState}
    >  
    <Stack.Navigator
    >
        <Stack.Screen name="RegisterScreen" options={{headerShown:false}} component={RegisterScreen}/>
        <Stack.Screen name="MobileNumber"  options={{headerShown:false}} component={MobileNumber}/>
        <Stack.Screen name="SecondMobNumber"  options={{headerShown:false}} component={SecondMobnumber}/>
        <Stack.Screen name="passwordScreen" options={{headerShown:false}} component={PasswordScreen}/>
        <Stack.Screen name="WelcomeScreen"  options={{headerShown:false}} component={WelcomeScreen}/>
        <Stack.Screen name="FirstDrawerNav"   options={{headerShown:false}} component={FirstDrawerNav}/>
    </Stack.Navigator>
   
   
</NavigationContainer>
  )
}

export default Root

const styles = StyleSheet.create({})