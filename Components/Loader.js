import React, { Component } from 'react';
import {Image, View, StyleSheet, Modal, StatusBar,Text} from 'react-native';
import CardView from 'react-native-cardview';
//import AnimatedLoader from 'react-native-animated-loader';

import colors from '../config/colors';

class Loader extends Component {

  componentDidMount(){
    //console.log(this.props.value);
  }

  render() {
    return (
      <Modal backdropColor='transparent'
      transparent={true} visible={true}>
        <View style={styles.outerLayout}>
          <StatusBar  barStyle = "light-content" hidden = {false} backgroundColor={colors.primary} />
          <CardView
            style={styles.card}
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={5}>
              <Image style={styles.gifStyle} source={require('../res/animations/gifs/loader.gif')} />
              <Text style={styles.loadingText}>Loading</Text>
          </CardView>
        </View> 
        </Modal>
    )
  }
};


const styles = StyleSheet.create({
  outerLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:50,
    backgroundColor:"rgba(0,0,0,0.2)"
  },
  card: {
    flex : 0,
    padding: 6,
    paddingLeft:6,
    paddingRight:8,
    borderRadius: 5,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
  },
  loadingText: {
    fontSize:14,
    color: colors.primary,
    width:"100%",
    textAlign:"center",
    marginTop:2,
    marginLeft:7,
    marginRight:7
  },
  gifStyle: {
    width: 45,
    height: 45,
    resizeMode: "contain"
  },
})

export default Loader;
