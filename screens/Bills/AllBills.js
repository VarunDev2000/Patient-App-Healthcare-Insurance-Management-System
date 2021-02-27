import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image, RefreshControl  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import BillTable from '../../Components/BillTable';

import colors  from "../../config/colors";

const BILL_DATA = [
  {
    id: '1',
    tableData: [['52'],['Brain scanning'],['12-10-2020'],['Apollo Hospital'],['Rs.4000'],[<View style={{flexDirection:"row"}}><Icon name="checkmark-circle" size={23} color="green" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"green"}}>ACCEPTED </Text></View>]]
  },
  {
    id: '2',
    tableData: [['23'],['Ultrasound'],['06-05-2020'],['Apollo Hospital'],['Rs.1000'],[<View style={{flexDirection:"row"}}><Icon name="time" size={23} color="#c9c930" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"#c9c930"}}>WAITING </Text></View>]]
  },
  {
    id: '3',
    tableData: [['91'],['Skin test'],['06-01-2021'],['K.S.P Skin Hospital'],['Rs.8000'],[<View style={{flexDirection:"row"}}><Icon1 name="cancel" size={23} color="red" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"red"}}>REJECTED </Text></View>]]
  },
  {
    id: '4',
    tableData: [['142'],['Skin test'],['21-01-2021'],['K.S.P Skin Hospital'],['Rs.2000'],[<View style={{flexDirection:"row"}}><Icon1 name="cancel" size={23} color="red" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"red"}}>REJECTED </Text></View>]]
  },
  {
    id: '5',
    tableData: [['305'],['Brain scanning'],['10-2-2021'],['Apollo Hospital'],['Rs.2000'],[<View style={{flexDirection:"row"}}><Icon name="checkmark-circle" size={23} color="green" style={{marginLeft:12}}/><Text style={{marginLeft:5,fontWeight:"bold",marginTop:2,color:"green"}}>ACCEPTED </Text></View>]]
  },
];


class AllBills extends Component {
    state = {
        height: Dimensions.get("screen").height,
        tableTitle: ['BILL ID', 'TEST NAME', 'DATE', 'HOSPITAL NAME','PRICE','STATUS'],
    }

  render() {

    const allBillsItem = ({ item }) => (
      <CardView
      style={styles.billCard}
      cardElevation={3}
      cardMaxElevation={3}
      cornerRadius={2}>
          <BillTable
            tableTitle = {this.state.tableTitle}
            tableData = {item.tableData}
          />
      </CardView>
    );

    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor="black" />
        <View style={{flex:1}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Icon name="arrow-back-sharp" size={30} color={colors.topBarIconColor} style={{marginLeft:18}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> ALL  BILLS </Text>
          <TouchableOpacity activeOpacity={1} onPress={null}>
            <Icon name="notifications" size={25} color="black" style={{marginRight:18}}/>
          </TouchableOpacity>
        </View>

          <FlatList
            contentContainerStyle={styles.bottomLayout}
            data={BILL_DATA}
            renderItem={allBillsItem}
            keyExtractor={item => item.id}
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
    bottomLayout:{
      paddingBottom:50,
    },
    card: {
      width:"46%",
      margin:"2%",
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
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
    cardHeading: {
      fontSize:13,
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
      width:"100%",
      height:170,
      marginBottom:2,
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
  });
export default AllBills;
