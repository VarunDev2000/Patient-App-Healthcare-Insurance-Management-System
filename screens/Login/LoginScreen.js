import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput,  Image, Keyboard  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import colors  from "../../config/colors";

import FingerprintScanner from 'react-native-fingerprint-scanner';

import HomeScreen from '../Home/HomeScreen';
import PersonalInfoScreen from './PersonalInfoScreen';

LogBox.ignoreLogs(['Warning: ...']);

class LoginScreen extends Component {

    state = {
        infoAdded : false,
        loggedIn : false,

        height: Dimensions.get("screen").height,
        cardImageSrc: "./res/1.jpg",

        passVisible : false,

        biometryType : "",
        errorMessageLegacy: "",
        biometricLegacy : ""
    }


    componentDidMount() {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
      this.checkBiometricAvailability();
    }

    checkBiometricAvailability(){
      FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => this.setState({biometryType : biometryType}))
      .catch(error => this.setState({ errorMessage: error.message }));
    }


  render() {

    const loginClick = () =>{
      authenticate()
    }

    const authenticate = () =>{
      FingerprintScanner
      .authenticate({ title: 'Biometric Authentication',onAttempt: handleAuthenticationAttemptedLegacy })
      .then(() => {
        console.log("Success")
        FingerprintScanner.release();
        bioMetricAuthenticated()
        //this.props.handlePopupDismissedLegacy();
      })
      .catch((error) => {
        console.log(error)
        this.setState({ errorMessageLegacy: error.message, biometricLegacy: error.biometric });
        FingerprintScanner.release();
        //this.description.shake();
      });
    }

    const handleAuthenticationAttemptedLegacy = (error) => {
      this.setState({ errorMessageLegacy: error.message });
      //this.description.shake();
    };

    
    const bioMetricAuthenticated = () =>{
      this.setState({
        isModalVisible : false
      },
      this.state.infoAdded ? (
        this.props.navigation.reset(
        {
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        })
      ) : (
        this.props.navigation.reset(
        {
          index: 0,
          routes: [{ name: 'PersonalInfoScreen' }],
        })
      )
      );
    }

    const setPassVisibility = () =>{
      this.setState({
        passVisible : !this.state.passVisible
      })
    }


    return (
      this.state.loggedIn ? (this.state.infoAdded ? (<HomeScreen/>) :
      (<PersonalInfoScreen/>)):(

      <View style={{flex: 1, backgroundColor:"white"}}>
        <StatusBar backgroundColor="black" />

        {
          this.state.biometryType != "Biometrics" ? (
            <View style={{flex : 1, justifyContent:"center",alignItems:'center',backgroundColor: 'rgba(0,0,0,0.4)' }}>
              <View style={styles.noBioSupportLayout}>
                <Text style={[styles.noBioTitle1,{marginBottom:0}]}>ERROR</Text>

                <Image style={styles.noBioImage} source={require('./res/error-removebg-preview.png')}/>

                <Text style={[styles.noBioTitle2,{color:"red"}]}>Biometric not supported on this device</Text>
                <Text style={[styles.noBioDesc,{marginBottom : 25}]}>Try installing the app on other device</Text>
              </View>
            </View>
          ) : (

        <View style={{flex:1}}>
        <KeyboardAwareView animated={true}>
        <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>

        {
        <Image style={styles.cardImage} source={require('./res/login.png')} />
        }

        <Text style={styles.pageTitle}>LOG IN</Text>

            <View style={styles.textFieldStyle}>
              <Icon1 name="user" size={20} color="#858585" style={{paddingTop:11,paddingLeft:3,paddingRight:8}}/>
              <TextInput style = {{width:"95%"}}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                placeholderTextColor = "#858585"
                autoCapitalize = "none"
                onChangeText = {null}/>
            </View>

            <View style={styles.textFieldStyle}>
              <Icon name="ios-lock-closed" size={21} color="#858585" style={{paddingTop:9,paddingLeft:2,paddingRight:3}}/>
              <TextInput style={{width:"85%"}}
                secureTextEntry={!this.state.passVisible}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#858585"
                autoCapitalize = "none"
                onChangeText = {null}/>
              <TouchableOpacity activeOpacity={.7} onPress={setPassVisibility}>
                {this.state.passVisible ? (
                  <Icon name="eye-off-sharp" size={22} color="#a3a3a3" style={{paddingTop:10,paddingLeft:3}}/>
                ) : (
                  <Icon name="eye-sharp" size={22} color="#a3a3a3" style={{paddingTop:10,paddingLeft:3}}/>
                )}
                </TouchableOpacity>
            </View>
          
                </ScrollView>
              </View>
            
              <TouchableOpacity
                activeOpacity={.7}
                style = {styles.submitButton}
                onPress = {
                  loginClick
                }>
                <Text style = {styles.submitButtonText}> LOGIN </Text>
              </TouchableOpacity>

            </KeyboardAwareView>
            </View>
          )
          }
            </View>
      )
    );
  }
}

const styles = StyleSheet.create({
    noBioSupportLayout: {
      flex: 0,
      width:"88%",
      backgroundColor: colors.secondary,
      padding: 30,
      paddingBottom: 20,
      borderRadius: 10,
      marginTop: 30,
      marginBottom: 30,
      elevation:20
    },
    noBioTitle1: {
      fontSize:17,
      fontWeight:"bold",
      textAlign:"center",
      marginBottom:"3%"
    },
    noBioTitle2: {
      fontSize:15,
      textAlign:"center",
      marginBottom:"2.5%",
    },  
    noBioDesc: {
      color:"black",
      fontSize:12,
      fontStyle:"italic",
      textAlign:"center",
      marginBottom:"1%"
    }, 
    noBioImage: {
      width:"45%",
      height:200,
      alignSelf:"center", 
      marginBottom:0,
      resizeMode:"contain",
    }, 
    cardImage: {
      width:"50%",
      height:220,
      marginBottom:2,
      alignSelf:"center",
      marginBottom:30,
      marginTop:70,
    },
    input: {
      width:"95%",
      alignSelf:"center",
      marginBottom:20,
      height: 45,
      borderColor: '#e3e3e3',
      backgroundColor:"#f5f5f5",
      borderWidth: 1,
      borderRadius:3,
      paddingLeft:10,
      paddingRight:10,
      color: 'black'
    },
    textFieldStyle: {
      flex:0,
      flexDirection:"row",
      width:"95%",
      alignSelf:"center",
      marginBottom:20,
      height: 45,
      borderColor: '#e3e3e3',
      backgroundColor:"#f5f5f5",
      borderWidth: 1,
      borderRadius:3,
      paddingLeft:6,
      paddingRight:10,
      color: 'black'
    },
    submitButton: {
      width:"95%",
      backgroundColor: colors.primary,
      padding: 10,
      alignSelf:"center",
      height: 43,
      marginTop:15,
      borderRadius:3,
      marginBottom:20,
      elevation:5,
      justifyContent:"center",
      alignItems:"center"
    },
    submitButtonText:{
      color: 'white',
      fontWeight:"bold",
      textAlign:"center"
    },
    pageTitle: {
      fontSize:30,
      fontWeight:"bold",
      textAlign:"center",
      marginBottom:40,
      color:colors.primary,
    },
  });

  
export default LoginScreen;
