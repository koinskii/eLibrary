import React from 'react';
import TabNavigator from './navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/login';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Rajdhani_600SemiBold } from "@expo-google-fonts/rajdhani";
import * as Font from "expo-font";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      Rajdhani_600SemiBold: Rajdhani_600SemiBold
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    const { fontLoaded } = this.state;
    if (fontLoaded) {
      return(
        <NavigationContainer>
          <AppContainer/>
        </NavigationContainer>
      )
    }
    return null;
  }}
const AppSwitchNavigator = createSwitchNavigator({
  Login:{screen: Login},
  BottonTab:{screen: TabNavigator}

},
{initialRouteName:'Login'}
)

const AppContainer = createAppContainer(AppSwitchNavigator)
