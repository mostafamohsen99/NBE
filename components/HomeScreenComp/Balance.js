import { StyleSheet, Text, View,ImageBackground,Image,Pressable,FlatList,ScrollView} from 'react-native'
import React from 'react'
import { CardItems,peopleCardItems } from '../../dummy_data/dummyData'
import CardItem from './CardItem'
import PeopleCardItem from './PeopleCardItem'
import { useTranslation } from 'react-i18next'
import CustomText from '../UI/CustomText'


const Balance = ({showBalanceHandler,balanceVal,setCardsVisible,price}) => {
    const[t,i18n]=useTranslation();
  return (
    <View>
    <Pressable
    onPress={showBalanceHandler}
    >
    <ImageBackground
      source={require('../../assets/images/CardImages/GreenComp.png')}
      style={styles.img}
      >
        <View style={styles.imgRow}>
            <View style={styles.Balance}>
            <CustomText style={styles.BalanceText}>{t('Balance')}</CustomText>
            </View>
            <View style={styles.imgFingerPrint}>
                <Image source={require('../../assets/images/CardImages/register.png')}/>
            </View>
        </View>
        <View style={styles.showBalance}>
                <CustomText style={styles.showBalanceText}>{balanceVal?price+'$':t('Press here to Show Balance')}</CustomText>
        </View>
    </ImageBackground>
    </Pressable>
    <View>
      <FlatList
        data={CardItems}
        horizontal={true}
        renderItem={({item})=>{
            return <CardItem
            name={item.name}
            image={item.Image}
            backgroundColor={item.backgroundColor}
            setCardsVisible={setCardsVisible}
            />
        }}
        keyExtractor={(item)=>item.name}
          />
    </View>
    <View>
        <View style={styles.headerView}>
            <View>
            <CustomText style={styles.sendMoney}>{t('Send Money')}</CustomText>
            </View>
            <View style={styles.viewAllView}>
            <CustomText style={styles.viewAll}>{t('View All')}</CustomText>
            </View>
        </View>
        <View style={{height:110}}>
        <ScrollView>
        <FlatList
        data={peopleCardItems}
        horizontal={true}
        renderItem={({item,index})=>{
            return(
                <PeopleCardItem
                name={item.name}
                img={item.img}
                index={index}
                />
            )
        }}
        keyExtractor={(item)=>item.name}
        />
        </ScrollView>
        </View>
    </View>
    </View>
  )
}

export default Balance

const styles = StyleSheet.create({
    balanceView:
    {
        borderWidth:2,
        borderColor:'red'
    },
    img:{
        width:'95%',
        height:130,
        marginLeft:20,
        marginTop:15
    },
    imgRow:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    Balance:{
        marginTop:10,
        marginRight:200
    },
    imgFingerPrint:
    {
        marginTop:8,
        marginRight:10
    },
    BalanceText:{
        color:'white',
        fontFamily:'Roboto-Medium',
        fontSize:15
    },
    showBalance:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    showBalanceText:{
        fontSize:20,
        color:'white',
        marginRight:20,
        fontWeight:'bold'
    },
    headerView:
    {
        flexDirection:'row',
        marginLeft:20
    },
    viewAllView:
    {
        marginLeft:200,
        marginTop:5
    },
    sendMoney:
    {
        color:'#1C2437',
        fontSize:20,
        fontFamily:'Roboto-Medium'
    },
    viewAll:
    {
        fontSize:14,
        fontFamily:'Roboto-bold'
    }
})