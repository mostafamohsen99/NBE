import { View, Text,StyleSheet,Image,TextInput,Pressable} from 'react-native'
import React, { useEffect, useState } from 'react';
import i18n from '../../i18n/i18n';
import {useTranslation} from 'react-i18next';
import { useSelector } from 'react-redux';
import CustomText from './CustomText';

export default function Input({Textname,
    TextPasswordHandler,
    showPassword,
    TextHandler,
    src,
    bgBeforeFocus,
    bgAfterFocus,
    TextColorBeforeFocus,
    TextColorAfterFocus,
    placeholder,
    maxLength,
    Textstate
}) {
    const[focus,setFocus]=useState(false);
    const langSelector=useSelector(state=>state.lang.lang);
    const {t, i18n} = useTranslation();
    useEffect(()=>{
        i18n.changeLanguage(langSelector);
    },[])
  return (
    <View style={styles.container}>
       <View style={focus?[styles.TextnameFocus,bgAfterFocus]:[styles.Textnamee,bgBeforeFocus]}>
                  {src&& <View style={styles.TextImage}>
                        <Image
                        source={src}
                        />
                   </View>}
                   <View>
                        <View style={styles.TextView}>
                            <CustomText style={[focus?[styles.textTextFocus,TextColorAfterFocus]:[styles.textText,TextColorBeforeFocus],
                            src?{marginLeft:0}:{marginLeft:10}
                            ]}>{Textname}</CustomText>
                        </View>
                        <TextInput
                            secureTextEntry={Textname===t('password')||Textname===t('confirm password')?showPassword?false:true:false}
                            style={[focus?styles.TextInputee:styles.TextInpute,i18n.language==='en'?{textAlign:'left'}:{textAlign:'right'}]}
                           onFocus={()=>setFocus(true)}
                          onBlur={()=>setFocus(false)}
                            onChangeText={TextHandler}
                            placeholder={placeholder}
                            keyboardType={Textname==='mobileNumber'?'decimal-pad':'default'}
                            maxLength={Textname==='mobileNumber'?11:maxLength}
                            value={Textstate}
                        />
                    </View>
                   {(Textname===t('password')||Textname===t('confirm password'))&& 
                   <View style={styles.passwordeye}>
                        <Pressable
                        onPress={TextPasswordHandler}
                        >
                                <Image source={require('../../assets/images/signs/eye.png')}/>
                        </Pressable>
                   </View>
                   }
        </View>
    </View>
  )
}
const styles=StyleSheet.create({
    container:
    {
        marginBottom:15
    },
    Textnamee:{
        flexDirection:'row',
        borderWidth:1.5,
        borderRadius:10,
        borderColor:'rgba(255,255,255,0.3)',
        width:'88%',
        marginLeft:23
    },
    TextnameFocus:{
        flexDirection:'row',
        borderWidth:1.5,
        borderRadius:10,
        borderColor:'green',
        width:'88%',
        marginLeft:23
    },
    TextImage:
    {
        paddingHorizontal:22,
        paddingTop:22
    },
    TextView:{
        paddingTop:10
    },
    textText:
    {
        fontSize:14,
        fontWeight:'bold'
    },
    textTextFocus:
    {
        fontSize:14,
        fontWeight:'bold'
    },
    TextInpute:{
        color:'black',
        height:37,
        fontSize:14,
        borderWidth:0
    },
    TextInputee:{
        color:'green',
        height:37,
        fontSize:14,
        borderWidth:0,
    },
    passwordeye:
    {
        position:'absolute',
        marginLeft:300,
        marginTop:25
    },
})
