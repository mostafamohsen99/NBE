import React from 'react'
import { Provider } from 'react-redux'
import Root from './Navigators/Root';
import {persistor,store} from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import {useEffect} from 'react';
import { requestUserPermission,NotificationListener } from './utils/pushnotification_helper'

export default function App() {
  useEffect(()=>{
    requestUserPermission()
    NotificationListener()
  },[])
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Root/>
    </PersistGate>
    </Provider>
    </>
  )
}

// import { StyleSheet, View } from 'react-native'

// import React from 'react'
// import FirstVideo from './DummyComp/FirstVideo'
// import Animated from 'react-native-reanimated'
// import SecondVideo from './DummyComp/SecondVideo'
// import PanResponders from './DummyComp/PanResponders'
// import PanResponderFirst from './DummyComp/PanResponderFirst'
// import DropArea from './DummyComp/DropArea'

// const App = () => {
//   return (
//   <View>
//     <DropArea/>
//   </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})

// import React from 'react'
// import {View,Text} from 'react-native'
// import {useEffect} from 'react';
// import { requestUserPermission,NotificationListener } from './utils/pushnotification_helper'

// function App() {
//   useEffect(()=>{
//     requestUserPermission()
//     NotificationListener()
//   },[])
//   return (
//     <View>
//       <Text>How are you</Text>
//     </View>
//   )
// }

// export default App

