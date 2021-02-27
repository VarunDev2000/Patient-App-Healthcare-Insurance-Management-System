import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

class BiometricModal extends Component {

  render() {

  const closeModal = () => {
    this.props.closeModal();
  };

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };

  return (
    <Modal
      isVisible={this.props.isModalVisible}
      animationIn={fadeIn}
      animationInTiming={200}
      animationOut= {fadeOut}
      animationOutTiming={200}
      backdropTransitionOutTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={this.props.opacity}
      backdropColor="black"
      scrollHorizontal={true}
      onBackButtonPress={() => closeModal()}
    >
      <View style={styles.innerModalView}>
          <View>
            <Text style={[styles.modalTitle1,{marginBottom:0}]}>ERROR</Text>

            <Image style={styles.modalImage} source={require('./res/error-removebg-preview.png')}/>

            <Text style={[styles.modalTitle2,{color:"red"}]}>{this.props.modalTitle}</Text>
            <Text style={[styles.modalDesc,{marginBottom : 25}]}>{this.props.modelDesc}</Text>

            {
            this.props.type != "Biometry" ? (
              <TouchableOpacity style={styles.buttonOuterLayerStyle} activeOpacity={.6} onPress={closeModal}>
                  <Text style={styles.buttonStyle}>OK </Text>
              </TouchableOpacity>
            ) : (null)
            }
        </View>
      </View>
    </Modal>
  );
  }
};


const styles = StyleSheet.create({
  innerModalView: {
    flex: 0,
    backgroundColor: colors.secondary,
    padding: 30,
    paddingBottom: 20,
    borderRadius: 7,
    marginTop: 30,
    marginBottom: 30,
  },
  modalTitle1: {
    color: "red",
    fontSize:17,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:"3%"
  },
  modalTitle2: {
    fontSize:15,
    textAlign:"center",
    marginBottom:"2.5%",
  },  
  modalDesc: {
    color:"black",
    fontSize:12,
    fontStyle:"italic",
    textAlign:"center",
    marginBottom:"1%"
  },  
  modalInstructions: {
    fontSize:12,
    textAlign:"center",
    marginBottom:"1%"
  },  
  modalImage: {
    width:"45%",
    height:200,
    alignSelf:"center", 
    marginBottom:0,
    resizeMode:"contain",
  },
  buttonOuterLayerStyle:{
    marginTop:10,
    padding:10,
    justifyContent:"center",
    alignItems:"center"
  },
  buttonStyle: {
      color:"black",
      fontWeight:"bold",
      fontSize:14
  },
});

export default BiometricModal;