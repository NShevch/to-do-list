export default class DateFunctionality {
  getCurrentDateData(): DateData {
    const minutes: number = new Date().getMinutes();
    const hours: number =new Date().getHours();
    const day: number = new Date().getDate();
    const month: number = new Date().getMonth();
    const year: number = new Date().getFullYear();
    return {
      minutes,
      hours,
      day,
      month,
      year
    };
  }

  stringCurrentDateData({minutes = 0, hours = 0, day, month, year }: DateData): DateDataString {        
    const minutesString: string = String(minutes).padStart(2, '0');
    const hoursString: string = String(hours).padStart(2, '0');
    const dayString: string = String(day).padStart(2, '0');
    const monthString: string = String(month + 1).padStart(2, '0');
    const yearString: string = String(year);
    return {
      minutesString,
      hoursString,
      dayString,
      monthString,
      yearString
    };
  }

  getCurrentDateDataString(): DateDataString {
    const {minutes, hours, day, month, year}: DateData = this.getCurrentDateData();
    const date: DateDataString = this.stringCurrentDateData({minutes, hours, day, month, year});
    return date;
  }

  getCurrentDateAndTimeInFormat(): {currentDate: string, currentTime: string} {
    const date: DateDataString = this.getCurrentDateDataString();    
    const currentDate: string = date.yearString + '-' + date.monthString + '-' + date.dayString;
    const currentTime: string = date.hoursString + ':' + date.minutesString;
    return {currentDate, currentTime};
  }

  checkDateEntered({date, time}: {date: string, time: string}): {date: string, time: string} { 
    const {currentDate, currentTime}: {
      currentDate: string,
      currentTime: string
    } = this.getCurrentDateAndTimeInFormat();
    if (
      time > currentTime
      && date === ''
    ) {
      date = currentDate;
    } else if (
      date.length > 0
      && time === ''
    ) {
      time = '23:59';
    } else if (
      time <= currentTime
      &&  time !== ''
      && (date === currentDate || date === '')
    ) {
      const {day, month, year}: DateData = this.getCurrentDateData();
      const nextDate: Date = new Date(year, month, day + 1);
      const {
        dayString: dayOfNextDateString,
        monthString: monthOfNextDateString,
        yearString: yearOfNextDateString
      } = this.stringCurrentDateData({
        day: nextDate.getDate(),
        month: nextDate.getMonth(), 
        year: nextDate.getFullYear()
      });
      date = yearOfNextDateString + '-' + monthOfNextDateString + '-' + dayOfNextDateString;
    }
    return { date, time };
  }

  setMinAttributeWithCurrentDate(dateElem: HTMLInputElement) {   
    const {currentDate}: {currentDate: string} = this.getCurrentDateAndTimeInFormat();
    dateElem.min = currentDate;
  }
};
