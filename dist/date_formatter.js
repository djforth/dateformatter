(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/dateFormatter.es6.js":[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DateFormatter = (function () {
  function DateFormatter() {
    _classCallCheck(this, DateFormatter);

    this.date = null;
    this.AMPM = "am";
    this.SHORT_DAYS = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
    this.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.SHORT_MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    this.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  }

  _prototypeProperties(DateFormatter, null, {
    dateFix: {
      value: function dateFix(date_str) {
        var date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})*$/;

        if (this.isString(date_str)) {
          var matches = date_str.match(date_regex);

          if (matches) {
            var year = parseInt(matches[1]);
            var month = parseInt(matches[2], 10) - 1;
            var _date = parseInt(matches[3], 10);

            return new Date(year, month, _date);
          };
        }

        return "Not valid";
      },
      writable: true,
      configurable: true
    },
    dateTimeFix: {
      value: function dateTimeFix() {
        var date_regex = /^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\s*$/;

        if (this.isString(date_str)) {
          var matches = date_str.match(date_regex);

          if (matches) {
            var year = parseInt(matches[1]);
            var month = parseInt(matches[2], 10) - 1;
            var _date = parseInt(matches[3], 10);

            _date = new Date(year, month, _date);
            _date.setHours(matches[4], matches[5], 0, 0);

            return _date;
          };
        }

        return "Not valid";
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
        if (this.isDate(arguments[0])) {
          var _date = arguments[0];
        }

        if (this.isString(arguments[1])) {
          var _fmt = arguments[1];
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

        fmt;
      },
      writable: true,
      configurable: true
    },
    isDate: {
      value: function isDate(d) {
        if (Object.prototype.toString.call(d) === "[object Date]") {
          return true;
        } else {
          throw new Error("Not a string");
          return false;
        }
      },
      writable: true,
      configurable: true
    },
    isString: {
      value: function isString(str) {
        if (Object.prototype.toString.call(str) === "[object String]") {
          return true;
        } else {
          throw new Error("Not a string");
          return false;
        }
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
    }
  });

  return DateFormatter;
})();

