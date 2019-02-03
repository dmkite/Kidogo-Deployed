import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store'
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import DashBoard from './screens/DashBoard';
import Enrollment from './screens/Enrollment'
import CameraScreen from './screens/CameraScreen'
import CheckIn from './screens/CheckIn'
import CheckOut from './screens/CheckOut'
import Accounts from './screens/Accounts'
import Account from './screens/Account'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Dash: DashBoard,
  Enrollment: Enrollment,
  Camera: CameraScreen,
  CheckIn: CheckIn,
  CheckOut: CheckOut,
  Accounts: Accounts,
  Account: Account
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
