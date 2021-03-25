import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors';

class NotificationInfoField extends Component {
  render() {
    return (
        <View style={styles.errorOuterLayout}>
            <Icon name="notifications" size={18} color="white" style={{paddingRight:5}}/>
            <Text style={styles.errorTextStyle}>You have {this.props.notificationCount} new notification{this.props.notificationCount > 1 ? ("s"):(null)}</Text>
            <TouchableOpacity activeOpacity={.5} onPress={() => this.props.closeNotificationInfoField()}>
              <Icon1 name="close" size={20} color="white" style={{paddingLeft:15,paddingRight:3,paddingTop:1}}/>
            </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    errorOuterLayout: {
        flex : 0,
        flexDirection:"row",
        padding:5,
        marginBottom:0,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#b52424",
        alignSelf:"flex-end",
        elevation:20,
        marginTop:10,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
      },
      errorTextStyle: {
        fontSize:14,
        color:"white",
      },
})

export default NotificationInfoField;
