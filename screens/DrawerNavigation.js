import React, { Component } from "react";
import { Text } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";

import DrawerContent from './Drawer/DrawerContent';
import Navigation from "./Navigation";
import ProfileScreen from "./Profile/ProfileScreen";

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();


class DrawerNavigation extends Component{
  render (){
    return(
    <Drawer.Navigator 
      edgeWidth={0}
      drawerContentOptions={{
        activeTintColor: "black",
        activeBackgroundColor: "rgba(0, 0, 0, 0.18)",
      }}
      drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
            name="Navigation"
            component={Navigation}
            options={{ 
            drawerLabel: config => <Text>Home</Text>,
            drawerIcon: config => <Icon1 size={20} name= {'home'}></Icon1>
            }}
        />
        <Drawer.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ 
            drawerLabel: config => <Text>My Profile</Text>,
            drawerIcon: config => <Icon2 size={17} name= {'user-alt'}></Icon2>
            }}
        />
    </Drawer.Navigator>
    )  
}
};


export default DrawerNavigation;