module.exports = DateFormatter;

},{}]},{},["./lib/dateFormatter.es6.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2RhdGVmb3JtYXR0ZXIvbGliL2RhdGVGb3JtYXR0ZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0lDRU0sYUFBYTtBQUVOLFdBRlAsYUFBYTswQkFBYixhQUFhOztBQUdmLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0FBQ2hCLFFBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFHLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUN4RSxRQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUE7QUFDM0YsUUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDL0csUUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7R0FDeEk7O3VCQVRHLGFBQWE7QUFXakIsV0FBTzthQUFBLGlCQUFDLFFBQVEsRUFBQztBQUNmLFlBQUksVUFBVSxHQUFHLCtC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QUFDLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRTNELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7O0FBRXJELFdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTs7QUFFdkMsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFdkQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQTs7QUFFakQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQTs7QUFFdkQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQTs7QUFFMUQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUUsQ0FBQTs7QUFFekQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUUsQ0FBQTs7QUFFekQsV0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs7QUFFbEMsV0FBRyxDQUFBO09BQ0o7Ozs7QUFJRCxVQUFNO2FBQUEsZ0JBQUMsQ0FBQyxFQUFDO0FBQ1AsWUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssZUFBZSxFQUFDO0FBQ3ZELGlCQUFPLElBQUksQ0FBQztTQUNaLE1BQU07QUFDTixnQkFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoQyxpQkFBTyxLQUFLLENBQUM7U0FDYjtPQUNIOzs7O0FBRUQsWUFBUTthQUFBLGtCQUFDLEdBQUcsRUFBQztBQUNWLFlBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLGlCQUFpQixFQUFDO0FBQzVELGlCQUFPLElBQUksQ0FBQztTQUNaLE1BQU07QUFDTixnQkFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoQyxpQkFBTyxLQUFLLENBQUM7U0FDYjtPQUNIOzs7O0FBRUQsYUFBUzthQUFBLG1CQUFDLElBQUksRUFBQztBQUNiLFlBQUksQ0FBQyxJQUFJLEdBQUcsQUFBQyxJQUFJLEdBQUcsRUFBRSxHQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDdEMsWUFBRyxJQUFJLElBQUksRUFBRSxFQUFDO0FBQ1osaUJBQU8sSUFBSSxDQUFBO1NBQ1osTUFBTTtBQUNMLGlCQUFPLElBQUksR0FBRyxFQUFFLENBQUE7U0FDakI7T0FDRjs7Ozs7O1NBN0hHLGFBQWE7OztBQWtJbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXG5cbmNsYXNzIERhdGVGb3JtYXR0ZXIge1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5kYXRlID0gbnVsbFxuICAgIHRoaXMuQU1QTSA9IFwiYW1cIlxuICAgIHRoaXMuU0hPUlRfREFZUyA9IFtcIlN1blwiLCBcIk1vblwiLCBcIlR1ZXNcIiwgXCJXZWRzXCIsIFwiVGh1cnNcIiwgIFwiRnJpXCIsIFwiU2F0XCJdXG4gICAgdGhpcy5EQVlTID0gW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsICBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG4gICAgdGhpcy5TSE9SVF9NT05USFMgPSBbJ0phbicsICdGZWInLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddXG4gICAgdGhpcy5NT05USFMgPSBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG4gIH1cblxuICBkYXRlRml4KGRhdGVfc3RyKXtcbiAgICBsZXQgZGF0ZV9yZWdleCA9IC9eXFxzKihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pKiQvO1xuXG4gICAgaWYodGhpcy5pc1N0cmluZyhkYXRlX3N0cikpe1xuICAgICAgbGV0IG1hdGNoZXMgPSBkYXRlX3N0ci5tYXRjaChkYXRlX3JlZ2V4KTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgbGV0IHllYXIgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApIC0gMTtcbiAgICAgICAgbGV0IGRhdGUgPSBwYXJzZUludChtYXRjaGVzWzNdLCAxMCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiTm90IHZhbGlkXCJcbiAgfVxuXG4gIGRhdGVUaW1lRml4KCl7XG4gICAgbGV0IGRhdGVfcmVnZXggPSAvXlxccyooXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVxccyhcXGR7Mn0pOihcXGR7Mn0pXFxzKiQvO1xuXG4gICAgaWYodGhpcy5pc1N0cmluZyhkYXRlX3N0cikpe1xuICAgICAgbGV0IG1hdGNoZXMgPSBkYXRlX3N0ci5tYXRjaChkYXRlX3JlZ2V4KTtcblxuICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgbGV0IHllYXIgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICAgICAgbGV0IG1vbnRoID0gcGFyc2VJbnQobWF0Y2hlc1syXSwgMTApIC0gMTtcbiAgICAgICAgbGV0IGRhdGUgPSBwYXJzZUludChtYXRjaGVzWzNdLCAxMCk7XG5cbiAgICAgICAgZGF0ZSA9ICBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG4gICAgICAgIGRhdGUuc2V0SG91cnMobWF0Y2hlc1s0XSxtYXRjaGVzWzVdLCAwLCAwKTtcblxuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIFwiTm90IHZhbGlkXCJcbiAgfVxuXG4gIGZpeFRpbWUodCl7XG4gICAgaWYoU3RyaW5nKHQpLmxlbmd0aCA8IDIpe1xuICAgICAgcmV0dXJuIFwiMFwiICsgdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFN0cmluZyh0KTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXREYXRlKCl7XG4gICAgaWYodGhpcy5pc0RhdGUoYXJndW1lbnRzWzBdKSl7XG4gICAgICBsZXQgZGF0ZSA9IGFyZ3VtZW50c1swXTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmlzU3RyaW5nKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgbGV0IGZtdCA9IGFyZ3VtZW50c1sxXTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vanNwZXJmLmNvbS9kYXRlLWZvcm1hdHRpbmcyXG4gICAgLy8gWWVhclxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJXlcIiwgZGF0ZS5nZXRZZWFyKCkgLSAxMDApXG4gICAgLy8gRnVsbCBZZWFyXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlWVwiLCBkYXRlLmdldEZ1bGxZZWFyKCkpXG4gICAgLy8gU2V0IE51bWJlcmVkIE1vbnRoXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlbVwiLCBkYXRlLmdldE1vbnRoKCkrMSlcbiAgICAvLyBTZXQgU2hvcnQgTW9udGhcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiViXCIsIHRoaXMuU0hPUlRfTU9OVEhTW2RhdGUuZ2V0TW9udGgoKV0pXG4gICAgLy8gU2V0IE1vbnRoXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlQlwiLCB0aGlzLk1PTlRIU1tkYXRlLmdldE1vbnRoKCldKVxuICAgIC8vIFNldCBEYXRlXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlZFwiLCBkYXRlLmdldERhdGUoKSlcbiAgICAvLyBTZXQgU2hvcnQgRGF5XG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlYVwiLCB0aGlzLlNIT1JUX0RBWVNbZGF0ZS5nZXREYXkoKV0pXG4gICAgLy8gU2V0IERheVxuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJUFcIiwgdGhpcy5EQVlTW2RhdGUuZ2V0RGF5KCldKVxuICAgIC8vIFNldCBIb3VycyAtIDI0XG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlSFwiLCB0aGlzLmZpeFRpbWUoZGF0ZS5nZXRIb3VycygpKSApXG4gICAgLy8gU2V0IEhvdXJzIC0gMTJcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiUtbFwiLCB0aGlzLnNldDEySG91cihkYXRlLmdldEhvdXJzKCkpIClcbiAgICAvLyBTZXQgTWluc1xuICAgIGZtdCA9IGZtdC5yZXBsYWNlKFwiJU1cIiwgdGhpcy5maXhUaW1lKGRhdGUuZ2V0TWludXRlcygpKSApXG4gICAgLy8gU2V0IFNlY3NcbiAgICBmbXQgPSBmbXQucmVwbGFjZShcIiVTXCIsIHRoaXMuZml4VGltZShkYXRlLmdldFNlY29uZHMoKSkgKVxuICAgIC8vIFNldCBBTVBNXG4gICAgZm10ID0gZm10LnJlcGxhY2UoXCIlcFwiLCB0aGlzLkFNUE0pXG5cbiAgICBmbXRcbiAgfVxuXG5cblxuICBpc0RhdGUoZCl7XG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGQpID09PSBcIltvYmplY3QgRGF0ZV1cIil7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBhIHN0cmluZ1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgfVxuICB9XG5cbiAgaXNTdHJpbmcoc3RyKXtcbiAgICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cikgPT09IFwiW29iamVjdCBTdHJpbmddXCIpe1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgYSBzdHJpbmdcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgIH1cbiAgfVxuXG4gIHNldDEySG91cihob3VyKXtcbiAgICB0aGlzLkFNUE0gPSAoaG91ciA8IDEyKSA/IFwiYW1cIiA6IFwicG1cIjtcbiAgICBpZihob3VyIDw9IDEyKXtcbiAgICAgIHJldHVybiBob3VyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBob3VyIC0gMTJcbiAgICB9XG4gIH1cblxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZUZvcm1hdHRlciJdfQ==
