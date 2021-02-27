import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import IndexTable from '../../Components/IndexTable';
import BillTable from '../../Components/BillTable';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Octicons';

import colors  from "../../config/colors";

import NotificationModal from '../../Components/NotificationModal';

LogBox.ignoreLogs(['Warning: ...']);

const DATA = [
  {
    id: '1',
    card_heading: 'Personal Information',
    ref_name: "personalinfoSelected",
  },
  {
    id: '2',
    card_heading: 'My Bills',
    ref_name: "myBillsSelected",
  },
];

const BILL_DATA = [
  {
    id: '1',
    tableData: [['52'],['Brain scanning'],['12-10-2020'],['Apollo Hospital'],['Rs.4000']]
  },
  {
    id: '2',
    tableData: [['23'],['Ultrasound'],['06-05-2020'],['Apollo Hospital'],['Rs.1000']]
  },
  {
    id: '3',
    tableData: [['91'],['Skin test'],['06-01-2021'],['K.S.P Skin Hospital'],['Rs.8000']]
  },
  {
    id: '4',
    tableData: [['142'],['Skin test'],['21-01-2021'],['K.S.P Skin Hospital'],['Rs.2000']]
  },
  {
    id: '5',
    tableData: [['305'],['Brain scanning'],['10-2-2021'],['Apollo Hospital'],['Rs.2000']]
  },
];

  
class ProfileScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
        personalinfoSelected : true,
        myBillsSelected : false,
        profilePic : require('./res/profilepic.jpg'),

        tableTitle: ['Name', 'DOB', 'Mobile No', 'Blood Grp'],
        tableData: [['Varun'],['06-05-2000'],['9087654321'],['O +ve']],

        billTableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE'],

        notification: true,
        notificationModalVisible: false,
    }

    setSelected(id){
        //console.log(id)
        if(id == 1){
            this.setState({
                personalinfoSelected:true,     
                myBillsSelected : false
            })
        }
        if(id == 2){
            this.setState({
                personalinfoSelected:false,     
                myBillsSelected : true
            })
        }
    }


  render() {

    const renderItem = ({ item }) => (
          <TouchableOpacity activeOpacity={.9} style={this.state[item.ref_name] == true ? styles.cardSelected : styles.card} onPress={this.setSelected.bind(this,item.id)}>
            <Text style={this.state[item.ref_name] == true ? styles.cardHeadingSelected : styles.cardHeading}>
              {item.card_heading}
            </Text>
          </TouchableOpacity>
      );

      const allBillsItem = ({ item }) => (
        <CardView
        style={styles.billCard}
        cardElevation={3}
        cardMaxElevation={3}
        cornerRadius={2}>
            <BillTable
              tableTitle = {this.state.billTableTitle}
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
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18,paddingRight:10}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> PROFILE </Text>
          <TouchableOpacity activeOpacity={.8} onPress={() => notificationClick()}>
            <Icon name="notifications" size={24} color={colors.topBarIconColor} style={{marginRight:18,paddingLeft:10}}/>
            {
              this.state.notification ? (
                <Icon1 name="primitive-dot" size={20} color="red" style={{paddingLeft:22.3,paddingBottom:20,position:"absolute"}}/>
              ) : (null)
            }
          </TouchableOpacity>
        </View>

        <View style={styles.middleLayout}>
            <FlatList
            style ={styles.flatListStyle}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
            {
                this.state.personalinfoSelected == true ? (
                  <CardView
                  style={styles.bottomLayout1}
                  cardElevation={2}
                  cardMaxElevation={3}
                  cornerRadius={3}>
                    <View>
                      <ScrollView style={{padding:10}}>
                        <View>
                            <Image style={styles.cardImage} source={this.state.profilePic}/>
                            <IndexTable
                              tableTitle = {this.state.tableTitle}
                              tableData = {this.state.tableData}
                            />
                            {
                            /*
                            <TouchableOpacity activeOpacity={.6} onPress={logOut}>
                              <Text style={styles.logoutStyle}>LOG OUT</Text>
                            </TouchableOpacity>
                            */ 
                            }
                        </View>
                      </ScrollView>
                    </View>
                  </CardView>
                ) : (
                  <CardView
                  style={styles.bottomLayout2}
                  cardElevation={2}
                  cardMaxElevation={3}
                  cornerRadius={3}>
                    <View>
                        <FlatList
                          contentContainerStyle={styles.billsListLayout}
                          data={BILL_DATA}
                          renderItem={allBillsItem}
                          keyExtractor={item => item.id}
                        />
                    </View>
                  </CardView>
                )
            }

          <NotificationModal
            isModalVisible = {this.state.notificationModalVisible}
            closeModal = {closeModal}
            modalTitle = "Fingerprint not enrolled"
            modelDesc = "Try setting fingerprint authentication on your device"
            opacity = {0.6}
          />

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
      justifyContent:"space-between"
    },
    middleLayout:{
        flex:0,
    },
    bottomLayout1: {
      flex:0,
      margin:5,
      marginTop:8,
      backgroundColor: colors.secondary,
    },
    bottomLayout2: {
      flex:1,
      padding:8,
      margin:8,
      marginTop:8,
      marginBottom:"12%",
      backgroundColor: colors.secondary,
    },
    billsListLayout:{
      paddingBottom:0
    },
    flatListStyle: {
        paddingTop:10,
    },
    billCard: {
      width:"96%",
      margin:"2%",
      marginTop:17,
      marginBottom:10,
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
    },
    card: {
      width:"46%",
      margin:"2%",
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
      fontSize:14,
      padding:10,
      fontStyle:"italic",
      alignSelf:"center",
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
      width:"40%",
      height:200,
      alignSelf:"center", 
      marginBottom:2,
      resizeMode:"contain",
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
    logoutStyle: {
      marginTop: 25,
      margin:10,
      marginBottom:15,
      alignSelf:"flex-end",
      color:"red"
    }
  });
export default ProfileScreen;
