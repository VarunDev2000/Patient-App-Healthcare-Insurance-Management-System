import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import FingerprintScanner from 'react-native-fingerprint-scanner';

import colors from "../config/colors";

class BiometricAuthenticationModal extends Component {

  state = {
    biometryType : "",
  }

  componentDidMount() {
    this.checkBiometricAvailability();
  }

  checkBiometricAvailability(){
    FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => this.biometricChecked(biometryType))
    .catch(error => this.setState({ errorMessage: error.message }));
  }

  biometricChecked(biometryType){
    this.setState({biometryType : biometryType})

    if(biometryType == "Biometrics")
    {
      this.authenticate()
    }
  }

  authenticate(){
    console.log("Authentication")
  }

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
      animationInTiming={400}
      animationOut= {fadeOut}
      animationOutTiming={200}
      backdropTransitionOutTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.6}
      backdropColor="black"
      scrollHorizontal={true}
      onBackButtonPress={() => closeModal()}
    >
      <View style={styles.innerModalView}>
        {
          this.state.biometryType == "Biometrics" ? (
            <View>
              <Text style={styles.modalTitle1}>BIOMETRIC AUTHENTICATION</Text>
              <Text style={styles.modalTitle2}>Verify your identity</Text>
              <Text style={styles.modalDesc}>Confirm your fingerprint so we can verify it's you</Text>

              <Image style={styles.modalImage} source={require('./res/biometric.png')}/>

              <Text style={styles.modalInstructions}>Touch the fingerprint sensor</Text>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
              <TouchableOpacity style={styles.buttonOuterLayerStyle} activeOpacity={.6} onPress={closeModal}>
                <Text style={styles.buttonStyle}>CANCEL </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOuterLayerStyle} activeOpacity={.6} onPress={this.props.bioMetricAuthenticated}>
                <Text style={[styles.buttonStyle,{color:"green"}]}>SKIP </Text>
              </TouchableOpacity>
            </View>
          </View>
          ) : (
            <View>
              <Text style={[styles.modalTitle1,{marginBottom:0}]}>BIOMETRIC AUTHENTICATION</Text>

              <Image style={styles.modalImage} source={require('./res/error-removebg-preview.png')}/>

              <Text style={[styles.modalTitle2,{color:"red"}]}>Biometric not supported on this device</Text>
              <Text style={styles.modalDesc}>Try using the app on other device</Text>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
              <TouchableOpacity style={styles.buttonOuterLayerStyle} activeOpacity={.6} onPress={closeModal}>
                <Text style={[styles.buttonStyle,{color:"black"}]}>GO BACK </Text>
              </TouchableOpacity>
            </View>
          </View>
          )
        }

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
      color:"red",
      fontWeight:"bold",
      fontSize:14
  },
});

export default BiometricAuthenticationModal;