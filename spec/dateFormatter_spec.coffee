DateFormatter = require('../lib/dateFormatter.coffee')
_ = require('lodash')

describe "DateFormatter", ->
  dateFmt = null
  beforeEach ->
    dateFmt = new DateFormatter("2013-01-29")

  it 'It should exist', ->
    expect(dateFmt).toBeDefined()

  describe 'show create valid date from string', ->

    date_str = date_obj = null

    beforeEach ->
      date_str = '2015-01-18'
      date_obj = new Date(2015, 0, 18)

    it 'should throw an error if not a string', ->
      expect(()->
        dateFmt.dateFix(123)
      ).toThrowError("Not a string");

    it 'should return correct date', ->
      date = dateFmt.dateFix(date_str)
      expect(_.isDate(date)).toBeTruthy()
      expect(date.getTime()).toEqual(date_obj.getTime())

  describe 'show create valid dateTime from string', ->

    date_str = date_obj = null

    beforeEach ->
      date_str = '2015-01-18 16:44'
      date_obj = new Date(2015, 0, 18, 16, 44)

    it 'should throw an error if not a string', ->
      expect(()->
        dateFmt.dateTimeFix(123)
      ).toThrowError("Not a string");

    it 'should return correct date', ->
      date = dateFmt.dateTimeFix(date_str)
      expect(_.isDate(date)).toBeTruthy()
      expect(date.getTime()).toEqual(date_obj.getTime())

  describe 'fixTime', ->

    it 'should add a 0 if < 10', ->
      mins = dateFmt.fixTime(5)
      expect(mins).toEqual("05")

    it 'should add a 0 if < 10', ->
      mins = dateFmt.fixTime(15)
      expect(mins).toEqual("15")

  describe 'set12Hour', ->

    it 'should set to am if < 12', ->
      hour = dateFmt.set12Hour(10)
      expect(hour).toEqual(10)
      expect(dateFmt.AMPM).toEqual('am')

    it 'should set to pm if > 12', ->
      hour = dateFmt.set12Hour(16)
      expect(hour).toEqual(4)
      expect(dateFmt.AMPM).toEqual('pm')

  describe 'formatDate', ->

    date_str = date_obj = null

    beforeEach ->
      spyOn(dateFmt, "fixTime").and.callThrough()
      spyOn(dateFmt, "set12Hour").and.callThrough()
      date_obj = new Date(2015, 0, 18, 16, 44, 44)

    it 'should throw an error if formatter not a string', ->
      expect(()->
        dateFmt.formatDate(date_obj, 123)
      ).toThrowError("date format not a string");

    it 'should throw an error if not a date', ->
      expect(()->
        dateFmt.formatDate(123, "%Y")
      ).toThrowError("is not date");

    it 'show full year', ->
      fmt = dateFmt.formatDate(date_obj, "%Y")
      expect(fmt).toEqual("2015")

    it 'show year', ->
      fmt = dateFmt.formatDate(date_obj, "%y")
      expect(fmt).toEqual("15")

    it 'show month', ->
      fmt = dateFmt.formatDate(date_obj, "%m")
      expect(fmt).toEqual("1")

    it 'show month text full', ->
      fmt = dateFmt.formatDate(date_obj, "%B")
      expect(fmt).toEqual("January")

    it 'show month text short', ->
      fmt = dateFmt.formatDate(date_obj, "%b")
      expect(fmt).toEqual("Jan")

    it 'show date', ->
      fmt = dateFmt.formatDate(date_obj, "%d")
      expect(fmt).toEqual("18")

    it 'show day text short', ->
      fmt = dateFmt.formatDate(date_obj, "%a")
      expect(fmt).toEqual("Sun")

    it 'show day text long', ->
      fmt = dateFmt.formatDate(date_obj, "%A")
      expect(fmt).toEqual("Sunday")

    it 'show hours', ->
      fmt = dateFmt.formatDate(date_obj, "%H")
      expect(fmt).toEqual("16")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate(date_obj, "%H")
      expect(fmt).toEqual("09")

    it 'show hours in AM/PM', ->
      fmt = dateFmt.formatDate(date_obj, "%-l%p")
      expect(fmt).toEqual("4pm")
      expect(dateFmt.set12Hour).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate(date_obj, "%-l%p")
      expect(fmt).toEqual("9am")

    it 'show minutes', ->
      fmt = dateFmt.formatDate(date_obj, "%M")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setMinutes(9)
      fmt = dateFmt.formatDate(date_obj, "%M")
      expect(fmt).toEqual("09")

    it 'show seconds', ->
      # date_obj.setSeconds(44)
      fmt = dateFmt.formatDate(date_obj, "%S")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setSeconds(9)
      fmt = dateFmt.formatDate(date_obj, "%S")
      expect(fmt).toEqual("09")






    # it 'should add a 0 if < 10', ->
    #   mins = dateFmt.fixMinutes(5)
    #   expect(mins).toEqual("05")

    # it 'should add a 0 if < 10', ->
    #   mins = dateFmt.fixMinutes(15)
    #   expect(mins).toEqual("15")








