'use strict'

class DateFormatter {

  constructor(){
    this.date = null
    this.AMPM = "am"
    this.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs",  "Fri", "Sat"]
    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday"]
    this.SHORT_MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    this.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']
  }

  dateFix(date_str){
    let date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})*$/;

    if(this.isString(date_str)){
      let matches = date_str.match(date_regex);

      if (matches) {
        let year = parseInt(matches[1]);
        let month = parseInt(matches[2], 10) - 1;
        let date = parseInt(matches[3], 10);

        return new Date(year, month, date);
      };
    }

    return "Not valid"
  }

  dateTimeFix(date_str){
    let date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\s*$/;

    if(this.isString(date_str)){
      let matches = date_str.match(date_regex);

      if (matches) {
        let year = parseInt(matches[1]);
        let month = parseInt(matches[2], 10) - 1;
        let date = parseInt(matches[3], 10);

        date =  new Date(year, month, date);
        date.setHours(matches[4],matches[5], 0, 0);

        return date;
      };
    }

    return "Not valid"
  }

  fixTime(t){
    if(String(t).length < 2){
      return "0" + t;
    } else {
      return String(t);
    }
  }

  formatDate(){
    let date, fmt;
    if(this.isDate(arguments[0])){
      date = arguments[0];
    }

    if(this.isString(arguments[1])){
      fmt = arguments[1];
    }

    // http://jsperf.com/date-formatting2
    // Year
    fmt = fmt.replace("%y", date.getYear() - 100);
    // Full Year
    fmt = fmt.replace("%Y", date.getFullYear());
    // Set Numbered Month
    fmt = fmt.replace("%m", date.getMonth()+1);
    // Set Short Month
    fmt = fmt.replace("%b", this.SHORT_MONTHS[date.getMonth()]);
    // Set Month
    fmt = fmt.replace("%B", this.MONTHS[date.getMonth()]);
    // Set Date
    fmt = fmt.replace("%d", date.getDate());
    // Set Short Day
    fmt = fmt.replace("%a", this.SHORT_DAYS[date.getDay()]);
    // Set Day
    fmt = fmt.replace("%A", this.DAYS[date.getDay()]);
    // Set Hours - 24
    fmt = fmt.replace("%H", this.fixTime(date.getHours()) );
    // Set Hours - 12
    fmt = fmt.replace("%-l", this.set12Hour(date.getHours()) );
    // Set Mins
    fmt = fmt.replace("%M", this.fixTime(date.getMinutes()) );
    // Set Secs
    fmt = fmt.replace("%S", this.fixTime(date.getSeconds()) );
    // Set AMPM
    fmt = fmt.replace("%p", this.AMPM);

    return fmt;
  }



  isDate(d){

    if(Object.prototype.toString.call(d) === "[object Date]"){
      return true;
     } else {
      throw new Error("Not a date");
      return false;
     }
  }

  isString(str){
     if(Object.prototype.toString.call(str) === "[object String]"){
      return true;
     } else {
      throw new Error("Not a string");
      return false;
     }
  }

  set12Hour(hour){
    this.AMPM = (hour < 12) ? "am" : "pm";
    if(hour <= 12){
      return hour
    } else {
      return hour - 12
    }
  }


}

module.exports = DateFormatter