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

import Icon from 'react-native-vector-icons/FontAwesome';

class NotificationModal extends Component {

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
      animationIn='slideInUp'
      animationInTiming={300}
      animationOut= 'slideOutDown'
      animationOutTiming={300}
      backdropTransitionOutTiming={0}
      backdropTransitionOutTiming={0}
      backdropOpacity={0.7}
      backdropColor="black"
      scrollHorizontal={true}
      onBackButtonPress={() => closeModal()}
    >
      <View style={styles.innerModalView}>
        <View style={styles.topBar}>
          <Text style={styles.modalTitle}>Notifications</Text>
          <TouchableOpacity style={styles.buttonOuterLayout} activeOpacity={.7} onPress={closeModal}>
            <Icon name="close" size={25} color="black" style={{paddingBottom:2,paddingLeft:3}}/>
          </TouchableOpacity>
        </View>
          <View>
          

        </View>
      </View>
    </Modal>
  );
  }
};


const styles = StyleSheet.create({
  innerModalView: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 0,
    paddingBottom: 20,
    borderRadius: 7,
    marginTop: 30,
    marginBottom: 30,
  },
  topBar:{
    width:"100%",
    padding:20,
    flexDirection: "row",
    justifyContent:"space-between",
    paddingBottom:10,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1
  },
  buttonOuterLayout:{
    padding:5,
    paddingTop:0
  },
  modalTitle: {
    width:"80%",
    color: "red",
    fontSize:16,
    fontWeight:"bold",
  },
});

export default NotificationModal;