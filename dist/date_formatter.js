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
        // yyyy-mm-dd hh:mm:ss
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
        // Set Hours - 24 with 0
        fmt = fmt.replace("%H", this.fixTime(date.getHours()));
        // Set Hours - 24 without 0
        fmt = fmt.replace("%h", date.getHours());
        // Set Hours - 12
        fmt = fmt.replace("%-l", this.set12Hour(date.getHours()));
        // Set Mins with 0
        fmt = fmt.replace("%M", this.fixTime(date.getMinutes()));
        // Set Mins no 0
        console.log("m", date.getMinutes());
        fmt = fmt.replace("%-M", String(date.getMinutes()));
        // Set Secs with 0
        fmt = fmt.replace("%S", this.fixTime(date.getSeconds()));
        // Set Secs without 0
        fmt = fmt.replace("%s", date.getSeconds());
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

        if (this.isDate(args[0])) {
          //If Date
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
      },
      writable: true,
      configurable: true
    }
  });

  return DateFormatter;
})();

module.exports = DateFormatter;

},{}]},{},["./lib/dateFormatter.es6.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2RhdGVmb3JtYXR0ZXIvbGliL2RhdGVGb3JtYXR0ZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDRU0sYUFBYTtBQW9CTixXQXBCUCxhQUFhOzBCQUFiLGFBQWE7O0FBcUJmLFFBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7OztBQUlqRCxRQUFJLENBQUMsU0FBUyxHQUFHLG9EQUFvRCxDQUFDOztBQUV0RSxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNoQixRQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDeEUsUUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUcsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0FBQzNGLFFBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQy9HLFFBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLEVBQUUsUUFBUSxF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OztBQUU5QyxXQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7O0FBRTVDLFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTNDLFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRTVELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRXRELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzs7QUFFeEMsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFeEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQzs7QUFFbEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFeEQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBRSxDQUFDOztBQUUxQyxXQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJ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IiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG5jbGFzcyBEYXRlRm9ybWF0dGVyIHtcblxuXG5cbiAgY29tcGFjdChhcnJheSkge1xuICAgIC8vIFJpcHBlZCBmcm9tIGxvZGFzaFxuICAgIGxldCBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc0luZGV4ID0gLTEsXG4gICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGxldCB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICByZXN1bHRbKytyZXNJbmRleF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIC8vIHl5eXktbW0tZGQgaGg6bW06c3NcbiAgICAvLyB5eXl5LW1tLWRkIGhoOm1tXG4gICAgLy8geXl5eS1tbS1kZFxuICAgIHRoaXMuZGF0ZV90ZXN0ID0gL15cXGR7NH0tXFxkezJ9LVxcZHsyfSggXFxkezJ9OlxcZHsyfTpcXGR7Mn0oXFwuXFxkezN9KT8pPyQvO1xuXG4gICAgdGhpcy5kYXRlID0gbnVsbFxuICAgIHRoaXMuQU1QTSA9IFwiYW1cIlxuICAgIHRoaXMuU0hPUlRfREFZUyA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZXNcIiwgXCJXZWRzXCIsIFwiVGh1cnNcIiwgIFwiRnJpXCIsIFwiU2F0XCJdXG4gICAgdGhpcy5EQVlTID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsICBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG4gICAgdGhpcy5TSE9SVF9NT05USFMgPSBbJ0phbicsICdGZWInLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgdGhpcy5NT05USFMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG5cbiAgICB0aGlzLnNldERhdGUuYXBwbHkodGhpcywgYXJncyk7XG5cblxuXG4gIH1cblxuICBkYXRlRml4KGRhdGVfc3RyKXtcbiAgICAvLyB5eXl5LW1tLWRkIGhoOm1tOnNzXG4gICAgLy8geXl5eS1tbS1kZCBoaDptbVxuICAgIC8vIHl5eXktbW0tZGRcbiAgICBsZXQgZGF0ZV9yZWdleCA9IC9eXFxzKihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pKyE/KFxccyhcXGR7Mn0pOihcXGR7Mn0pfFxccyhcXGR7Mn0pOihcXGR7Mn0pOihcXGQrKSk/JC87XG4gICAgbGV0IG1hdGNoZXMgPSBkYXRlX3N0ci5tYXRjaChkYXRlX3JlZ2V4KTtcblxuXG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIG1hdGNoZXMgPSB0aGlzLmNvbXBhY3QobWF0Y2hlcylcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdtYXRjaGVzJywgbWF0Y2hlcyk7XG5cbiAgICAgIGxldCB5ZWFyID0gcGFyc2VJbnQobWF0Y2hlc1sxXSk7XG4gICAgICBsZXQgbW9udGggPSBwYXJzZUludChtYXRjaGVzWzJdLCAxMCkgLSAxO1xuICAgICAgbGV0IGRhdGUgPSBwYXJzZUludChtYXRjaGVzWzNdLCAxMCk7XG5cbiAgICAgIGRhdGUgPSAgbmV3IERhdGUoeWVhciwgbW9udGgsIGRhdGUpO1xuXG4gICAgICBpZihtYXRjaGVzWzVdKXtcbiAgICAgICAgZGF0ZS5zZXRIb3VycyhtYXRjaGVzWzVdKTtcbiAgICAgIH1cblxuICAgICAgaWYobWF0Y2hlc1s2XSl7XG4gICAgICAgIGRhdGUuc2V0TWludXRlcyhtYXRjaGVzWzZdKTtcbiAgICAgIH1cblxuICAgICAgaWYobWF0Y2hlc1s3XSl7XG4gICAgICAgIGRhdGUuc2V0U2Vjb25kcyhtYXRjaGVzWzddKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGVcblxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJEYXRlIGlzIG1hbGZvcm1lZFwiKTtcbiAgICB9O1xuXG5cblxuICB9XG5cbiAgZml4VGltZSh0KXtcbiAgICBpZihTdHJpbmcodCkubGVuZ3RoIDwgMil7XG4gICAgICByZXR1cm4gXCIwXCIgKyB0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gU3RyaW5nKHQpO1xuICAgIH1cbiAgfVxuXG4gIGZvcm1hdERhdGUoc3RyKXtcbiAgICBsZXQgZGF0ZSwgZm10O1xuICAgIGRhdGUgPSB0aGlzLmRhdGU7XG5cblxuICAgIGlmKHRoaXMuaXNTdHJpbmcoc3RyKSl7XG4gICAgICBmbXQgPSBzdHI7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2pzcGVyZi5jb20vZGF0ZS1mb3JtYXR0aW5nMlxuICAgIC8vIFllYXJcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiV5XCIsIGRhdGUuZ2V0WWVhcigpIC0gMTAwKTtcbiAgICAvLyBGdWxsIFllYXJcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVZXCIsIGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gICAgLy8gU2V0IE51bWJlcmVkIE1vbnRoXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlbVwiLCBkYXRlLmdldE1vbnRoKCkrMSk7XG4gICAgLy8gU2V0IFNob3J0IE1vbnRoXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlYlwiLCB0aGlzLlNIT1JUX01PTlRIU1tkYXRlLmdldE1vbnRoKCldKTtcbiAgICAvLyBTZXQgTW9udGhcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVCXCIsIHRoaXMuTU9OVEhTW2RhdGUuZ2V0TW9udGgoKV0pO1xuICAgIC8vIFNldCBEYXRlXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlZFwiLCBkYXRlLmdldERhdGUoKSk7XG4gICAgLy8gU2V0IFNob3J0IERheVxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJWFcIiwgdGhpcy5TSE9SVF9EQVlTW2RhdGUuZ2V0RGF5KCldKTtcbiAgICAvLyBTZXQgRGF5XG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlQVwiLCB0aGlzLkRBWVNbZGF0ZS5nZXREYXkoKV0pO1xuICAgIC8vIFNldCBIb3VycyAtIDI0IHdpdGggMFxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJUhcIiwgdGhpcy5maXhUaW1lKGRhdGUuZ2V0SG91cnMoKSkgKTtcbiAgICAvLyBTZXQgSG91cnMgLSAyNCB3aXRob3V0IDBcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVoXCIsIGRhdGUuZ2V0SG91cnMoKSApO1xuICAgIC8vIFNldCBIb3VycyAtIDEyXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlLWxcIiwgdGhpcy5zZXQxMkhvdXIoZGF0ZS5nZXRIb3VycygpKSApO1xuICAgIC8vIFNldCBNaW5zIHdpdGggMFxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJU1cIiwgdGhpcy5maXhUaW1lKGRhdGUuZ2V0TWludXRlcygpKSApO1xuICAgIC8vIFNldCBNaW5zIG5vIDBcbiAgICBjb25zb2xlLmxvZygnbScsZGF0ZS5nZXRNaW51dGVzKCkgKTtcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiUtTVwiLCBTdHJpbmcoZGF0ZS5nZXRNaW51dGVzKCkpICk7XG4gICAgLy8gU2V0IFNlY3Mgd2l0aCAwXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlU1wiLCB0aGlzLmZpeFRpbWUoZGF0ZS5nZXRTZWNvbmRzKCkpICk7XG4gICAgLy8gU2V0IFNlY3Mgd2l0aG91dCAwXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlc1wiLCBkYXRlLmdldFNlY29uZHMoKSApO1xuICAgIC8vIFNldCBBTVBNXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlcFwiLCB0aGlzLkFNUE0pO1xuXG4gICAgcmV0dXJuIGZtdDtcbiAgfVxuXG4gIGdldERhdGUoKXtcbiAgICByZXR1cm4gdGhpcy5kYXRlXG4gIH1cblxuXG4gIGlzRGF0ZShkKXtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGQpID09PSBcIltvYmplY3QgRGF0ZV1cIjtcbiAgfVxuXG4gIGlzU3RyaW5nKHN0cil7XG4gICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3RyKSA9PT0gXCJbb2JqZWN0IFN0cmluZ11cIjtcbiAgfVxuXG4gIHNldDEySG91cihob3VyKXtcbiAgICB0aGlzLkFNUE0gPSAoaG91ciA8IDEyKSA/IFwiYW1cIiA6IFwicG1cIjtcbiAgICBpZihob3VyIDw9IDEyKXtcbiAgICAgIHJldHVybiBob3VyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBob3VyIC0gMTJcbiAgICB9XG4gIH1cblxuICBzZXREYXRlKCl7XG4gICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgaWYodGhpcy5pc0RhdGUoYXJnc1swXSkpIHtcbiAgICAgIC8vSWYgRGF0ZVxuICAgICAgdGhpcy5kYXRlID0gYXJnc1swXTtcbiAgICB9IGVsc2UgaWYodGhpcy5pc1N0cmluZyhhcmdzWzBdKSAmJiB0aGlzLmRhdGVfdGVzdC50ZXN0KGFyZ3NbMF0pKXtcbiAgICAgIC8vIElmIGRhdGUgc3RyIHdpdGggLVxuICAgICAgdGhpcy5kYXRlID0gdGhpcy5kYXRlRml4KGFyZ3NbMF0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0aGlzLmlzU3RyaW5nKGFyZ3NbMF0pKSB7XG4gICAgICAgLy8gaWYgb3RoZXIgZGF0ZSBzdHIgc3RhbmRhcmRcbiAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZShhcmdzWzBdKTtcbiAgICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIG51bWJlcnNcbiAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDLmFwcGx5KG51bGwsYXJncykpO1xuICAgIH1cbiAgfVxuXG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlRm9ybWF0dGVyIl19
