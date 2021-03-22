import React, { Component } from "react";
import { SafeAreaView, Dimensions, View,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, RefreshControl  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import BillTable from '../../Components/BillTable';

import NotificationModal from '../../Components/NotificationModal';

import colors  from "../../config/colors";

import CREDENTIALS from '../../utils/credentials';



const BILL_BUTTON_DATA = [
  {
    id: '1',
    card_heading: 'NEW BILL',
    img: require('./res/newBill.png'),
    nav: 'NewBill',
  },
  {
    id: '2',
    card_heading: 'OLD BILLS',
    img: require('./res/oldBills.jpg'),
    nav: 'OldBills',
  },

];


class HomeScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,

        data : null,
        account : "",

        tableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE','STATUS'],
        billData: [],

        notification: true,
        notificationModalVisible: false,
    }

    componentDidMount(){
      this.getAndPrepareData();
    }

    prepareBillData = () =>{
      let data = this.state.data;
      let account = this.state.account;

      let billData = [];

      for(var i = 0; i < data.length; i++){
        if(data[i][7] === account){
          var status = data[i][8] ? ("Approved") : (data[i][9] ? ("Rejected") : ("Pending"))

          if(status === "Pending"){
            let temp = {};
            temp['id'] =  (i+1).toString();

            temp['tableData'] = [];
            temp['tableData'].push([data[i][0]])
            temp['tableData'].push([data[i][3]])
            temp['tableData'].push([data[i][4]])
            temp['tableData'].push([data[i][5]])
            temp['tableData'].push([data[i][1]])
            
            var status = data[i][8] ? ("Approved") : (data[i][9] ? ("Rejected") : ("Pending"))

            if(status === "Approved")
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon name="checkmark-circle" size={23} color="green" style={{marginLeft:12}}/><Text style={{width:"40%", marginLeft:5,fontWeight:"bold",marginTop:2,color:"green"}}>APPROVED </Text></View>])
            }
            else if(status === "Rejected")
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon1 name="cancel" size={23} color="red" style={{marginLeft:12}}/><Text style={{width:"40%", marginLeft:5,fontWeight:"bold",marginTop:2,color:"red"}}>REJECTED </Text></View>])
            }
            else if(status === "Pending")
            {
              temp['tableData'].push([<View style={{flexDirection:"row"}}><Icon name="time" size={23} color="#c9c930" style={{marginLeft:12}}/><Text style={{width:"40%", marginLeft:5,fontWeight:"bold",marginTop:2,color:"#c9c930"}}>PENDING </Text></View>])
            }

            billData.push(temp)
          }
        }
      }

      //console.log(billData)
      this.setState({
        billData : billData
      })
    }

    getAccountData = async () => {
      try {
        const account = await AsyncStorage.getItem("account")
        this.setState({
          account : JSON.parse(account)
        },
          function() {
            this.prepareBillData()
          }
        )
      } catch(e) {
        console.error("Cannot fetch data from storage " + e)
      }
    }

    getAndPrepareData = () =>{
      const config = {
        method: 'GET',
        headers: {
              'Content-Type': 'application/json'
          },
      };

      fetch(`${CREDENTIALS.BASE_URL}/api/all_data`, config)
      .then((resp) => resp.json())
      .then((res) => {
          this.setState({
            data : res
          },
            function() {
              this.getAccountData()
            }
          )
          //console.log(res)
      })
      .catch((err) => {
          console.log('err', err.message)
      })
    }

  render() {

    const billButtonItem = ({ item }) => (
      <CardView
      style={styles.card}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={5}>
        <TouchableOpacity activeOpacity={.9} onPress={() => this.props.navigation.navigate(item.nav, {data: this.state.data,account: this.state.account})}>
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
                  <Icon2 name="primitive-dot" size={20} color="red" style={{paddingLeft:22.3,paddingBottom:20,position:"absolute"}}/>
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
                  <Text style={{fontSize:14,color:"black",fontWeight:"bold",textAlign:"center"}}>PENDING BILLS</Text>
              </ScrollView>
            </View>
          </CardView>

          {
            this.state.billData == null ? (null) : (this.state.billData.length > 0 ? (
              <FlatList
                contentContainerStyle={styles.bottomLayout}
                data={this.state.billData}
                renderItem={currentBillsItem}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style = {styles.infoBox}>
                <Icon1 name="info" size={25} color="#856a00" style={{alignSelf:"center"}}/>
                <Text style = {styles.infoText}>There is no pending bills to show</Text>
              </View>
            ))
          }

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
    infoBox: {
      flex:0,
      flexDirection:"row",
      flexWrap:"wrap",
      borderWidth:1,
      borderColor: "#ffcc00",
      padding:10,
      margin:10,
      marginTop:15,
      elevation:2,
      borderRadius:5,
      backgroundColor: "#fff3c2",
    },
    infoText: {
      fontSize:15,
      marginLeft:12,
      textAlign: 'justify',
      lineHeight: 23,
      width:"85%",
      color: "#856a00",
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
  });
export default HomeScreen;
