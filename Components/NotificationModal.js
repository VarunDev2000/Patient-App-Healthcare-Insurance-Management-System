import React, { Component } from "react";
import Modal from "react-native-modal";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import colors from "../config/colors";

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

class NotificationModal extends Component {

  render() {
  const closeModal = () => {
    this.props.closeModal();
  };

  const notificationItem = ({ item }) => (
    <TouchableOpacity activeOpacity={.8} onPress={() => null} style={styles.notificationCard}>
      <View style={{flex:1,flexDirection:"row",padding:15}}>
        <Icon1 name="blood-test" size={18} color="black" style={{marginRight:10}}/>
        <Text numberOfLines={1} style={{width:"20%"}}>{item.testname}</Text>
        <Icon name="rupee" size={18} color="black" style={{marginLeft:"10%",marginRight:5,marginTop:1}}/>
        <Text numberOfLines={1} style={{width:"20%"}}>{item.price}</Text>
      </View>
      <View style={{flex:0.4,width:"30%",flexDirection:"row",borderTopRightRadius:5,borderBottomRightRadius:5,padding:25,justifyContent:"center",alignItems:"center",color:"white",backgroundColor: item.status == 1 ? ("green") : ("#d93030")}}>
        {
          item.status == 1 ? (
            <Icon3 name="checkmark-circle" size={23} color="white" style={{marginRight:5}}/>
          ) : (
            <Icon4 name="cancel" size={23} color="white" style={{marginRight:5}}/>
          )
        }
        <Text numberOfLines={1} style={{color:"white"}}>{item.status == 1 ? ("Accepted") : ("Rejected")}</Text>
      </View>
    </TouchableOpacity>
  );

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
      backdropOpacity={0.2}
      backdropColor={colors.primary}
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
        <FlatList
          contentContainerStyle={styles.bottomLayout}
          data={this.props.data}
          renderItem={notificationItem}
          keyExtractor={item => item.id}
        />
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
    paddingBottom: 0,
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
  bottomLayout: {
    flex:1,
    backgroundColor: "#f5f5f5",
  },
  notificationCard:{
    flex:0,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
    alignItems:"center",
    elevation:5,
    backgroundColor:"white",
    margin:10,
    marginTop:5,
    marginBottom:5,
    borderRadius:5
  },
  modalTitle: {
    width:"80%",
    color: colors.primary,
    fontSize:17,
    fontWeight:"bold",
  },
});

export default NotificationModal;