import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '../config/colors';

class ErrorField extends Component {
  render() {
    if (this.props.isVisible) {
    return (
        <View style={styles.errorOuterLayout}>
            <Icon name="error-outline" size={15} color="red" style={{paddingRight:5}}/>
            <Text style={styles.errorTextStyle}>{this.props.errorMessage}</Text>
        </View>
    );
    }
    else{
        return null;
    }
  }
}

const styles = StyleSheet.create({
    errorOuterLayout: {
        flex : 0,
        flexDirection:"row",
        width:"100%",
        marginLeft:15,
        marginBottom:20,
        alignItems:"center",
      },
      errorTextStyle: {
        fontSize:12,
        color:"red"
      },
})

export default ErrorField;
