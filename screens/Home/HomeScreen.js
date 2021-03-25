import React, { Component } from "react";
import { SafeAreaView, Dimensions, View,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, Alert, BackHandler  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Octicons';
import BillTable from '../../Components/BillTable';

import NotificationModal from '../../Components/NotificationModal';
import NotificationInfoField from '../../Components/NotificationInfoField';

import colors  from "../../config/colors";

import CREDENTIALS from '../../utils/credentials';

import Loader from "../../Components/Loader";


const BILL_BUTTON_DATA = [
  {
    id: '1',
    card_heading: 'ALL BILLS',
    img: require('./res/allBills.jpg'),
    nav: 'AllBills',
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

        loadervisible : true,

        data : [],
        account : "",

        tableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE','BILL DOCUMENT','STATUS'],
        billData: [],
        notificationData: [],
        viewedNotifications: [],

        notification: false,
        notificationModalVisible: false,

        showNotifier : false,

        error : "",
    }

    componentDidMount(){
      this.getAndPrepareData();
    }

    prepareBillData = () =>{
      let data = this.state.data.reverse();
      let account = this.state.account;

      let billData = [];

      for(var i = 0; i < data.length; i++){
        if(data[i][7] === account){

          if(data[i][8] == 0){
            let temp = {};
            temp['id'] =  (i+1).toString();

            temp['tableData'] = [];
            temp['tableData'].push([data[i][0]])
            temp['tableData'].push([data[i][3]])
            temp['tableData'].push([data[i][4]])
            temp['tableData'].push([data[i][5]])
            temp['tableData'].push([data[i][1]])
            var hash = data[i][9];
            temp['tableData'].push([
              <TouchableOpacity activeOpacity={.8} onPress={() => this.props.navigation.navigate("BillDataFileScreen",{hash : hash})}>
                <Text numberOfLines={1} style={{width:"100%",textAlign:"left", margin:5,marginLeft:16,fontSize:15,fontFamily:"Poppins-Medium",marginTop:3,color:"#3495eb",textDecorationLine:"underline"}}>View</Text>
              </TouchableOpacity>
            ])
            temp['tableData'].push([<View>
                                      <View style={{flexDirection:"row"}}><Icon name="time" size={23} color="#c9c930" style={{marginLeft:12}}/>
                                        <Text numberOfLines={1} style={{width:"80%", margin:5,fontWeight:"bold",marginTop:3,color:"#c9c930"}}>{data[i][2] >=2 ? ("APPROVED BY HOSPITAL ") : ("PENDING ")}</Text>
                                      </View>
                                    </View>])

            billData.push(temp)
          }
        }
      }

      //console.log(billData)
      this.setState({
        billData : billData,
      },
      this.prepareNotificationData())
    }

    prepareNotificationData = () =>{
      let data = this.state.data.reverse();
      let account = this.state.account;

      let viewedNotifications = this.state.viewedNotifications;
      //console.log(viewedNotifications)
      
      let notificationData = [];

      let newData =  [];

      for(var i = 0; i < data.length; i++){
        if(!viewedNotifications.includes(data[i][0])){
          newData.push(data[i]);
          //console.log(data[i][0])
        }
      }

      data = newData;

      for(var i = 0; i < data.length; i++){
        if(data[i][7] === account && data[i][10] == false){

          //console.log(data[0])

          if(data[i][8] != 0 | (data[i][8] == 0 && data[i][2] == 2)){
            let temp = {};

            temp['id'] = data[i][0].toString();
            temp['testname'] = data[i][3];
            temp['price'] = data[i][1];
            temp['status'] = data[i][8];
            
            notificationData.push(temp)
            //console.log(data[i][3])
          }
        }
      }

      //console.log(notificationData)
      this.setState({
        notificationData : notificationData,
        loadervisible: false,
      },
      function(){
      setTimeout(() => {this.setState({showNotifier: notificationData.length > 0 ? (true) : (false),notification : notificationData.length > 0 ? (true) : (false)})}, 500)
      //setTimeout(() => {this.setState({showNotifier: false})},4000)
      }
    )
  }

    getAccountData = async () => {
      try {
        const account = await AsyncStorage.getItem("account")
        this.setState({
          account : JSON.parse(account)
        },
          function() {
            this.prepareBillData()
            this.prepareNotificationData()
          }
        )
      } catch(e) {
        this.setState({
          error : e
        })
        console.error("Cannot fetch data from storage " + e)
      }
    }

    getAndPrepareData = async () =>{
      //set to initial state
      this.setState({
        loadervisible : true,
        notification: false,
        notificationModalVisible: false,
        showNotifier : false,
      })

      
      var viewedNotifications = await AsyncStorage.getItem("viewedNotifications")
      if(viewedNotifications != null){
        this.setState({
          viewedNotifications : viewedNotifications
        })
      }
      //console.log(viewedNotifications)


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
        this.setState({
          error : err
        })
        console.log('err', err.message)
      })
    }

    closeNotificationInfoField = () => {
      this.setState({
        showNotifier : false
      })
    }

    notificationViewed = async () =>{
      let data = this.state.notificationData;
      let viewedNotifications = [];

      //get previous notification data
      const val = await AsyncStorage.getItem('viewedNotifications')
      if(val != null){
        viewedNotifications = JSON.parse(val)
      }

      for (var i = 0; i < data.length; i++){
        viewedNotifications.push(parseInt(data[i].id))
      }

      //console.log(viewedNotifications);

      const jsonValue = JSON.stringify(viewedNotifications)
      await AsyncStorage.setItem("viewedNotifications", jsonValue)
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
        notification:false,
        showNotifier:false,
      })
    }
    const closeModal = () =>{
      this.setState({
        notification : false,
        notificationModalVisible: false
      },
      function(){
        setTimeout(() => {this.notificationViewed()}, 310)
      }
      )
    }

    const infoModalPopup = () => {
      Alert.alert("Network Error", "Cannot cannot to network. Try again later", [
        { text: "OK", 
        onPress: () => BackHandler.exitApp()
        }
      ]);
      return true;
    }


      return (
        this.state.error != "" ? (infoModalPopup()) : (
          <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
          <StatusBar backgroundColor={colors.primary} />
          <View style={{flex:1}}>
            <View style={styles.topLayout}>
              <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
                <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18,paddingRight:10}}/>
              </TouchableOpacity>
              <Text style={styles.pageTitle}> HOME </Text>
              <View style={{flexDirection:"row"}}>
                <TouchableOpacity activeOpacity={.6} onPress={() => this.getAndPrepareData()}>
                  <Icon name="refresh" size={25} color={colors.topBarIconColor} style={{marginRight:20,marginBottom:0}}/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.8} onPress={() => notificationClick()}>
                  <Icon name="notifications" size={24} color={colors.topBarIconColor} style={{marginRight:18,paddingLeft:10,marginTop:2}}/>
                  {
                    this.state.notification ? (
                      <Icon2 name="primitive-dot" size={20} color="red" style={{paddingLeft:22.3,paddingBottom:20,position:"absolute"}}/>
                    ) : (null)
                  }
                </TouchableOpacity>
              </View>
            </View>

            {
              this.state.showNotifier ? (<NotificationInfoField notificationCount={this.state.notificationData.length} closeNotificationInfoField = {this.closeNotificationInfoField} />) : (null)
            }

            {this.state.loadervisible == true ? (<Loader />) : (
            <View>
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
                this.state.billData.length > 0 ? (
                  <FlatList
                    contentContainerStyle={styles.bottomLayout}
                    data={this.state.billData}
                    renderItem={currentBillsItem}
                    ListFooterComponent={<View style={{height:330}}></View>}
                    keyExtractor={item => item.id}
                  />
                ) : (
                  this.state.loadervisible == false ? (
                  <View style = {styles.infoBox}>
                    <Icon1 name="info" size={25} color="#856a00" style={{alignSelf:"center"}}/>
                    <Text style = {styles.infoText}>There is no pending bills to show</Text>
                  </View>
                  ) : (null)
                )
              }

                <NotificationModal
                  isModalVisible = {this.state.notificationModalVisible}
                  data = {this.state.notificationData}
                  allData = {this.state.data}
                  closeModal = {closeModal}
                  navigation = {this.props.navigation}
                />

            </View>
          )}

          </View>
          </SafeAreaView>
        )
      );
    
  }
}

const styles = StyleSheet.create({
    topLayout: {
      flex:0,
      flexDirection:"row",
      height: "7%",
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
      marginLeft:25,
    },
  });
export default HomeScreen;
