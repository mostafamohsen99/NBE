import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import CustomText from '../UI/CustomText';
import { useTranslation } from 'react-i18next';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 45,
    height: 65,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius:10,
    paddingVertical:10
  },
  focusCell: {
    borderColor: '#007236',
  },
});

const CELL_COUNT = 5;

const OTP = () => {
  const[t,i18n]=useTranslation();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CustomText style={styles.title}>Verification</CustomText>
      <CodeField
        ref={ref}

        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={[styles.codeFieldRoot,i18n.language==='ar'?{flexDirection:'row-reverse'}:{flexDirection:'row'}]}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : '-')}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};
export default OTP;
