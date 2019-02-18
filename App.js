import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert} from 'react-native';
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
import Finances from './screens/Finances'
import Questions from './screens/Questions'
import Signup from './screens/Signup'
import Upload from './screens/Upload'
import {Notifications} from 'expo'
import Amplify, {Auth, API} from 'aws-amplify'
import awsmobile from './aws-exports'
// import Auth from '@aws-amplify/auth'
import awsconfig from './aws-exports'

Auth.configure(awsconfig)
Amplify.configure(awsmobile)

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Dash: DashBoard,
  Camera: CameraScreen,
  CheckIn: CheckIn,
  CheckOut: CheckOut,
  Accounts: Accounts,
  Account: Account,
  EditMember: EditMember,
  Attendance: Attendance,
  AttendanceHistory: AttendanceHistory,
  Payments: Payments,
  Finances: Finances,
  Questions: Questions,
  Signup: Signup,
  Enrollment: Enrollment,
  Upload: Upload
},

{
  initialRouteName: 'Home'
}
)

const AppContainer = createAppContainer(AppNavigator)

class App extends Component{
  async componentDidMount(){
    const morningNotification = {
      title: 'Time to Answer Questions',
      body: 'There are 2 questions for you to answer this morning',
      android: {
        sound: true, color: '#624', priority: 'max', vibrate: true
      }
    }
    const t = new Date()
    if(t.getHours() >= 8) t.setDate(t.getDate() + 1)
    t.setSeconds(0)
    t.setMinutes(0)
    t.setHours(8)

    const morningOptions = {
      time: t,
      repeat: 'day'
    }

    const afternoonNotification = {
      title: 'Time to Answer Questions',
      body: 'There are 2 questions for you to answer this afternoon',
      android: {
        sound: true, color: 'red', priority: 'max', vibrate: true
      }
    }
    
    const t2 = new Date()

    if (t2.getHours() >= 15) t2.setDate(t2.getDate() + 1)
    t2.setSeconds(0)
    t2.setMinutes(0)
    t2.setHours(15)
    
    const afternoonOptions = {
      time: t2,

      repeat: 'day'

    }

    Notifications.scheduleLocalNotificationAsync(morningNotification, morningOptions)
    Notifications.scheduleLocalNotificationAsync(afternoonNotification, afternoonOptions)
    Notifications.dismissAllNotificationsAsync()

  }

  listenForNotifications = () => {
    Notifications.addListener(notification => {

      if (notification.origin === 'received') Alert.alert('It\'s time to answer the daily questions');
      else if (notification.origin === 'selected') this.props.navigation.navigate('Questions')
    });
  };

  componentWillMount(){
    this.listenForNotifications()

  }


  render(){
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App;
