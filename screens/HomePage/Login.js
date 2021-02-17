import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput,  Image  } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import colors  from "../../config/colors";

import HomeScreen from './HomeScreen';
import PersonalInfoScreen from './PersonalInfoScreen';

LogBox.ignoreLogs(['Warning: ...']);

class Login extends Component {

    state = {
        infoAdded : false,
        loggedIn : false,

        height: Dimensions.get("screen").height,
        cardImageSrc: "./res/1.jpg",

        passVisible:false,
    }

    componentDidMount() {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
    }

  render() {
    
    const loginClick = () =>{
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
        <View style={{
          flex:1,
        }}>

        <KeyboardAwareView animated={true}>
        <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>

        {
        <Image style={styles.cardImage} source={require('./res/login.png')} />
        }

        <Text style={styles.pageTitle}>LOG IN</Text>

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Username"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>

            <View style={styles.passwordFieldStyle}>
              <TextInput style={{width:"93%"}}
                secureTextEntry={!this.state.passVisible}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "#858585"
                autoCapitalize = "none"
                onChangeText = {null}/>
              <TouchableOpacity activeOpacity={.7} onPress={setPassVisibility}>
                {this.state.passVisible ? (
                  <Icon name="eye-off-sharp" size={23} color="#a3a3a3" style={{paddingTop:8,paddingLeft:3}}/>
                ) : (
                  <Icon name="eye-sharp" size={23} color="#a3a3a3" style={{paddingTop:8,paddingLeft:3}}/>
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
            </View>
      )
    );
  }
}

const styles = StyleSheet.create({
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
    passwordFieldStyle: {
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
      height: 40,
      marginTop:15,
      borderRadius:3,
      marginBottom:20,
      elevation:5,
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
export default Login;
