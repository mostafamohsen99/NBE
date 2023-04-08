import React, {useRef,useEffect} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const PanResponderFirst = ({id}) => {

  const pan = useRef(new Animated.ValueXY()).current;
    let _val={x:100,y:100}
  const panResponder = useRef(
    PanResponder.create({
        onStartShouldSetPanResponder:(e,gesture)=>true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],{useNativeDriver: false}),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    //   onPanResponderRelease:(e,gesture)=>{
    //     Animated.spring(pan,{
    //         toValue:{x:0,y:0},
    //         friction:5,
    //         useNativeDriver:true
    //     }).start()
    //   }
    }),
  ).current;
  pan.addListener((value)=>_val=value)

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
      style={[{
       transform:pan.getTranslateTransform(),
    },styles.circle]}
    {...panResponder.panHandlers}
      >
        {/* <View style={styles.box} /> */}
      </Animated.View>
    </View>
  );
};


let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS
  }
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   titleText: {
//     fontSize: 14,
//     lineHeight: 24,
//     fontWeight: 'bold',
//   },
//   box: {
//     height: 150,
//     width: 150,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
// });

export default PanResponderFirst;