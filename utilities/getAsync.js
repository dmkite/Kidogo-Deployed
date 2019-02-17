import {SecureStore} from 'expo'

export default getAsync = async (payments, accounts, attendance, finances, caregivers, centres) => {
  let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
  signedIn  = JSON.parse(signedIn)
  let time
  if(signedIn){
    time = signedIn.time
  }
  if(!time || Date.now() - time > 60480) console.log('reset')
  const dataObj = {}

  if (payments) {
    let payments = await SecureStore.getItemAsync('_PAYMENTS')
    if (!payments) payments = {}
    else payments = JSON.parse(payments)
    const newPayments = { ...payments }
    dataObj.newPayments = newPayments
  }
  if (accounts) {
    let accounts = await SecureStore.getItemAsync('_ACCOUNTS')
    if (!accounts) accounts = []
    else accounts = JSON.parse(accounts)
    const newAccounts = [...accounts]
    dataObj.newAccounts = newAccounts
  }
  if (attendance) {
    let attendance = await SecureStore.getItemAsync('_ATTENDANCE')
    if (!attendance) attendance = {}
    else attendance = JSON.parse(attendance)
    const newAttendance = { ...attendance }
    dataObj.newAttendance = newAttendance
  }

  if(finances){
    let finances = await SecureStore.getItemAsync('_FINANCES')
    if (!finances) finances = {}
    else finances = JSON.parse(finances)
    const newFinances = { ...finances }
    dataObj.newFinances = newFinances
  }

  if(caregivers){
    let caregivers = await SecureStore.getItemAsync('_CAREGIVERS')
    if (!caregivers) caregivers = {}
    else caregivers = JSON.parse(caregivers)
    const newCaregivers = { ...caregivers }
    dataObj.newCaregivers = newCaregivers
  }

  if (centres) {
    let centres = await SecureStore.getItemAsync('_CENTRES')
    if (!centres) centres = []
    else centres = JSON.parse(centres)
    const newCentres = [ ...centres ]
    dataObj.newCentres = newCentres
  }

  return dataObj
}