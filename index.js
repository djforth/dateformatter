"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DateFormatter = (function () {
  function DateFormatter() {
    _classCallCheck(this, DateFormatter);

    var args = Array.prototype.slice.call(arguments);
    // yyyy-mm-dd hh:mm:ss
    // yyyy-mm-dd hh:mm
    // yyyy-mm-dd
    this.date_test = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2}(\.\d{3})?)?$/;

    this.date = null;
    this.AMPM = "am";
    this.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.SHORT_MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    this.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.setDate.apply(this, args);
  }

  _createClass(DateFormatter, {
    compact: {
      value: function compact(array) {
        // Ripped from lodash
        var index = -1,
            length = array ? array.length : 0,
            resIndex = -1,
            result = [];

        while (++index < length) {
          var value = array[index];
          if (value) {
            result[++resIndex] = value;
          }
        }
        return result;
      }
    },
    dateFix: {
      value: function dateFix(date_str) {
        // yyyy-mm-dd hh:mm
        // yyyy-mm-dd hh:mm
        // yyyy-mm-dd
        var date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})+!?(\s(\d{2}):(\d{2})|\s(\d{2}):(\d{2}):(\d+))?$/;
        var matches = date_str.match(date_regex);

        if (matches) {
          matches = this.compact(matches);
          // console.log('matches', matches);

          var year = parseInt(matches[1]);
          var month = parseInt(matches[2], 10) - 1;
          var date = parseInt(matches[3], 10);

          date = new Date(year, month, date);

          if (matches[5]) {
            date.setHours(matches[5]);
          }

          if (matches[6]) {
            date.setMinutes(matches[6]);
          }

          if (matches[7]) {
            date.setSeconds(matches[7]);
          }

          return date;
        } else {
          throw new Error("Date is malformed");
        };
      }
    },
    fixTime: {
      value: function fixTime(t) {
        if (String(t).length < 2) {
          return "0" + t;
        } else {
          return String(t);
        }
      }
    },
    formatDate: {
      value: function formatDate(str) {
        var date = undefined,
            fmt = undefined;
        date = this.date;

        if (this.isString(str)) {
          fmt = str;
        }

        // http://jsperf.com/date-formatting2
        // Year
        fmt = fmt.replace("%y", date.getYear() - 100);
        // Full Year
        fmt = fmt.replace("%Y", date.getFullYear());
        // Set Numbered Month
        fmt = fmt.replace("%m", date.getMonth() + 1);
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
        fmt = fmt.replace("%H", this.fixTime(date.getHours()));
        // Set Hours - 12
        fmt = fmt.replace("%-l", this.set12Hour(date.getHours()));
        // Set Mins
        fmt = fmt.replace("%M", this.fixTime(date.getMinutes()));
        // Set Secs
        fmt = fmt.replace("%S", this.fixTime(date.getSeconds()));
        // Set AMPM
        fmt = fmt.replace("%p", this.AMPM);

        return fmt;
      }
    },
    getDate: {
      value: function getDate() {
        return this.date;
      }
    },
    isDate: {
      value: function isDate(d) {
        return Object.prototype.toString.call(d) === "[object Date]";
      }
    },
    isString: {
      value: function isString(str) {
        return Object.prototype.toString.call(str) === "[object String]";
      }
    },
    set12Hour: {
      value: function set12Hour(hour) {
        this.AMPM = hour < 12 ? "am" : "pm";
        if (hour <= 12) {
          return hour;
        } else {
          return hour - 12;
        }
      }
    },
    setDate: {
      value: function setDate() {
        var args = Array.prototype.slice.call(arguments);
        if (this.isString(args[0]) && this.date_test.test(args[0])) {
          this.date = this.dateFix(args[0]);
        } else {
          if (this.isString(args[0])) {
            this.date = new Date(args[0]);
          } else {
            this.date = new Date(Date.UTC.apply(null, args));
          }
        }
      }
    }
  });

  return DateFormatter;
})();

module.exports = DateFormatter;//If Date
          this.date = args[0];
        } else if (this.isString(args[0]) && this.date_test.test(args[0])) {
          // If date str with -
          this.date = this.dateFix(args[0]);
        } else if (this.isString(args[0])) {
          // if other date str standard
          this.date = new Date(args[0]);
        } else {
          // if numbers
          this.date = new Date(Date.UTC.apply(null, args));
        }
      }
    }
  });

  return DateFormatter;
})();

module.exports = DateFormatter;