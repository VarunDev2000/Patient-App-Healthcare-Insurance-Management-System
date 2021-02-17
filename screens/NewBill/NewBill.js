import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput,  Image  } from "react-native";
import CardView from 'react-native-cardview';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import colors  from "../../config/colors";

LogBox.ignoreLogs(['Warning: ...']);

class NewBill extends Component {

    state = {
        height: Dimensions.get("screen").height,
        cardImageSrc: "./res/1.jpg",
        showDatePicker: false,
        date: null,
        dateString: "",

        testNameF: null,
        hospitalNameF: null,
        priceF: null
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

        <KeyboardAwareView animated={true}>
        <CardView
          style={styles.formCard}
          cardElevation={3}
          cardMaxElevation={3}
          cornerRadius={5}>
        <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>

        {
        <Image style={styles.cardImage} source={require('./res/1.jpg')} />
        }

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Test name"
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
              placeholder = "Date"
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
              underlineColorAndroid = "transparent"
              placeholder = "Hospital name"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>

            <TextInput style = {styles.input}
              underlineColorAndroid = "transparent"
              placeholder = "Price"
              placeholderTextColor = "#858585"
              autoCapitalize = "none"
              onChangeText = {null}/>
            
                </ScrollView>
            </View>
            </CardView>
            
            <View style={styles.buttonView}>
              <TouchableOpacity
                activeOpacity={.7}
                style = {styles.submitButton}
                onPress = {
                    null
                }>
                <Text style = {styles.submitButtonText}> SUBMIT </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.7}
                style = {styles.cancelButton}
                onPress = {
                    () => this.props.navigation.navigate('HomeScreen')
                }>
                <Text style = {styles.cancelButtonText}> CANCEL </Text>
              </TouchableOpacity>
            </View>

            </KeyboardAwareView>


    );
  }
}

const styles = StyleSheet.create({
    formCard: {
      flex:1,
      margin:"2%",
      marginTop:"2.5%",
      marginBottom: 0,
      backgroundColor:colors.secondary,
      elevation:5,
      borderRadius:5,
      paddingTop: 5,
    },
    buttonView: {
      flex:0,
      flexDirection:"row",
      justifyContent:"space-evenly",
    },
    cardImage: {
      width:"80%",
      height:220,
      marginBottom:2,
      alignSelf:"center",
      margin:10,
      marginBottom:15,
    },
    input: {
      margin: 15,
      height: 43,
      borderColor: '#e3e3e3',
      backgroundColor:"#f5f5f5",
      borderWidth: 1,
      borderRadius:3,
      paddingLeft:10,
      paddingRight:10,
      color: 'black'
    },
    submitButton: {
      width:"42%",
      backgroundColor: colors.secondary,
      padding: 10,
      margin: 15,
      height: 40,
      elevation:5,
      borderRadius:3
    },
    cancelButton: {
      width:"42%",
      backgroundColor: colors.primary,
      padding: 10,
      margin: 15,
      height: 40,
      elevation:5,
      borderRadius:3
    },
    submitButtonText:{
      color: 'black',
      fontWeight:"bold",
      textAlign:"center"
    },
    cancelButtonText:{
      color: 'white',
      fontWeight:"bold",
      textAlign:"center"
    },
    pageTitle: {
      fontSize:18,
      fontWeight:"bold",
      color:colors.secondary,
    },
  });
export default NewBill;
