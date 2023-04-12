import React, {useRef,useState} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text,FlatList} from 'react-native';


const PanResponders= () => {
  const pan = useState(new Animated.ValueXY())[0];
  

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant:()=>{
        console.log(pan.getLayout());
        pan.setOffset({
          x:pan.x._value,
          y:pan.y._value
        })
      },
      // onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],{useNativeDriver: false}),
      onPanResponderMove:(_,gesture)=>{
        pan.x.setValue(gesture.dx),
        pan.y.setValue(gesture.dy)
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  return (

    <View style={{flexDirection:'row'}}>

        <View style={{justifyContent:'center',alignItems:'flex-start',marginHorizontal:20,marginTop:20}}>
            <Animated.View
            style={[{
                width:100,
                height:100,
                // top:pan.y,
                // left:pan.x,
               transform:pan.getTranslateTransform(),
                borderRadius:100/2,
                backgroundColor:'red'
            },
            pan.getLayout()
          ]}
            {...panResponder.panHandlers}
            
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default PanResponders;