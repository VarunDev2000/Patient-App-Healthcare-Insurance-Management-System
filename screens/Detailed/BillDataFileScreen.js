import React, { Component } from "react";
import { SafeAreaView, Dimensions, View,
  TouchableOpacity, StyleSheet, StatusBar, Image  } from "react-native";
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/Ionicons';

import colors  from "../../config/colors";


class BillDataFileScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
    }

  render() {

    return (
        <SafeAreaView style={{ height: this.state.height,backgroundColor: colors.bgColor }}>
        <StatusBar backgroundColor={colors.primary} />
        <View style={{flex:1}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={.6} onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back-sharp" size={30} color={colors.topBarIconColor} style={{marginLeft:18}}/>
          </TouchableOpacity>
        </View>
        </View>

        </SafeAreaView>
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
export default BillDataFileScreen;
