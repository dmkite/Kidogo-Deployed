import {SecureStore} from 'expo'

export default addData = async () => {
  const accounts = [
    {
      balance: 1000,
      children: [
        {
          birthdate: '01-12-1992',
          f_name: 'Dylan',
          gender: 'male',
          id: '1',
          img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
          l_name: 'Kite',
          notes: null
        }
      ],
      e_contacts: [
        {
          f_name: 'Robert',
          l_name: 'Kite',
          phone: '22-222-2222',
          id:'2'
        }
      ],
      frequency: 'daily',
      guardians: [
        {
          street: '123 Kenyata Ave',
          city: 'Nairobi',
          f_name: 'Lisa',
          govt_id:'111111111',
          id:'3',
          l_name:'Kite',
          phone:'11-111-1111',
        }
      ],
      id:'4',
      rate:'150'
    },

    {
      balance: 0,
      children: [
        {
          birthdate: '21-02-2002',
          f_name: 'Gretta',
          gender: 'female',
          id: '10',
          img_uri: null,
          l_name: 'Green',
          notes: null
        }
      ],
      e_contacts: [
        {
          f_name: 'Mercy',
          l_name: 'Maina',
          phone: '22-222-2222',
          id: '20'
        }
      ],
      frequency: 'weekly',
      guardians: [
        {
          street: '123 Kenyata Ave',
          city: 'Nairobi',
          f_name: 'Betty',
          govt_id: '111111111',
          id: '30',
          l_name: 'Green',
          phone: '11-111-1111',
        }
      ],
      id: '40',
      rate: '625'
    }
  ]

  const attendance = {
    '07-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Dylan',
        l_name:'Kite',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gretta',
        l_name: 'Green',
        id: '10',
        img_uri: null
      }
    },
    '08-02-2019': {
      '1': {
        acctId: '4',
        checkIn: 143543,
        checkOut: false,
        f_name: 'Dylan',
        l_name: 'Kite',
        id: '1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: false,
        checkOut: false,
        f_name: 'Gretta',
        l_name: 'Green',
        id: '10',
        img_uri: null
      }
    }
  }

  const payments = {
    '4':[
      {
        amount: 500,
        balanceAfter: 1000,
        balanceBefore: 1500,
        date: '06-02-2019'
      },
    ],
    '40': [
        {
          amount:650,
          balanceAfter: 0,
          balanceBefore:650,
          date:'02-02-2019'
        }
      ]
  }

  await SecureStore.setItemAsync('_ACCOUNTS', JSON.stringify(accounts))
  await SecureStore.setItemAsync('_ATTENDANCE', JSON.stringify(attendance))
  await SecureStore.setItemAsync('_PAYMENTS', JSON.stringify(payments))

  console.log('the deed is done, my lord')
}

