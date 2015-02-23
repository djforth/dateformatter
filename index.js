'use strict';
var DateFormatter, _;

_ = require('lodash');

module.exports = DateFormatter = (function() {
  var AMPM;

  function DateFormatter() {}

  DateFormatter.prototype.date = null;

  AMPM = "am";

  DateFormatter.prototype.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];

  DateFormatter.prototype.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  DateFormatter.prototype.SHORT_MONTHS = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  DateFormatter.prototype.MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  DateFormatter.prototype.formatDate = function() {
    var date, fmt;
    if (_.isDate(arguments[0])) {
      date = arguments[0];
    }
    if (_.isString(arguments[1])) {
      fmt = arguments[1];
    }
    if (!_.isString(fmt)) {
      throw new Error("date format not a string");
    }
    if (!_.isDate(date)) {
      throw new Error("is not date");
    }
    fmt = fmt.replace("%y", date.getYear() - 100);
    fmt = fmt.replace("%Y", date.getFullYear());
    fmt = fmt.replace("%m", date.getMonth() + 1);
    fmt = fmt.replace("%b", this.SHORT_MONTHS[date.getMonth()]);
    fmt = fmt.replace("%B", this.MONTHS[date.getMonth()]);
    fmt = fmt.replace("%d", date.getDate());
    fmt = fmt.replace("%a", this.SHORT_DAYS[date.getDay()]);
    fmt = fmt.replace("%A", this.DAYS[date.getDay()]);
    fmt = fmt.replace("%H", this.fixTime(date.getHours()));
    fmt = fmt.replace("%-l", this.set12Hour(date.getHours()));
    fmt = fmt.replace("%M", this.fixTime(date.getMinutes()));
    fmt = fmt.replace("%S", this.fixTime(date.getSeconds()));
    fmt = fmt.replace("%p", this.AMPM);
    return fmt;
  };

  DateFormatter.prototype.dateFix = function(d) {
    var date, matches, month, new_date, year;
    if (!_.isString(d)) {
      throw new Error("Not a string");
    }
    matches = d.match(/^\s*(\d{4})-(\d{2})-(\d{2})*$/);
    if (matches) {
      year = parseInt(matches[1]);
      month = parseInt(matches[2], 10) - 1;
      date = parseInt(matches[3], 10);
      new_date = new Date(year, month, date);
    }
    return new_date;
  };

  DateFormatter.prototype.dateTimeFix = function(d) {
    var matches, month, new_date, year;
    if (!_.isString(d)) {
      throw new Error("Not a string");
    }
    matches = d.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\s*$/);
    if (matches) {
      year = parseInt(matches[1]);
      month = parseInt(matches[2], 10) - 1;
      d = parseInt(matches[3], 10);
      new_date = new Date(year, month, d);
      new_date.setHours(matches[4], matches[5], 0, 0);
    }
    return new_date;
  };

  DateFormatter.prototype.fixTime = function(t) {
    if (String(t).length < 2) {
      return "0" + t;
    } else {
      return String(t);
    }
  };

  DateFormatter.prototype.set12Hour = function(hour) {
    this.AMPM = hour < 12 ? "am" : "pm";
    if (hour <= 12) {
      return hour;
    } else {
      return hour - 12;
    }
  };

  return DateFormatter;

})();
