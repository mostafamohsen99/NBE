import { Pressable,View,Text,StyleSheet,Image } from "react-native";
import CustomText from "./CustomText";

function Button({children,style,onPress,img})
{
    return<View style={style[0]}>
        <Pressable
        style={({pressed})=>pressed&&StyleSheet.pressed}
        onPress={onPress}
        >
            <View>
                <CustomText style={style[1]}>{children}</CustomText>
            </View>
            <View style={{position:'absolute',left:310,top:14}}>
            {img!=null&&
            <Image source={img}/>
            }
            </View>
        </Pressable>
    </View>
}
export default Button;
const styles=StyleSheet.create({
    button:{
        
    },
    pressed:{
        opacity:0.5,
        borderRadius:4
    }
})
