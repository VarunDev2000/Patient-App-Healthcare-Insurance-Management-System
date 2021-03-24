import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, Alert, BackHandler  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';
import IndexTable from '../../Components/IndexTable';

import Icon from 'react-native-vector-icons/Ionicons';

import colors  from "../../config/colors";

import Loader from "../../Components/Loader";

LogBox.ignoreLogs(['Warning: ...']);

const DATA = [
  {
    id: '1',
    card_heading: 'Personal Information',
    ref_name: "personalinfoSelected",
  },
];

class ProfileScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
        myBillsSelected : false,
        profilePic : require('./res/profilepic.jpg'),

        loadervisible : true,

        account : "",

        personalInfoData: [],
        tableTitle: ['Name', 'DOB', 'Mobile No', 'Blood Grp'],
        tableData: [],

        billsData: [],
        billTableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE'],
        billTableData: [],

        error : "",
    }

    async componentDidMount(){
      this.getAndPrepareData();
    }

    preparePersonalInfoData = () =>{
      let data = this.state.personalInfoData;

      let pInfoData = [];

      pInfoData.push([data[1]])
      pInfoData.push([data[2]])
      pInfoData.push([data[0]])
      pInfoData.push([data[3]])

      //console.log(pInfoData)
      this.setState({
        tableData : pInfoData,
        loadervisible : false,
      })
    }


    getAndPrepareData = async () => {
      try {
        const account = await AsyncStorage.getItem("account")
        this.setState({
          account : JSON.parse(account)
        },
          function() {
            this.getPersonalInfoData()
          }
        )
      } catch(e) {
        this.setState({
          error : err
        })
        console.error("Cannot fetch data from storage " + e)
      }
    }

    getPersonalInfoData = () =>{
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: this.state.account,
        })
      };

      fetch(`${CREDENTIALS.BASE_URL}/api/pdetails`, config)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({
          personalInfoData : res
        },
          function() {
            this.preparePersonalInfoData();
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

  render() {

    const renderItem = ({ item }) => (
          <TouchableOpacity activeOpacity={.9} style={styles.cardSelected}>
            <Text style={styles.cardHeadingSelected}>
              {item.card_heading}
            </Text>
          </TouchableOpacity>
      );


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
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18,paddingRight:10}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> PROFILE </Text>
          <TouchableOpacity activeOpacity={1} onPress={() => null}>
            <Icon name="notifications" size={24} color={colors.primary} style={{marginRight:18,paddingLeft:10}}/>
          </TouchableOpacity>
        </View>

        {this.state.loadervisible == true ? (<Loader />) : (
        
        <View>
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
        <CardView
        style={styles.bottomLayout1}
        cardElevation={2}
        cardMaxElevation={3}
        cornerRadius={3}>
          <View>
            <ScrollView style={{padding:10}}>
                  {
                  this.state.tableData.length > 0 ? (
                    <View>
                      <Image style={styles.cardImage} source={this.state.profilePic}/>
                      <IndexTable
                        tableTitle = {this.state.tableTitle}
                        tableData = {this.state.tableData}
                      />
                    </View>
                    ) : (null)
                  }
                  {
                  /*
                  <TouchableOpacity activeOpacity={.6} onPress={logOut}>
                    <Text style={styles.logoutStyle}>LOG OUT</Text>
                  </TouchableOpacity>
                  */ 
                  }
            </ScrollView>
          </View>
        </CardView>

        </View>
        )}

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
    cardSelected: {
      width:"46%",
      margin:"2%",
      elevation:5,
      backgroundColor: colors.selectedButtonColor,
      borderRadius:5,
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
