'use strict'

if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

class DateFormatter extends Date {

  constructor(){
    console.log('Arguments', arguments);
    this.date = null
    this.AMPM = "am"
    this.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs",  "Fri", "Sat"]
    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday"]
    this.SHORT_MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    this.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']

    if(arguments[0].includes('-')){
      if(arguments[0].length == 10){
        console.log('Test date', arguments[0]);
      } else if (arguments[0].length == 16){
        console.log('Test dateTime', arguments[0]);
      }
    } else {
      return super(arguments)
    }





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
}

module.exports = DateFormatter