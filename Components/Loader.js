import React, { Component } from 'react';
import {Image, View, StyleSheet, Text, StatusBar} from 'react-native';
import CardView from 'react-native-cardview';
//import AnimatedLoader from 'react-native-animated-loader';

import colors from '../config/colors';

class Loader extends Component {

  render() {
    return (
        <View style={styles.outerLayout}>
           <StatusBar  barStyle = "dark-content" hidden = {false} backgroundColor="white" />
          <CardView
            style={styles.card}
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={100}>
              <Image style={styles.gifStyle} source={require('../res/animations/gifs/loader.gif')} />
          </CardView>
          <Text style={styles.loadingText}>... Loading ...</Text>
        </View> 
    )
  }
};


const styles = StyleSheet.create({
  card: {
    flex:0,
    padding: 10,
    borderRadius: 5,
    justifyContent:"center",
    alignItems:"center"
  },
  outerLayout: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50
  },
  loadingText: {
    fontSize:16,
    color: colors.primary,
    fontWeight:"bold",
    width:"100%",
    marginTop:10,
    textAlign:"center"
  },
  gifStyle: {
    width: 50,
    height: 50,
  },
})

export default Loader;
