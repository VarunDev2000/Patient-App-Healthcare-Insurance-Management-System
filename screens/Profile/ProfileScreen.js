import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import IndexTable from '../../Components/IndexTable';

import colors  from "../../config/colors";

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

  
class ProfileScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
        personalinfoSelected : true,
        myBillsSelected : false,
        profilePic : require('./res/profilepic.jpg'),

        tableTitle: ['Name', 'DOB', 'Mobile No', 'Blood Grp'],
        tableData: [['Varun'],['06-05-2000'],['9087654321'],['O +ve']]
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


    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor="black" />
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> Profile </Text>
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

        <CardView
        style={styles.bottomLayout}
        cardElevation={2}
        cardMaxElevation={3}
        cornerRadius={3}>
          <View>
          <ScrollView style={{padding:10}}>
            {
                this.state.personalinfoSelected == true ? (
                    <View>
                        <Image style={styles.cardImage} source={this.state.profilePic}/>
                        <IndexTable
                          tableTitle = {this.state.tableTitle}
                          tableData = {this.state.tableData}
                        />
                        <Text style={styles.logoutStyle}>LOG OUT</Text>
                    </View>
                ) : (
                    <View>
                        <Text>My Bills</Text>
                    </View>
                )
            }
            </ScrollView>
            </View>
        </CardView>

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
    },
    middleLayout:{
        flex:0,
    },
    bottomLayout: {
      flex:0,
      margin:5,
      marginTop:8,
      backgroundColor: colors.secondary,
    },
    flatListStyle: {
        paddingTop:10,
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
      fontSize:21,
      fontWeight:"bold",
      color:colors.secondary,
      marginLeft:"7%"
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
