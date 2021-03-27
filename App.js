import React, { Component } from "react";
import { createStackNavigator,CardStyleInterpolators,HeaderStyleInterpolators  } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/Login/LoginScreen";
import DrawerNavigation from './screens/DrawerNavigation';

const Stack = createStackNavigator();

//For Warnings
//LogBox.ignoreLogs(['Warning:']);
//console.reportErrorsAsExceptions = false;


class App extends Component{
  render (){
    return(
    <NavigationContainer>

      <Stack.Navigator 
        initialRouteName={"LoginScreen"}
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="MainScreen" component={DrawerNavigation} />
      </Stack.Navigator>

  </NavigationContainer>
    )  
}
};


export default App;
