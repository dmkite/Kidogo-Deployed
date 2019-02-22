import dateMath from 'date-arithmetic'

export default class Dates {
  constructor(){}
  date = new Date()
  
  getToday = () => {
      const self = this
      const result = `${self.date.getDate() < 10 ? '0' + self.date.getDate() : self.date.getDate()}-${Number(self.date.getMonth()) + 1 < 10 ? '0' + Number((self.date.getMonth()) + 1) : Number(self.date.getMonth()) + 1}-${self.date.getFullYear()}`
      return result
  }  
  
  getMonth = () => {
    const self = this
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][self.date.getMonth()]
  }

  getDay = () => {
    const self = this
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][self.date.getDay()]
  }

  getYear = () => {
    const self = this
    return self.date.getFullYear()
  }

  getDate = () => {
    const self = this
    return self.date.getDate()
  }

  getDifferentDay = (addOrSub, date, amt = 1) => {
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
    
    let previousDay = dateMath[addOrSub](date, amt, 'day')
    const month = previousDay.getMonth()
    const day = previousDay.getDate()
    const year = previousDay.getFullYear()
    previousDay = self.constructDate(day, month, year)
    return previousDay
  }

  
  constructDate = (day, month, year) => {
    return `${Number(day) < 10 ? '0' + day : day}-${Number(month) + 1 < 10 ? '0' + Number((month) + 1) : Number(month) + 1}-${year}`
  }

  compareDates = (date1, date2) => {
    const [d1, m1, y1] = date1.split('-')
    const [d2, m2, y2] = date2.split('-')
    date1 = new Date( Number(y1), Number(m1) - 1, Number(d1))
    date2 = new Date(Number(y2), Number(m2) - 1, Number(d2))
    return dateMath.diff(date2, date1, 'day')
  }
}