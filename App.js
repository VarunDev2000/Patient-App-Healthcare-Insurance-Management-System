import React, { Component } from "react";
import { Text, LogBox, StatusBar } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import Navigation from "./screens/Navigation";
import LoginScreen from "./screens/Login/LoginScreen";

import DrawerContent from './screens/Drawer/DrawerContent';

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

//For Warnings
//LogBox.ignoreLogs(['Warning:']);
//console.reportErrorsAsExceptions = false;


class App extends Component{
  render (){
    return(
    <NavigationContainer>
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
  </NavigationContainer>
    )  
}
};


export default App;
