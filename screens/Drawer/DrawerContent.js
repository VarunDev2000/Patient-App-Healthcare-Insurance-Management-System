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


class DrawerContent extends Component {

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
        const jsonValue2 = JSON.stringify(false)
        //await AsyncStorage.setItem("account", jsonValue1)
        await AsyncStorage.setItem("loggedIn", jsonValue2)

      } catch (e) {
        console.error("Cannot store data to storage")
      }
    }


    render() {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...this.props}>
            <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row'}}>
                            <Avatar.Image 
                                source={
                                    require('./res/user1.png')
                                }
                                size={60}
                                style={{marginTop:0,backgroundColor:"white"}}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Patient 1</Title>
                                <Caption style={styles.caption}>(+91) 9876543210</Caption>
                            </View>
                        </View>


                        <View style={[styles.section,{marginTop:20}]}>
                            <Caption style={[styles.caption,{fontWeight:"normal"}]}>Total bills applied : </Caption>
                            <Paragraph style={[styles.paragraph, styles.caption]}>5</Paragraph>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Caption style={[styles.caption,{color:"green",fontWeight:"bold"}]}>Accepted : </Caption>
                                <Paragraph style={[styles.paragraph, styles.caption,{fontWeight:"bold"}]}>2</Paragraph>
                            </View>
                            <View style={styles.section}>
                                <Caption style={[styles.caption,{color:"#c9c930",fontWeight:"bold"}]}>Waiting : </Caption>
                                <Paragraph style={[styles.paragraph, styles.caption]}>1</Paragraph>
                            </View>
                        </View>
                        <View style={[styles.section,{marginBottom:0}]}>
                            <Caption style={[styles.caption,{color:"red",fontWeight:"bold"}]}>Rejected : </Caption>
                            <Paragraph style={[styles.paragraph, styles.caption]}>2</Paragraph>
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