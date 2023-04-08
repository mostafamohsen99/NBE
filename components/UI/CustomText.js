import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CustomText = ({style,children,...rest}) => {
    const[t,i18n]=useTranslation();
  return (
    <View >
      <Text style={[style,i18n.language==='en'?{fontFamily:'Roboto-Bold'}:{fontFamily:'TheMixArab-Regular'}]}
      {...rest}
      >
        {children}
      </Text>
    </View>
  )
}

export default CustomText

const styles = StyleSheet.create({})