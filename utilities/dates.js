import dateMath from 'date-arithmetic'

export default class Dates {
  constructor(){}
  date = new Date()

  getToday = () => {
      const self = this
      return `${self.date.getDate() < 10 ? '0' + self.date.getDate() : self.date}-${Number(self.date.getMonth()) + 1 < 10 ? '0' + Number((self.date.getMonth()) + 1) : Number(self.date.getMonth()) + 1}-${self.date.getFullYear()}`
  }  

  getDifferentDay = (addOrSub, date) => {
    const self = this
    if(date){
      const day = Number(date.substring(0,2))
      const month = Number(date.substring(3,5)) - 1
      const year = Number(date.substring(6))
      date = new Date(year, month, day)
    }
    else{
      const today = self.getToday()
      const day = Number(today.substring(0, 2))
      const month = Number(today.substring(3, 5)) - 1
      const year = Number(today.substring(6))
      date = new Date(year, month, day)
    }   
    
    let previousDay = dateMath[addOrSub](date, 1, 'day')
    const month = previousDay.getMonth()
    const day = previousDay.getDate()
    const year = previousDay.getFullYear()
    previousDay = self.constructDate(day, month, year)
    return previousDay
    // console.log( `${previousDay.substring(7,9)}-${previousDay.substring(5,7)}-${previousDay.substring(0,4)}`)
  }

  constructDate = (day, month, year) => {
    return `${Number(day) < 10 ? '0' + day : day}-${Number(month) + 1 < 10 ? '0' + Number((month) + 1) : Number(month) + 1}-${year}`
  }
}