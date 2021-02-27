import React, { Component } from "react";
import { createStackNavigator,CardStyleInterpolators,HeaderStyleInterpolators  } from "@react-navigation/stack";

import Login from "./Login";
import PersonalInfoScreen from './PersonalInfoScreen';
import HomeScreen from "./HomeScreen";
import AllBills from "../AllBills";
import NewBill from "../NewBill/NewBill";

const Stack = createStackNavigator();

class HomeScreenNavigation extends Component {
  render() {
    return (
      <>
        <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="AllBills" component={AllBills} />
          <Stack.Screen name="NewBill" component={NewBill} />
        </Stack.Navigator>
      </>
    );
  }
}

export default HomeScreenNavigation;
