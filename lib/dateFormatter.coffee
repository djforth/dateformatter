'use strict'

_ = require('lodash')

module.exports = class DateFormatter
  date:null
  AMPM = "am"
  SHORT_DAYS:["Sun", "Mon", "Tues", "Weds", "Thurs",  "Fri", "Sat"]
  DAYS:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",  "Friday", "Saturday"]
  SHORT_MONTHS:['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  MONTHS:['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']

  formatDate:()->
    date = arguments[0] if _.isDate(arguments[0])
    fmt  = arguments[1] if _.isString(arguments[1])


    throw new Error("date format not a string") unless _.isString(fmt)

    throw new Error("is not date") unless _.isDate(date)
    # http://jsperf.com/date-formatting2
    #Year
    fmt = fmt.replace("%y", date.getYear() - 100)
    #Full Year
    fmt = fmt.replace("%Y", date.getFullYear())
    #Set Numbered Month
    fmt = fmt.replace("%m", date.getMonth()+1)
    #Set Short Month
    fmt = fmt.replace("%b", @SHORT_MONTHS[date.getMonth()])
    #Set Month
    fmt = fmt.replace("%B", @MONTHS[date.getMonth()])
    # Set Date
    fmt = fmt.replace("%d", date.getDate())
    # Set Short Day
    fmt = fmt.replace("%a", @SHORT_DAYS[date.getDay()])
    # Set Day
    fmt = fmt.replace("%A", @DAYS[date.getDay()])
    # Set Hours - 24
    fmt = fmt.replace("%H", @fixTime(date.getHours()) )
    # Set Hours - 12
    fmt = fmt.replace("%-l", @set12Hour(date.getHours()) )
    # Set Mins
    fmt = fmt.replace("%M", @fixTime(date.getMinutes()) )
    # Set Secs
    fmt = fmt.replace("%S", @fixTime(date.getSeconds()) )
    #Set AMPM
    fmt = fmt.replace("%p", @AMPM)

    fmt

  # Sets date across browser
  dateFix:(d)->

    throw new Error("Not a string") unless _.isString d
    matches = d.match(/^\s*(\d{4})-(\d{2})-(\d{2})*$/)

    if(matches)
      year = parseInt(matches[1])
      month = parseInt(matches[2], 10) - 1
      date = parseInt(matches[3], 10)
      new_date = new Date(year, month, date)

    new_date

  dateTimeFix:(d)->
    throw new Error("Not a string") unless _.isString d
    matches = d.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2})\s*$/);
    if(matches)
      year = parseInt(matches[1])
      month = parseInt(matches[2], 10) - 1
      d = parseInt(matches[3], 10)
      new_date = new Date(year, month, d)
      new_date.setHours(matches[4],matches[5], 0, 0)

    new_date

  # fixMinutes:(min)->
  #   if String(min).length < 2
  #     return "0" + min
  #   else
  #     return String(min)

  fixTime:(t)->
    if String(t).length < 2
      return "0" + t
    else
      return String(t)


  set12Hour:(hour)->
    @AMPM = if hour < 12 then "am" else "pm"
    if hour <= 12
      return hour
    else
      return hour - 12

