import React, { Component } from "react";
import { View, StyleSheet,Alert,Text } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Octicons';
import { acc } from "react-native-reanimated";
import Loader from "../../Components/Loader";


class DrawerContent extends Component {

    state = {
      account : "",
      pdata : [],
      data : [],

      loadervisible : true,

      patient_name : "-",
      number : "-",
      total_bills : 0,
      accepted : 0,
      rejected : 0,
      waiting : 0
    }

    componentDidMount(){
      this.getAndPrepareData();
    }

    prepareBillData = () =>{
      let data = this.state.data.reverse();
      let account = this.state.account;
      let waiting = 0
      let accepted = 0
      let rejected = 0

      this.setState({
        total_bills : data.length
      })

      for(var i = 0; i < data.length; i++){
        if(data[i][7] === account){

          if(data[i][8] == 0){
            waiting = waiting + 1;
          }
          else if(data[i][8] == 1){
            accepted = accepted + 1; 
          }
          else if(data[i][8] == 2){
            rejected = rejected + 1; 
          }
      }

      this.setState({
        waiting : waiting,
        accepted : accepted,
        rejected : rejected,

        loadervisible : false,
      }) 
    }
    }

    preparePData = () =>{
      let data = this.state.pdata;

      this.setState({
        patient_name : data[1],
        number : data[0]
      })
    }

    getAndPrepareData = async () => {
      try {
        const account = await AsyncStorage.getItem("account")

        this.setState({
          account : JSON.parse(account)
        },
          function() {
            this.getPData()
          }
        )
      } catch(e) {
        this.setState({
          error : e
        })
        console.error("Cannot fetch data from storage " + e)
      }
    }

    getPData = () =>{
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: this.state.account,
        })
      };

      fetch(`${CREDENTIALS.BASE_URL}/api/pdetails`, config)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({
          pdata : res
        },
          function() {
            this.getBillData()
            this.preparePData()
          }
        )
        //console.log(res)
      })
      .catch((err) => {
        console.log('err', err.message)
      })
    }

    getBillData = () =>{
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          account: this.state.account,
        })
      };

      fetch(`${CREDENTIALS.BASE_URL}/api/account_bill_data`, config)
      .then((resp) => resp.json())
      .then((res) => {
        this.setState({
          data : res
        },
          function() {
            this.prepareBillData()
          }
        )
        //console.log(res)
      })
      .catch((err) => {
        console.log('err', err.message)
      })
    }


    logOutModalPopup = () => {
      Alert.alert("Log Out", "Are you sure you want to log out?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", 
          onPress: () => this.logOut().then(this.props.navigation.navigate("LoginScreen", { token: '<new token>' }))
        }
      ]);
      return true;
    }

    logOut = async () => {
      //Store in local storage
      try {
        //const jsonValue1 = JSON.stringify("")
        //await AsyncStorage.setItem("account", jsonValue1)

        const jsonValue2 = JSON.stringify(false)
        await AsyncStorage.setItem("loggedIn", jsonValue2)

      } catch (e) {
        console.error("Cannot store data to storage")
      }
    }


    render() {
      if(this.state.loadervisible == true){
        return <Loader value = "Loading" />
      }
      else{
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView {...this.props}>
                <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row'}}>
                                <Avatar.Image 
                                    source={
                                        require('./res/user1.jpg')
                                    }
                                    size={60}
                                    style={{marginTop:0,backgroundColor:"white"}}
                                />
                                <View style={{marginLeft:15, flexDirection:'column'}}>
                                    <Title style={styles.title}>{this.state.patient_name}</Title>
                                    <Caption style={styles.caption}>{"(+91) " + this.state.number}</Caption>
                                </View>
                            </View>


                            <View style={[styles.section,{marginTop:20}]}>
                                <Caption style={[styles.caption,{fontWeight:"normal"}]}>Total bills applied : </Caption>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{this.state.total_bills}</Paragraph>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>
                                    <Caption style={[styles.caption,{color:"green",fontWeight:"bold"}]}>Accepted : </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption,{fontWeight:"bold"}]}>{this.state.accepted}</Paragraph>
                                </View>
                                <View style={styles.section}>
                                    <Caption style={[styles.caption,{color:"#c9c930",fontWeight:"bold"}]}>Waiting : </Caption>
                                    <Paragraph style={[styles.paragraph, styles.caption]}>{this.state.waiting}</Paragraph>
                                </View>
                            </View>
                            <View style={[styles.section,{marginBottom:0}]}>
                                <Caption style={[styles.caption,{color:"red",fontWeight:"bold"}]}>Rejected : </Caption>
                                <Paragraph style={[styles.paragraph, styles.caption]}>{this.state.rejected}</Paragraph>
                            </View>
                        </View>
                        
                        <DrawerItemList {...this.props} />
                        
                        </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                            <Icon 
                            name="sign-out" 
                            color="black"
                            size={20}
                            />
                        )}
                        label= {config => <Text>Sign Out</Text>}
                        onPress={() => this.logOutModalPopup()}
                    />
                </View>
            </View>
        );
      }
  }
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      backgroundColor:"white",
      paddingLeft: 15,
      paddingTop: 13,
      paddingBottom: 20,
      borderBottomColor: '#f4f4f4',
      borderBottomWidth: 1
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 15
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    bottomDrawerSection: {
        marginBottom: 0,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

export default DrawerContent;