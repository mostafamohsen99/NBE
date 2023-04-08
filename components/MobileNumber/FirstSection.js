import { View, Image ,StyleSheet, Pressable} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


export default function FirstSection({img}) {
    const navigation=useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.ImageHeader}>
            <View style={styles.firstImage}>
                <Pressable
                onPress={()=>{navigation.goBack()}}
                >
                <Image
                source={require('../../assets/images/returnBack.png')} 
                />
                </Pressable>
            </View>
            {img&&<View style={styles.NotificationImage}>
                <Image
                source={img} 
                />
            </View>}
            <View style={styles.secondImage}>
                <Image
                source={require('../../assets/images/green_logo.png')}
                />
            </View>
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
       marginBottom:20
    },
    ImageHeader:
    {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    firstImage:
    {
        marginTop:35,
        marginLeft:17
    },
    secondImage:
    {
        marginTop:35,
        marginRight:25
    },
    NotificationImage:
    {
        marginTop:35,
        marginRight:90
    }

})

