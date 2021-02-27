import React, { Component } from "react";
import { createStackNavigator,CardStyleInterpolators,HeaderStyleInterpolators  } from "@react-navigation/stack";

import LoginScreen from "./Login/LoginScreen";
import PersonalInfoScreen from './Login/PersonalInfoScreen';
import HomeScreen from "./Home/HomeScreen";
import AllBills from "./Bills/AllBills";
import NewBill from "./Bills/NewBill";
import ProfileScreen from "./Profile/ProfileScreen";

import DrawerContent from "./Drawer/DrawerContent"

const Stack = createStackNavigator();

class Navigation extends Component {
  render() {
    return (
      <>
        <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AllBills" component={AllBills} />
          <Stack.Screen name="NewBill" component={NewBill} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />

          <Stack.Screen name="DrawerContent" component={DrawerContent} />
        </Stack.Navigator>
      </>
    );
  }
}

export default Navigation;
