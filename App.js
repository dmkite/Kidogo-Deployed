import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import store from './store'
import {Provider} from 'react-redux'
import HomeScreen from './screens/HomeScreen'
import DashBoard from './screens/DashBoard';
import Enrollment from './screens/Enrollment'
import CameraScreen from './screens/CameraScreen'
import Accounts from './screens/Accounts'
import Account from './screens/Account'
import EditMember from './screens/EditMember'
import Attendance from './screens/Attendance'
import AttendanceHistory from './screens/AttendanceHistory'
import CheckIn from './screens/CheckIn'
import CheckOut from './screens/CheckOut'
import Payments from './screens/Payments'

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Dash: DashBoard,
  Enrollment: Enrollment,
  Camera: CameraScreen,
  CheckIn: CheckIn,
  CheckOut: CheckOut,
  Accounts: Accounts,
  Account: Account,
  EditMember: EditMember,
  Attendance: Attendance,
  AttendanceHistory: AttendanceHistory,
  Payments: Payments
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
