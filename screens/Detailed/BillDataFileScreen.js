import React, { Component } from "react";
import { SafeAreaView, Dimensions, View,
  TouchableOpacity, StyleSheet, StatusBar, Image, Text  } from "react-native";
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

import colors  from "../../config/colors";


class BillDataFileScreen extends Component {
    state = {
        height: Dimensions.get("screen").height,
    }

    componentDidMount(){
      //console.log(this.props.route.params.hash)
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
            <View style={{flex : 1}}>
              <WebView 
              style={{backgroundColor:"black"}}
              source={{ uri: `http://ipfs.infura.io/ipfs/${this.props.route.params.hash}`}} 
              originWhitelist={["*"]}
              useWebKit
              />
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
    cardImage: {
      width:"80%",
      height: "50%",
      marginBottom:2,
      alignSelf:"center",
      marginBottom:30,
      marginTop:70,
      resizeMode:"contain"
    },
    infoBox: {
      flex:0,
      flexDirection:"row",
      flexWrap:"wrap",
      padding:5,
      paddingLeft:7,
      paddingRight:17,
      margin:15,
      elevation:2,
      borderRadius:5,
      backgroundColor: "white",
    },
    infoText: {
      fontSize:15,
      marginLeft:12,
      textAlign: 'justify',
      lineHeight: 23,
      color: "#856a00",
    },
  });
export default BillDataFileScreen;
