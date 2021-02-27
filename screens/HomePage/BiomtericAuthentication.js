import React, { Component } from "react";
import { SafeAreaView, Dimensions, View, LogBox,
  Text, TouchableOpacity, StyleSheet, StatusBar, TextInput,  Image, BackHandler  } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import { ScrollView } from "react-native-gesture-handler";
import colors  from "../../config/colors";

import BiometricAuthenticationModal from '../../Components/BiometricAuthenticationModal';
import HomeScreen from './HomeScreen';
import PersonalInfoScreen from './PersonalInfoScreen';

LogBox.ignoreLogs(['Warning: ...']);

class BiomtericAuthentication extends Component {

    state = {
        height: Dimensions.get("screen").height,

        infoAdded : false,
        isModalVisible : false,
    }

    componentDidMount() {
        this.setState({
            isModalVisible:true
        })
      }

  render() {

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
      
    const closeModal = (val) => {
        this.setState({
            isModalVisible : false
        })
        this.props.navigation.goBack()
      };

    return (
        <View style={{flex:1}}>
            <BiometricAuthenticationModal
            isModalVisible={this.state.isModalVisible}
            closeModal={() => closeModal()}
            bioMetricAuthenticated={() => bioMetricAuthenticated()}
            />
        </View>
    );
  }
}

export default BiomtericAuthentication;
