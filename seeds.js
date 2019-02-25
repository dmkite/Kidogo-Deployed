import {SecureStore} from 'expo'
const user = {"password":"$2a$10$QZe3lJFmlu.mJ.E8dlblq.qrm0CobKtQEWcPJpG0pdCakWbSKXTdO","username":"username","f_name":"Dylan","l_name":"Kite","id":"e8951c55-79ab-4e6f-ab5c-b91dc0e2ae6d"}
const id = user.id


export default addData = async () => {
  let accts = await SecureStore.getItemAsync(`_ACCOUNTS_${id}`)
  if(accts){
    accts = JSON.parse(accounts)
    if(accts.length) return
  }
  
  const accounts = [
    {
      balance: 0,
      children: [
        {
          birthdate: '04-12-2014',
          f_name: 'Michael',
          gender: 'male',
          id: '1',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/a27b8406-699b-4b68-ab15-4e5942953414.jpg',
          l_name: 'Scott',
          notes: null
        }
      ],
      e_contacts: [
        {
          f_name: 'Ryan',
          l_name: 'Howard',
          phone: '55-555-5555',
          id:'2'
        }
      ],
      frequency: 'daily',
      guardians: [
        {
          street: '11 Taylor St.',
          city: 'Nashua',
          f_name: 'Holly',
          govt_id:'12345678',
          id:'3',
          l_name:'Flax',
          phone:'55-555-5555',
        }
      ],
      id:'4',
      rate:'150'
    },

    {
      balance: 1450,
      children: [
        {
          birthdate: '21-02-2012',
          f_name: 'Dwight',
          gender: 'male',
          id: '10',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/10f6af1f-5847-4c44-a497-33388fa318ec.jpg',
          l_name: 'Schrute',
          notes: 'Beets. Bears. Battlestar Galactica.'
        }
      ],
      e_contacts: [
        {
          f_name: 'Mose',
          l_name: 'Schrute',
          phone: '55-555-5555',
          id: '20'
        }
      ],
      frequency: 'weekly',
      guardians: [
        {
          street: '111 E. Jackson St.',
          city: 'Scranton',
          f_name: 'Angela',
          govt_id: '111111111',
          id: '30',
          l_name: 'Martin',
          phone: '55-555-5555',
        }
      ],
      id: '40',
      rate: '625'
    },
    {
      balance: 0,
      children: [
        {
          birthdate: '18-11-2017',
          f_name: 'Jim',
          gender: 'male',
          id: '100',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/ca39027a-1ee9-4ca8-b217-4dbfd4816eec.jpg',
          l_name: 'Halpert',
          notes: 'Watch out for pranks'
        },
        {
          birthdate: '07-04-2013',
          f_name: 'Tom',
          gender: 'male',
          id: '110',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/f6e09869-517b-4416-9dfc-f3ebb0bcff10.jpg',
          l_name: 'Halpert',
          notes: null
        },
        {
          birthdate: '13-02-2014',
          f_name: 'Pete',
          gender: 'male',
          id: '120',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/49574c90-bdd7-4de9-a1b3-8a0869d6105e.jpg',
          l_name: 'Halpert',
          notes: ''
        }
      ],
      e_contacts: [
        {
          f_name: 'Kevin',
          l_name: 'Malone',
          phone: '55-555-5555',
          id: '200'
        }
      ],
      frequency: 'termly',
      guardians: [
        {
          street: '2040 Gatepost Rd.',
          city: 'Scranton',
          f_name: 'Pam',
          govt_id: '12345678',
          id: '300',
          l_name: 'Halpert',
          phone: '55-555-5555',
        }
      ],
      id: '400',
      rate: '7500'
    },
    {
      balance: 3900,
      children: [
        {
          birthdate: '28-09-2015',
          f_name: 'Kelly',
          gender: 'male',
          id: '1000',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/083e0a6c-fc49-4c15-bee1-0fa9b92064ff.jpg',
          l_name: 'Kapoor',
          notes: ''
        }
      ],
      e_contacts: [
        {
          f_name: 'Toby',
          l_name: 'Flenderson',
          phone: '55-555-5555',
          id: '2000'
        }
      ],
      frequency: 'daily',
      guardians: [
        {
          street: '1300 Maryland Ave.',
          city: 'Scranton',
          f_name: 'Ryan',
          govt_id: '12345678',
          id: '3000',
          l_name: 'Howard',
          phone: '55-555-5555',
        }
      ],
      id: '4000',
      rate: '150'
    },
    {
      balance: 200,
      children: [
        {
          birthdate: '14-01-2015',
          f_name: 'Andy',
          gender: 'male',
          id: '10000',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/4ed708e2-6b92-4ac1-b673-ac7c208949a6.jpg',
          l_name: 'Bernard',
          notes: ''
        },
        {
          birthdate: '14-01-2016',
          f_name: 'Walter',
          gender: 'male',
          id: '11000',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/3aac7f08-be37-4398-85ed-0f2811e9afdd.jpg',
          l_name: 'Bernard',
          notes: ''
        }
      ],
      e_contacts: [
        {
          f_name: 'Phyllis',
          l_name: 'Vance',
          phone: '55-555-5555',
          id: '20000'
        }
      ],
      frequency: 'weekly',
      guardians: [
        {
          street: '650 Union St. Apt. 1',
          city: 'Scranton',
          f_name: 'Ellen',
          govt_id: '12345678',
          id: '30000',
          l_name: 'Bernard',
          phone: '55-555-5555',
        }
      ],
      id: '40000',
      rate: '575'
    },
    {
      balance: 0,
      children: [
        {
          birthdate: '24-10-2015',
          f_name: 'Gabe',
          gender: 'male',
          id: '100000',
          img_uri: 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/ImagePicker/5a105ffa-4648-4160-b898-29af57e54e4b.jpg',
          l_name: 'Lewis',
          notes: ''
        }
      ],
      e_contacts: [
        {
          f_name: 'Robert',
          l_name: 'California',
          phone: '55-555-5555',
          id: '200000'
        }
      ],
      frequency: 'termly',
      guardians: [
        {
          street: '1500 Mercer Ave.',
          city: 'Scranton',
          f_name: 'Jo',
          govt_id: '12345678',
          id: '300000',
          l_name: 'Lewis',
          phone: '55-555-5555',
        }
      ],
      id: '400000',
      rate: '9000'
    }
  ]

  const attendance = {
    '22-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '21-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '20-02-2019': {
      '1':{
        acctId:'4',
        checkIn:false,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: false,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: false,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '19-02-2019': {
      '1':{
        acctId:'4',
        checkIn:false,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '18-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: false,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: false,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: false,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '16-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '15-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: false,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: false,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '14-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '13-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: false,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: false,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    },
    '12-02-2019': {
      '1':{
        acctId:'4',
        checkIn:123543,
        checkOut:false,
        f_name:'Michael',
        l_name:'Scott',
        id:'1',
        img_uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FKidogo-b4e6163c-0f9c-4fc1-aa4c-c6ad3ecc2e09/Camera/9074ecf8-7b47-48ec-bc07-22b9230b50fd.jpg',
      },
      '10': {
        acctId: '40',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Dwight',
        l_name: 'Schrute',
        id: '10',
        img_uri: null
      },
      '10': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Jim',
        l_name: 'Halpert',
        id: '100',
        img_uri: null
      },
      '110': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Tom',
        l_name: 'Halpert',
        id: '110',
        img_uri: null
      },
      '120': {
        acctId: '400',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Pete',
        l_name: 'Halpert',
        id: '120',
        img_uri: null
      },
      '1000': {
        acctId: '4000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Kelly',
        l_name: 'Kapoor',
        id: '1000',
        img_uri: null
      },
      '10000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Andy',
        l_name: 'Bernard',
        id: '10000',
        img_uri: null
      },
      '11000': {
        acctId: '40000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Walter',
        l_name: 'Bernard',
        id: '11000',
        img_uri: null
      },
      '100000': {
        acctId: '400000',
        checkIn: 123543,
        checkOut: false,
        f_name: 'Gabe',
        l_name: 'Lewis',
        id: '100000',
        img_uri: null
      }
    }
  }

  const payments = {
    '4':[
      {
        amount: 150,
        balanceAfter: 150,
        balanceBefore: 0,
        date: '20-02-2019'
      },
      {
        amount: 150,
        balanceAfter: 300,
        balanceBefore: 150,
        date: '21-02-2019'
      },
      {
        amount: 150,
        balanceAfter: 450,
        balanceBefore: 300,
        date: '22-02-2019'
      },
      {
        amount: 150,
        balanceAfter: 600,
        balanceBefore: 450,
        date: '23-02-2019'
      },
      {
        amount: 450,
        balanceAfter: 0,
        balanceBefore: 450,
        date: '23-02-2019'
      },
    ],
    '40': [
        {
          amount:625,
          balanceAfter: 2075,
          balanceBefore:1450,
          date:'20-02-2019'
        },
        {
          amount:325,
          balanceAfter: 1750,
          balanceBefore:625,
          date:'21-02-2019'
        },
        {
          amount:300,
          balanceAfter: 1450,
          balanceBefore:300,
          date:'23-02-2019'
        }
      ],
    '400': [
        {
          amount:7500,
          balanceAfter: 7500,
          balanceBefore:0,
          date:'26-11-2018'
        },
        {
          amount:7500,
          balanceAfter: 0,
          balanceBefore:7500,
          date:'26-01-2019'
        }
      ],
    '4000': [
        {
          amount:150,
          balanceAfter: 4050,
          balanceBefore:3900,
          date:'22-02-2019'
        },
        {
          amount:150,
          balanceAfter: 3900,
          balanceBefore:4050,
          date:'23-02-2019'
        }
      ],
    '40000': [
        {
          amount:575,
          balanceAfter: 575,
          balanceBefore:0,
          date:'14-02-2019'
        },
        {
          amount:575,
          balanceAfter: 1150,
          balanceBefore:575,
          date:'21-02-2019'
        },
        {
          amount:950,
          balanceAfter: 200,
          balanceBefore:1150,
          date:'22-02-2019'
        }
      ],
    '400000': [
        {
          amount:9000,
          balanceAfter: 9000,
          balanceBefore:0,
          date:'26-11-2018'
        },
        {
          amount:9000,
          balanceAfter: 0,
          balanceBefore:9000,
          date:'03-02-2019'
        }
      ]
  }
  await SecureStore.setItemAsync('_CAREGIVERS', JSON.stringify({'username': user}))
  await SecureStore.setItemAsync(`_ACCOUNTS_${id}`, JSON.stringify(accounts))
  await SecureStore.setItemAsync(`_ATTENDANCE_${id}`, JSON.stringify(attendance))
  await SecureStore.setItemAsync(`_PAYMENTS_${id}`, JSON.stringify(payments))
}

