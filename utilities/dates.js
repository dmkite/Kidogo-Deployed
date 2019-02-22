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

  getSpan = (dateMod) => {
    const self = this
    const year = self.date.getFullYear()
    const month = self.date.getMonth()
    const day = self.date.getDate()
    const dayOfWeek = self.date.getDay()
    let today = new Date(year, month, day)
    if (dateMod < 0) dateMod = -dateMod
    today = dateMath.subtract(today, dateMod, 'day')
    const upper = dateMath.add(today, 6 - dayOfWeek, 'day')
    const lower = dateMath.subtract(today, dayOfWeek, 'day')
    const endSpan = []
    let endDate = upper.getDate()
    while (endDate > 0 && endSpan.length < 7) {
      let day = endDate < 10 ? '0' + endDate : endDate
      let month = upper.getMonth() + 1 < 10 ? '0' + (upper.getMonth() + 1) : upper.getMonth() + 1
      let year = upper.getFullYear()
      endSpan.unshift(`${day}-${month}-${year}`)
      endDate--
    }
    if (endSpan.length === 7) return endSpan
    else {
      let startDateLength = 7 - endSpan.length
      let startDate = lower.getDate()
      let startSpan = []
      while (startSpan.length !== startDateLength) {
        let day = startDate < 10 ? '0' + startDate : startDate
        let month = lower.getMonth() + 1 < 10 ? '0' + (lower.getMonth() + 1) : lower.getMonth() + 1
        let year = lower.getFullYear()
        startSpan.push(`${day}-${month}-${year}`)
        startDate++
      }
      return startSpan.concat(endSpan)
    }
  }
}