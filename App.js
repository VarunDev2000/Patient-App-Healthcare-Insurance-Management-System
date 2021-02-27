import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import HomeScreenNavigation from "./screens/Navigation";

const Drawer = createDrawerNavigator();



class App extends Component{
  render (){
    return(
    <NavigationContainer>
    <Drawer.Navigator 
    drawerContentOptions={{
      activeTintColor: "black",
      activeBackgroundColor: "rgba(0, 0, 0, 0.18)",
    }}
    drawerStyle={{
      width: "55%",
    }}>
      <Drawer.Screen
        name="HomeScreenNavigation"
        component={HomeScreenNavigation}
        options={{ 
          drawerLabel: "Home"
         }}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ 
          drawerLabel: "My Profile"
         }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
    )  
}
};


export default App;
