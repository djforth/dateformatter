(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/dateFormatter.es6.js":[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

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

  _prototypeProperties(DateFormatter, null, {
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
      },
      writable: true,
      configurable: true
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
      },
      writable: true,
      configurable: true
    },
    fixTime: {
      value: function fixTime(t) {
        if (String(t).length < 2) {
          return "0" + t;
        } else {
          return String(t);
        }
      },
      writable: true,
      configurable: true
    },
    formatDate: {
      value: function formatDate() {
        var date = undefined,
            fmt = undefined;
        date = this.date;

        if (this.isString(arguments[1])) {
          fmt = arguments[1];
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
      },
      writable: true,
      configurable: true
    },
    getDate: {
      value: function getDate() {
        return this.date;
      },
      writable: true,
      configurable: true
    },
    isDate: {
      value: function isDate(d) {
        return Object.prototype.toString.call(d) === "[object Date]";
      },
      writable: true,
      configurable: true
    },
    isString: {
      value: function isString(str) {
        return Object.prototype.toString.call(str) === "[object String]";
      },
      writable: true,
      configurable: true
    },
    set12Hour: {
      value: function set12Hour(hour) {
        this.AMPM = hour < 12 ? "am" : "pm";
        if (hour <= 12) {
          return hour;
        } else {
          return hour - 12;
        }
      },
      writable: true,
      configurable: true
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
      },
      writable: true,
      configurable: true
    }
  });

  return DateFormatter;
})();

