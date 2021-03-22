import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput  } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import colors  from "../../config/colors";

import HomeScreen from '../Home/HomeScreen';



LogBox.ignoreLogs(['Warning: ...']);

class PersonalInfoScreen extends Component {

    state = {
        loggedIn : false,

        height: Dimensions.get("screen").height,
        cardImageSrc: "./res/1.jpg",

        showDatePicker: false,
        date: null,
        dateString: "",

        nameF: null,
        mobileNoF: null,
        bloodGrpF: null
    }

    componentDidMount() {
      LogBox.ignoreLogs(['Animated: `useNativeDriver`'])
    }

  render() {

    const onDateFieldClick = () => {
      this.setState({
        showDatePicker: true
      })
    };

    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || this.state.date || "";
      if(selectedDate)
      {
        this.setState({
          showDatePicker: false,
          date : currentDate,
          dateString: currentDate.toString().slice(4,10) + ", " + currentDate.toString().slice(11,15)
        })
      }
      else{
        this.setState({
          showDatePicker: false,
          date : currentDate,
          dateString: ""
        })
      }

      console.log(currentDate);
    };


    return (
      this.state.loggedIn ? (<HomeScreen/>):(

      <View style={{flex: 1, backgroundColor:"white"}}>
        <StatusBar backgroundColor="black" />
        <View style={{
          flex:1,
        }}>

        <KeyboardAwareView animated={true}>
        <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>

        <Text style={styles.pageTitle}>PERSONAL INFO</Text>

        <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Name"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>

            <TouchableOpacity activeOpacity={.7}
                onPress = {
                  () => onDateFieldClick()
                }>
            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              value={this.state.dateString}
              placeholder = "DOB"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              editable={false}/>
            </TouchableOpacity>

            {
            this.state.showDatePicker ? (
            <DateTimePicker
                      testID="dateTimePicker"
                      value={new Date()}
                      mode={'date'}
                      is24Hour={true}
                      display="default"
                      onChange={onDateChange}
                    />
            ) : (null)
            }
            
            <TextInput style = {styles.input}
              keyboardType='numeric'
              maxLength={10}
              underlineColorAndroid = "transparent"
              placeholder = "Mobile Number (+91)"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Blood Group"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>
          
                </ScrollView>
              </View>
            
              <TouchableOpacity
                activeOpacity={.7}
                style = {styles.submitButton}
                onPress = {
                  () => this.props
                  .navigation.reset(
                    {
                       index: 0,
                       routes: [{ name: 'HomeScreen' }],
                     })
                }>
                <Text style = {styles.submitButtonText}> SAVE </Text>
              </TouchableOpacity>

            </KeyboardAwareView>
            </View>
            </View>
      )
    );
  }
}

const styles = StyleSheet.create({
    input: {
      width:"95%",
      alignSelf:"center",
      marginBottom:30,
      height: 45,
      borderColor: '#e3e3e3',
      backgroundColor:"#f5f5f5",
      borderWidth: 1,
      borderRadius:3,
      paddingLeft:10,
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
      fontSize:25,
      fontWeight:"bold",
      textAlign:"center",
      marginBottom:40,
      marginTop:45,
      color:colors.primary,
    },
  });
export default PersonalInfoScreen;
