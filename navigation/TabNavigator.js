import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Transaction from "../screens/Transaction";
import Search from "../screens/Search";
import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        var iconName
        if (route.name == "Transaction") {
          iconName = focused ? "book" : 'book-outline'
        } else if (route.name == "Search") {
          iconName = focused ? "search" : 'search-outline'
        }
        return (
          <Ionicons name={iconName} size={size} color={color} />
        )
      }
    })}
      tabBarOptions ={ {
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#5653D4',
        },
      }}

    

    >
      <Tab.Screen name="Transaction" component={Transaction} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}


