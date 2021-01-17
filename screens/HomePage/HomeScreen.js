import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, FlatList,  Image  } from "react-native";
import CardView from 'react-native-cardview';
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import IndexTable from '../../Components/IndexTable';

import colors  from "../../config/colors";

  
class HomeScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
    }

  render() {
    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor="black" />
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.toggleDrawer()}>
            <Icon name="menu-sharp" size={28} color={colors.topBarIconColor} style={{marginLeft:18}}/>
          </TouchableOpacity>
          <Text style={styles.pageTitle}> Home </Text>
        </View>

        <View style={styles.middleLayout}>
        </View>

        <CardView
        style={styles.bottomLayout}
        cardElevation={2}
        cardMaxElevation={3}
        cornerRadius={3}>
          <View>
            <ScrollView style={{padding:10}}>
                <Text>Home Screen</Text>
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
      marginBottom:20,
      alignSelf:"flex-end",
      color:"red"
    }
  });
export default HomeScreen;