module.exports = DateFormatter;

},{}]},{},["./lib/dateFormatter.es6.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2RhdGVmb3JtYXR0ZXIvbGliL2RhdGVGb3JtYXR0ZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDRU0sYUFBYTtBQW9CTixXQXBCUCxhQUFhOzBCQUFiLGFBQWE7O0FBcUJmLFFBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztBQUlqRCxRQUFJLENBQUMsU0FBUyxHQUFHLG9EQUFvRCxDQUFDOztBQUV0RSxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDeEUsUUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUcsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzNGLFFBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQy9HLFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsUUFBUSxF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RSxHQUFHLEdBQUcsQ0FBQyxDQUFDOztBQUU5QyxXQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRTVDLFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTNDLFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRTVELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXRELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7QUFFeEMsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFeEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFeEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFM0QsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFMUQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFMUQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFbkMsZUFBTyxHQUFHLENBQUM7T0FDWjs7OztBQUVELFdBQU87YUFBQSxtQkFBRTtBQUNQLGVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQTtPQUNqQjs7OztBQUdELFVBQU07YUFBQSxnQkFBQyxDQUFDLEVBQUM7QUFDUCxlQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxlQUFlLENBQUM7T0FDOUQ7Ozs7QUFFRCxZQUFRO2FBQUEsa0JBQUMsR0FBRyxFQUFDO0FBQ1YsZUFBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssaUJBQWlCLENBQUM7T0FDbkU7Ozs7QUFFRCxhQUFTO2FBQUEsbUJBQUMsSUFBSSxFQUFDO0FBQ2IsWUFBSSxDQUFDLElBQUksR0FBRyxBQUFDLElBQUksR0FBRyxFQUFFLEdBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUN0QyxZQUFHLElBQUksSUFBSSxFQUFFLEVBQUM7QUFDWixpQkFBTyxJQUFJLENBQUE7U0FDWixNQUFNO0FBQ0wsaUJBQU8sSUFBSSxHQUFHLEVBQUUsQ0FBQTtTQUNqQjtPQUNGOzs7O0FBRUQsV0FBTzthQUFBLG1CQUFFO0FBQ1AsWUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELFlBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUN4RCxjQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEMsTUFBTTtBQUNMLGNBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUN4QixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtXQUM5QixNQUFNO0FBQ0wsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7V0FDaEQ7U0FDRjtPQUNGOzs7Ozs7U0EvSkcsYUFBYTs7O0FBb0tuQixNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxuY2xhc3MgRGF0ZUZvcm1hdHRlciB7XG5cblxuXG4gIGNvbXBhY3QoYXJyYXkpIHtcbiAgICAvLyBSaXBwZWQgZnJvbSBsb2Rhc2hcbiAgICBsZXQgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICByZXNJbmRleCA9IC0xLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBsZXQgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmVzdWx0WysrcmVzSW5kZXhdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAvLyB5eXl5LW1tLWRkIGhoOm1tOnNzXG4gICAgLy8geXl5eS1tbS1kZCBoaDptbVxuICAgIC8vIHl5eXktbW0tZGRcbiAgICB0aGlzLmRhdGVfdGVzdCA9IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0oIFxcZHsyfTpcXGR7Mn06XFxkezJ9KFxcLlxcZHszfSk/KT8kLztcblxuICAgIHRoaXMuZGF0ZSA9IG51bGxcbiAgICB0aGlzLkFNUE0gPSBcImFtXCJcbiAgICB0aGlzLlNIT1JUX0RBWVMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVzXCIsIFwiV2Vkc1wiLCBcIlRodXJzXCIsICBcIkZyaVwiLCBcIlNhdFwiXVxuICAgIHRoaXMuREFZUyA9IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCAgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXVxuICAgIHRoaXMuU0hPUlRfTU9OVEhTID0gWydKYW4nLCAnRmViJywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXVxuICAgIHRoaXMuTU9OVEhTID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxuXG4gICAgdGhpcy5zZXREYXRlLmFwcGx5KHRoaXMsIGFyZ3MpXG5cbiAgfVxuXG4gIGRhdGVGaXgoZGF0ZV9zdHIpe1xuICAgIC8vIHl5eXktbW0tZGQgaGg6bW1cbiAgICAvLyB5eXl5LW1tLWRkIGhoOm1tXG4gICAgLy8geXl5eS1tbS1kZFxuICAgIGxldCBkYXRlX3JlZ2V4ID0gL15cXHMqKFxcZHs0fSktKFxcZHsyfSktKFxcZHsyfSkrIT8oXFxzKFxcZHsyfSk6KFxcZHsyfSl8XFxzKFxcZHsyfSk6KFxcZHsyfSk6KFxcZCspKT8kLztcbiAgICBsZXQgbWF0Y2hlcyA9IGRhdGVfc3RyLm1hdGNoKGRhdGVfcmVnZXgpO1xuXG5cbiAgICBpZiAobWF0Y2hlcykge1xuICAgICAgbWF0Y2hlcyA9IHRoaXMuY29tcGFjdChtYXRjaGVzKVxuICAgICAgLy8gY29uc29sZS5sb2coJ21hdGNoZXMnLCBtYXRjaGVzKTtcblxuICAgICAgbGV0IHllYXIgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICAgIGxldCBtb250aCA9IHBhcnNlSW50KG1hdGNoZXNbMl0sIDEwKSAtIDE7XG4gICAgICBsZXQgZGF0ZSA9IHBhcnNlSW50KG1hdGNoZXNbM10sIDEwKTtcblxuICAgICAgZGF0ZSA9ICBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG5cbiAgICAgIGlmKG1hdGNoZXNbNV0pe1xuICAgICAgICBkYXRlLnNldEhvdXJzKG1hdGNoZXNbNV0pO1xuICAgICAgfVxuXG4gICAgICBpZihtYXRjaGVzWzZdKXtcbiAgICAgICAgZGF0ZS5zZXRNaW51dGVzKG1hdGNoZXNbNl0pO1xuICAgICAgfVxuXG4gICAgICBpZihtYXRjaGVzWzddKXtcbiAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKG1hdGNoZXNbN10pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0ZVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkRhdGUgaXMgbWFsZm9ybWVkXCIpO1xuICAgIH07XG5cblxuXG4gIH1cblxuICBmaXhUaW1lKHQpe1xuICAgIGlmKFN0cmluZyh0KS5sZW5ndGggPCAyKXtcbiAgICAgIHJldHVybiBcIjBcIiArIHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBTdHJpbmcodCk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0RGF0ZSgpe1xuICAgIGxldCBkYXRlLCBmbXQ7XG4gICAgZGF0ZSA9IHRoaXMuZGF0ZTtcblxuXG4gICAgaWYodGhpcy5pc1N0cmluZyhhcmd1bWVudHNbMV0pKXtcbiAgICAgIGZtdCA9IGFyZ3VtZW50c1sxXTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9kYXRlLWZvcm1hdHRpbmcyXG4gICAgLy8gWWVhclxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJXlcIiwgZGF0ZS5nZXRZZWFyKCkgLSAxMDApO1xuICAgIC8vIEZ1bGwgWWVhclxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJVlcIiwgZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICAvLyBTZXQgTnVtYmVyZWQgTW9udGhcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVtXCIsIGRhdGUuZ2V0TW9udGgoKSsxKTtcbiAgICAvLyBTZXQgU2hvcnQgTW9udGhcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiViXCIsIHRoaXMuU0hPUlRfTU9OVEhTW2RhdGUuZ2V0TW9udGgoKV0pO1xuICAgIC8vIFNldCBNb250aFxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJUJcIiwgdGhpcy5NT05USFNbZGF0ZS5nZXRNb250aCgpXSk7XG4gICAgLy8gU2V0IERhdGVcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVkXCIsIGRhdGUuZ2V0RGF0ZSgpKTtcbiAgICAvLyBTZXQgU2hvcnQgRGF5XG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlYVwiLCB0aGlzLlNIT1JUX0RBWVNbZGF0ZS5nZXREYXkoKV0pO1xuICAgIC8vIFNldCBEYXlcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVBXCIsIHRoaXMuREFZU1tkYXRlLmdldERheSgpXSk7XG4gICAgLy8gU2V0IEhvdXJzIC0gMjRcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVIXCIsIHRoaXMuZml4VGltZShkYXRlLmdldEhvdXJzKCkpICk7XG4gICAgLy8gU2V0IEhvdXJzIC0gMTJcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiUtbFwiLCB0aGlzLnNldDEySG91cihkYXRlLmdldEhvdXJzKCkpICk7XG4gICAgLy8gU2V0IE1pbnNcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVNXCIsIHRoaXMuZml4VGltZShkYXRlLmdldE1pbnV0ZXMoKSkgKTtcbiAgICAvLyBTZXQgU2Vjc1xuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJVNcIiwgdGhpcy5maXhUaW1lKGRhdGUuZ2V0U2Vjb25kcygpKSApO1xuICAgIC8vIFNldCBBTVBNXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlcFwiLCB0aGlzLkFNUE0pO1xuXG4gICAgcmV0dXJuIGZtdDtcbiAgfVxuXG4gIGdldERhdGUoKXtcbiAgICByZXR1cm4gdGhpcy5kYXRlXG4gIH1cblxuXG4gIGlzRGF0ZShkKXtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGQpID09PSBcIltvYmplY3QgRGF0ZV1cIjtcbiAgfVxuXG4gIGlzU3RyaW5nKHN0cil7XG4gICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3RyKSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgfVxuXG4gIHNldDEySG91cihob3VyKXtcbiAgICB0aGlzLkFNUE0gPSAoaG91ciA8IDEyKSA/IFwiYW1cIiA6IFwicG1cIjtcbiAgICBpZihob3VyIDw9IDEyKXtcbiAgICAgIHJldHVybiBob3VyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBob3VyIC0gMTJcbiAgICB9XG4gIH1cblxuICBzZXREYXRlKCl7XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGlmKHRoaXMuaXNTdHJpbmcoYXJnc1swXSkgJiYgdGhpcy5kYXRlX3Rlc3QudGVzdChhcmdzWzBdKSl7XG4gICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGVGaXgoYXJnc1swXSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYodGhpcy5pc1N0cmluZyhhcmdzWzBdKSl7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKGFyZ3NbMF0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLGFyZ3MpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlRm9ybWF0dGVyIl19
