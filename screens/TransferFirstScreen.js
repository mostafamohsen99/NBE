import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import FirstSection from '../components/MobileNumber/FirstSection'
import Input from '../components/UI/Input'
import Button from '../components/UI/Button'
import { TransferActions } from '../store/Transfer-slice'
import { useDispatch } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'
import CustomText from '../components/UI/CustomText'
import { BenefecierActions } from '../store/Benefecier-slice'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';

const TransferFirstScreen = () => {
    const items=useSelector(state=>state.Benefecier.items);
    const dispatch=useDispatch();
    const [t,i18n]=useTranslation();
    const navigation=useNavigation();
    const[typeofTransfer,setTypeofTransfer]=useState();
    const[transferForm,setTransferForm]=useState();
    const[transferTo,setTransferTo]=useState();
    const[amount,setAmount]=useState();
    const[reason,setReason]=useState();
    function typeofTransferHandler(text)
    {
        setTypeofTransfer(text);
    }
    function transferFromHandler(text)
    {
        setTransferForm(text);
    }
    function transferToHandler(text)
    {
        setTransferTo(text);
    }
    function AmountHandler(text)
    {
        setAmount(text);
    }
    function ReasonofTransfer(text)
    {
        setReason(text);
    }
    function transferHandler()
    {
        const id=Math.random().toString();
        const d=new Date();
        // dispatch(TransferActions.addTransfer({
        //     id:id,
        //     typeofTransfer:typeofTransfer,
        //     transferFrom:transferForm,
        //     transferTo:transferTo,
        //     amount:amount,
        //     reason:reason,
        //     date:d.toISOString().slice(0,10)
        // }))
        navigation.navigate('SecondMobNumber',
        {
            id:id,
            typeofTransfer:typeofTransfer,
            transferFrom:transferForm,
            transferTo:transferTo,
            amount:amount,
            reason:reason,
            date:d.toISOString().slice(0,10),
            position:'TransferScreen'
        }
        )
    }
  return (
    <View>
        <KeyboardAwareScrollView>
        <FirstSection/>
      <View style={styles.TransferView}>
        <CustomText style={styles.TransferText}>{t('Transfer')}</CustomText>
      </View>
      <View>
        <Input
        Textname="Type of Transfer"
        TextHandler={typeofTransferHandler}
        src={null}
        bgBeforeFocus={styles.BgBeforeFocus}
        bgAfterFocus={styles.BgAfterFocus}
        TextColorBeforeFocus={styles.TextColorBeforeFocus}
        TextColorAfterFocus={styles.TextColorAfterFocus}
        Textstate={typeofTransfer}
        />
      </View>
      <View>
        <Input
        Textname="Transfer from"
        TextHandler={transferFromHandler}
        src={null}
        bgBeforeFocus={styles.BgBeforeFocus}
        bgAfterFocus={styles.BgAfterFocus}
        TextColorBeforeFocus={styles.TextColorBeforeFocus}
        TextColorAfterFocus={styles.TextColorAfterFocus}
        Textstate={transferForm}
        />
      </View>
      <View>
        <Input
        Textname="Transfer to"
        TextHandler={transferToHandler}
        src={null}
        bgBeforeFocus={styles.BgBeforeFocus}
        bgAfterFocus={styles.BgAfterFocus}
        TextColorBeforeFocus={styles.TextColorBeforeFocus}
        TextColorAfterFocus={styles.TextColorAfterFocus}
        Textstate={transferTo}
        />
      </View>
      <View>
        <Input
        Textname="Amount of Transfer"
        TextHandler={AmountHandler}
        src={null}
        bgBeforeFocus={styles.BgBeforeFocus}
        bgAfterFocus={styles.BgAfterFocus}
        TextColorBeforeFocus={styles.TextColorBeforeFocus}
        TextColorAfterFocus={styles.TextColorAfterFocus}
        Textstate={amount}
        />
      </View>
      <View>
        <Input
        Textname={null}
        TextHandler={ReasonofTransfer}
        src={null}
        bgBeforeFocus={styles.BgBeforeFocus}
        bgAfterFocus={styles.BgAfterFocus}
        TextColorBeforeFocus={styles.TextColorBeforeFocus}
        TextColorAfterFocus={styles.TextColorAfterFocus}
        Textstate={reason}
        placeholder="Reason of Transfer"
        />
      </View>
      <View>
      <Button style={[styles.loginButton,styles.loginButtonText]}
            onPress={transferHandler}
            >
                Transfer
            </Button>
      </View>
        </KeyboardAwareScrollView>
    </View>
  )
}

export default TransferFirstScreen

const styles = StyleSheet.create({
    TransferView:
    {
        marginLeft:20,
    },
    TransferText:
    {
        fontSize:18,
        fontFamily:'Roboto-Bold',
        color:'#1C2437'
    },
    BgBeforeFocus:
    {
        backgroundColor:'white',
    },
    BgAfterFocus:
    {
        backgroundColor:'white',
        borderColor:'green',
        borderWidth:1.5
    },
    TextColorBeforeFocus:
    {
        color:'black'
    },
    TextColorAfterFocus:
    {
        color:'green'
    },
    loginButton:
    {
        backgroundColor:'#007236',
        color:'green',
        borderRadius:12.5,
        width:'90%',
        marginLeft:20
    },
    loginButtonText:
    {
        color:'white',
        fontFamily:'Roboto-Bold',
        fontSize:15,
        fontStyle:'normal',
        textAlign:'center',
        paddingVertical:15
    },
    TextInputView:
    {
        backgroundColor:'white',

    }
})