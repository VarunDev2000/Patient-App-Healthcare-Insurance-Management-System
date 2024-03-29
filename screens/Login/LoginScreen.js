import React, { Component } from "react";
import { Alert, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput,  Image, BackHandler  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import colors  from "../../config/colors";

import FingerprintScanner from 'react-native-fingerprint-scanner';

import BiometricModal from '../../Components/BiometricModal';

import HomeScreen from '../Home/HomeScreen';
import PersonalInfoScreen from './PersonalInfoScreen';

//LogBox.ignoreLogs(['Warning: ...']);

class LoginScreen extends Component {

    constructor(props) {
      super(props)
      this.state = {
          infoAdded : false,
          loggedIn : false,

          height: Dimensions.get("screen").height,
          cardImageSrc: "./res/1.jpg",

          passVisible : false,

          biometryType : "",
          fingerprintNotEnabled: false,
          errorMessageLegacy: "",
          biometricLegacy : ""
      }
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
      this.checkBiometricAvailability();
    }

    UNSAFE_componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    //Exit App
    handleBackButtonClick() {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }

    checkBiometricAvailability(){
      FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => this.setState({biometryType : biometryType}))
      .catch(error => error.name == "FingerprintScannerNotEnrolled" ? (this.setState({biometryType : "Biometrics"})): (null));
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

        if(error.name == "FingerprintScannerNotEnrolled"){
          this.setState({
            fingerprintNotEnabled: true,
          })
        }
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

    const closeModal = () =>{
      this.setState({
        fingerprintNotEnabled : false
      })
    }

    if(this.state.loggedIn)
    {
      if(this.state.infoAdded)
      {
        return <HomeScreen/>
      }
      else{
        return <PersonalInfoScreen/>
      }
    }
    else{
    return (

      <View style={{flex: 1, backgroundColor:"white"}}>
        <StatusBar backgroundColor="black" />

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
              <TextInput style = {{width:"95%",fontWeight:"normal"}}
                underlineColorAndroid = "transparent"
                placeholder = "Username"
                placeholderTextColor = "#858585"
                autoCapitalize = "none"
                onChangeText = {null}/>
            </View>

            <View style={styles.textFieldStyle}>
              <Icon name="ios-lock-closed" size={21} color="#858585" style={{paddingTop:9,paddingLeft:2,paddingRight:3}}/>
              <TextInput style={{width:"85%",fontWeight:"normal"}}
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

              {
              this.state.biometryType != "Biometrics" ? (
                <BiometricModal
                  type = "Biometry"
                  isModalVisible = {true}
                  closeModal = {closeModal}
                  modalTitle = "Biometric not supported on this device"
                  modelDesc = "Try installing the app on other device"
                  opacity = {0.9}
                />) : (null)
              }

              <BiometricModal
                isModalVisible = {this.state.fingerprintNotEnabled}
                closeModal = {closeModal}
                modalTitle = "Fingerprint not enrolled"
                modelDesc = "Try setting fingerprint authentication on your device"
                opacity = {0.6}
              />

            </KeyboardAwareView>
            </View>
            </View>
    );
  }
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