import { StyleSheet, Text, View,Animated,TouchableOpacity } from 'react-native'
import React, { useState} from 'react'


const SecondVideo = () => {
    // const leftValue=useState(new Animated.Value(0))[0]
    // function moveBall()
    // {
    //   Animated.timing(leftValue,{
    //     toValue:500,
    //     duration:4000,
    //     useNativeDriver:true
    //   }).start();
    //   setTimeout(()=>{
    //     for(let i=0;i<100000;i++)
    //     {

    //     }
    //   },1000)
    // }


    const opacity=useState(new Animated.Value(0))[0];
        function fadeinBall()
        {
            Animated.timing(opacity,{
                toValue:1,
                duration:1000,
                useNativeDriver:true
            }).start()
        }
        function fadeOutBall()
        {
            Animated.timing(opacity,{
                toValue:0,
                duration:1000,
                useNativeDriver:true
            }).start()
        }
  return (
    <View style={{}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Animated.View
            style={[{
                width:100,
                height:100,
                // transform:[{translateX:leftValue}],
                opacity,
                borderRadius:100/2,
                backgroundColor:'red'
            }]}
            />
            {/* <TouchableOpacity onPress={moveBall}>
                <Text>Move me!</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={fadeinBall}>
                <Text>Fade In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fadeOutBall}>
                <Text>Fade out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default SecondVideo

const styles = StyleSheet.create({})