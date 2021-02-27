import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, RefreshControl  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import BillTable from '../../Components/BillTable';

import NotificationModal from '../../Components/NotificationModal';

import colors  from "../../config/colors";

LogBox.ignoreLogs(['Warning: ...']);


const BILL_BUTTON_DATA = [
  {
    id: '1',
    card_heading: 'NEW BILL',
    img: require('./res/newBill.png'),
    nav: 'NewBill',
  },
  {
    id: '2',
    card_heading: 'ALL BILLS',
    img: require('./res/allBills.jpg'),
    nav: 'AllBills',
  },

];

const BILL_DATA = [
  {
    id: '1',
    tableData: [['23'],['Ultrasound'],['06-05-2020'],['Apollo Hospital'],['Rs.1000'],[<View style={{flexDirection:"row"}}><Icon name="time" size={23} color="#c9c930" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"#c9c930"}}>WAITING </Text></View>]]
  },
  {
    id: '2',
    tableData: [['52'],['Brain scanning'],['12-10-2020'],['Apollo Hospital'],['Rs.4000'],[<View style={{flexDirection:"row"}}><Icon name="checkmark-circle" size={23} color="green" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"green"}}>ACCEPTED </Text></View>]]
  },
  {
    id: '3',
    tableData: [['91'],['Skin test'],['06-01-2021'],['Apollo Hospital'],['Rs.8000'],[<View style={{flexDirection:"row"}}><Icon1 name="cancel" size={23} color="red" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"red"}}>REJECTED </Text></View>]]
  },
];


class HomeScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
        tableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE','STATUS'],

        notification: true,
        notificationModalVisible: false,
    }

  render() {

    const billButtonItem = ({ item }) => (
      <CardView
      style={styles.card}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={5}>
        <TouchableOpacity activeOpacity={.9} onPress={() => this.props.navigation.navigate(item.nav)}>
          <Image style={styles.cardImage} source={item.img} />
          <Text style={styles.cardHeading}>
            {item.card_heading}
          </Text>
        </TouchableOpacity>
      </CardView>
    );

    const currentBillsItem = ({ item }) => (
      <CardView
      style={styles.currentStatusCard}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={2}>
          <BillTable
            tableTitle = {this.state.tableTitle}
            tableData = {item.tableData}
          />
      </CardView>
    );
    
    const notificationClick = () =>{
      this.setState({
        notificationModalVisible:true,
        notification:false
      })
    }
    const closeModal = () =>{
      this.setState({
        notification : false,
        notificationModalVisible: false
      })
    }

    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor="black" />
        <View style={{flex:1}}>
          <View style={styles.topLayout}>
            <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18,paddingRight:10}}/>
            </TouchableOpacity>
            <Text style={styles.pageTitle}> HOME </Text>
            <TouchableOpacity activeOpacity={.8} onPress={() => notificationClick()}>
              <Icon name="notifications" size={24} color={colors.topBarIconColor} style={{marginRight:18,paddingLeft:10}}/>
              {
                this.state.notification ? (
                  <Icon2 name="primitive-dot" size={20} color="red" style={{paddingLeft:12.5,paddingBottom:20,position:"absolute"}}/>
                ) : (null)
              }
            </TouchableOpacity>
          </View>

          <View style={styles.middleLayout1}>
            <FlatList
            data={BILL_BUTTON_DATA}
            renderItem={billButtonItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
          />
          </View>

        <CardView
          style={styles.middleLayout2}
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={0}>
            <View>
              <ScrollView style={{padding:10}}>
                  <Text style={{fontSize:14,color:"black",fontWeight:"bold",textAlign:"center"}}>RECENT BILLS</Text>
              </ScrollView>
            </View>
          </CardView>

            <FlatList
              contentContainerStyle={styles.bottomLayout}
              data={BILL_DATA}
              renderItem={currentBillsItem}
              keyExtractor={item => item.id}
            />

            <NotificationModal
              isModalVisible = {this.state.notificationModalVisible}
              closeModal = {closeModal}
              modalTitle = "Fingerprint not enrolled"
              modelDesc = "Try setting fingerprint authentication on your device"
              opacity = {0.6}
            />

        </View>

        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    topLayout: {
      flex:0,
      flexDirection:"row",
      height: "9%",
      width:"100%",
      backgroundColor: colors.primary,
      alignItems:"center",
      justifyContent:"space-between",
    },
    middleLayout1:{
        flex:0,
        marginTop:6,
    },
    middleLayout2: {
      flex:0,
      marginTop:10,
      backgroundColor: colors.secondary,
    },
    bottomLayout:{
      paddingBottom:50,
    },
    flatListStyle: {
        paddingTop:10,
    },
    card: {
      width:"45%",
      margin:"2.5%",
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
    },
    currentStatusCard: {
      width:"96%",
      margin:"2%",
      marginTop:17,
      marginBottom:10,
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
    },
    cardSelected: {
      width:"46%",
      margin:"2%",
      elevation:5,
      backgroundColor: colors.selectedButtonColor,
      borderRadius:5,
    },
    cardHeading: {
      fontSize:13,
      padding:10,
      fontStyle:"italic",
      alignSelf:"center",
      color : colors.black,
    },
    currentStatusCardHeading: {
      fontSize:15,
      padding:10,
      paddingLeft:15,
      fontWeight:"bold",
      color : colors.black,
    },
    cardHeadingSelected: {
        fontSize:14,
        padding:10,
        fontWeight:"bold",
        fontStyle:"italic",
        alignSelf:"center",
        color : colors.selectedTextColor,
    },
    cardImage: {
      width:"100%",
      height:160,
      marginBottom:2,
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
  });
export default HomeScreen;
