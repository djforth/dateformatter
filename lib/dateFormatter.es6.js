'use strict'

class DateFormatter {



  compact(array) {
    // Ripped from lodash
    let index = -1,
        length = array ? array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < length) {
      let value = array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  }

  constructor(){
    let args = Array.prototype.slice.call(arguments);
    // yyyy-mm-dd hh:mm:ss
    // yyyy-mm-dd hh:mm
    // yyyy-mm-dd
    this.date_test = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2}(\.\d{3})?)?$/;

    this.date = null
    this.AMPM = "am"
    this.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs",  "Fri", "Sat"]
    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday"]
    this.SHORT_MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    this.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']

    this.setDate.apply(this, args);



  }

  dateFix(date_str){
    // yyyy-mm-dd hh:mm:ss
    // yyyy-mm-dd hh:mm
    // yyyy-mm-dd
    let date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})+!?(\s(\d{2}):(\d{2})|\s(\d{2}):(\d{2}):(\d+))?$/;
    let matches = date_str.match(date_regex);


    if (matches) {
      matches = this.compact(matches)
      // console.log('matches', matches);

      let year = parseInt(matches[1]);
      let month = parseInt(matches[2], 10) - 1;
      let date = parseInt(matches[3], 10);

      date =  new Date(year, month, date);

      if(matches[5]){
        date.setHours(matches[5]);
      }

      if(matches[6]){
        date.setMinutes(matches[6]);
      }

      if(matches[7]){
        date.setSeconds(matches[7]);
      }

      return date

    } else {
      throw new Error("Date is malformed");
    };



  }

  fixTime(t){
    if(String(t).length < 2){
      return "0" + t;
    } else {
      return String(t);
    }
  }

  formatDate(str){
    let date, fmt;
    date = this.date;


    if(this.isString(str)){
      fmt = str;
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
    // Set Hours - 24 with 0
    fmt = fmt.replace("%H", this.fixTime(date.getHours()) );
    // Set Hours - 24 without 0
    fmt = fmt.replace("%h", date.getHours() );
    // Set Hours - 12
    fmt = fmt.replace("%-l", this.set12Hour(date.getHours()) );
    // Set Mins with 0
    fmt = fmt.replace("%M", this.fixTime(date.getMinutes()) );
    // Set Mins no 0
    console.log('m',date.getMinutes() );
    fmt = fmt.replace("%-M", String(date.getMinutes()) );
    // Set Secs with 0
    fmt = fmt.replace("%S", this.fixTime(date.getSeconds()) );
    // Set Secs without 0
    fmt = fmt.replace("%s", date.getSeconds() );
    // Set AMPM
    fmt = fmt.replace("%p", this.AMPM);

    return fmt;
  }

  getDate(){
    return this.date
  }


  isDate(d){
    return Object.prototype.toString.call(d) === "[object Date]";
  }

  isString(str){
     return Object.prototype.toString.call(str) === "[object String]";
  }

  set12Hour(hour){
    this.AMPM = (hour < 12) ? "am" : "pm";
    if(hour <= 12){
      return hour
    } else {
      return hour - 12
    }
  }

  setDate(){
    let args = Array.prototype.slice.call(arguments);

    if(this.isDate(args[0])) {
      //If Date
      this.date = args[0];
    } else if(this.isString(args[0]) && this.date_test.test(args[0])){
      // If date str with -
      this.date = this.dateFix(args[0]);
    }
    else if (this.isString(args[0])) {
       // if other date str standard
       this.date = new Date(args[0]);
     } else {
      // if numbers
      this.date = new Date(Date.UTC.apply(null,args));
    }
  }


}

module.exports = DateFormatter