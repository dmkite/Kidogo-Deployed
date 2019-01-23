import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store'
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import DashBoard from './screens/DashBoard';
import Enrollment from './screens/Enrollment'


const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Dash: DashBoard,
  Enrollment: Enrollment
},
{
  initialRouteName: 'Home'
}
)

const AppContainer = createAppContainer(AppNavigator)

function App(){
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  )
}

export default App;
