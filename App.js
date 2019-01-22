import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store'
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import DashBoard from './screens/DashBoard';


const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Dash: {screen: DashBoard}
})

const AppContainer = createAppContainer(AppNavigator)

function App(){
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  )
}

export default App;
