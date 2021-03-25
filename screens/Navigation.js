import React, { Component } from "react";
import { createStackNavigator,CardStyleInterpolators,HeaderStyleInterpolators  } from "@react-navigation/stack";

import LoginScreen from "./Login/LoginScreen";
import HomeScreen from "./Home/HomeScreen";
import OldBills from "./Bills/OldBills";
import AllBills from "./Bills/AllBills";
import ProfileScreen from "./Profile/ProfileScreen";
import DetailedScreen from "./Detailed/DetailedScreen";
import BillDataFileScreen from "./Detailed/BillDataFileScreen";

import DrawerContent from "./Drawer/DrawerContent"

const Stack = createStackNavigator();

class Navigation extends Component {
  render() {
    return (
      <>
        <Stack.Navigator 
        initialRouteName={"LoginScreen"}
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="OldBills" component={OldBills} />
          <Stack.Screen name="AllBills" component={AllBills} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="DetailedScreen" component={DetailedScreen} />
          <Stack.Screen name="BillDataFileScreen" component={BillDataFileScreen} />

          <Stack.Screen name="DrawerContent" component={DrawerContent} />
        </Stack.Navigator>
      </>
    );
  }
}

export default Navigation;
