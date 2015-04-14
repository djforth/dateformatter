var DateFormatter = require('../lib/dateFormatter.es6.js')

var _ = require('lodash')

describe('DateFormatter', function(){
  let dateFmt;

  beforeEach(function(){
    dateFmt = new DateFormatter('2015-01-18');
  })

  it('It should exist', function(){
    expect(dateFmt).toBeDefined()
  })

  describe('create date', function() {

    it("should add date if passed as date", function() {
      dateFmt = new DateFormatter(new Date(2015,0,18,16,44));
      expect(dateFmt.getDate()).toEqual(new Date(2015,0,18,16,44))
    });

    it("should create date on creation if numbers", function() {
      dateFmt = new DateFormatter(2015,0,18,16,44);
      expect(dateFmt.getDate()).toEqual(new Date(2015,0,18,16,44))
    });

    it("should create date on creation if string with -", function() {
      dateFmt = new DateFormatter('2015-01-18');
      expect(dateFmt.getDate()).toEqual(new Date(2015,0,18))
    });

    it("should create dateTime on creation if string with -", function() {
      dateFmt = new DateFormatter('2015-01-18 09:00');
      expect(dateFmt.getDate()).toEqual(new Date(2015,0,18, 9))
    });


    it("should create date on creation if string with slash ", function() {
      dateFmt = new DateFormatter('2015/01/18');
      expect(dateFmt.getDate()).toEqual(new Date(2015,0,18))
    });
  });

  describe('show create valid date from string', function(){

    let date_str,
        date_obj,
        time_str,
        time_obj,
        time2_str,
        time2_obj,
        time3_str,
        time3_obj;

    beforeEach(function(){
      date_str = '2015-01-18';
      date_obj = new Date(2015, 0, 18);

      time_str = '2015-01-18 16:44'
      time_obj = new Date(2015, 0, 18, 16, 44)

      time2_str = '2015-01-18 16:44:33'
      time2_obj = new Date(2015, 0, 18, 16, 44, 33)

      time3_str = '2015-01-18 09:44:33'
      time3_obj = new Date(2015, 0, 18, 9, 44, 33)

    })


    it('should throw an error if malformed string', function(){
      expect(function(){
        dateFmt.dateFix("test")
      }).toThrowError("Date is malformed");
    })

    it('should return correct date', function(){
      let date = dateFmt.dateFix(date_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(date_obj.getTime());
    })

    it('should return correct date', function(){
      let date = dateFmt.dateFix(time_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(time_obj.getTime());
    })

    it('should return correct date', function(){
      let date = dateFmt.dateFix(time2_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(time2_obj.getTime());
    })

    it('should return correct date', function(){
      let date = dateFmt.dateFix(time3_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(time3_obj.getTime());
    })
  });

  describe('fixTime', function(){

    it('should add a 0 if < 10', function(){
      let mins = dateFmt.fixTime(5)
      expect(mins).toEqual("05")
    })

    it('should add a 0 if < 10', function(){
      let mins = dateFmt.fixTime(15)
      expect(mins).toEqual("15")
    })
  });


  describe('formatDate', function(){

    let date_str, date_obj;

    beforeEach(function(){
      spyOn(dateFmt, "fixTime").and.callThrough()
      spyOn(dateFmt, "set12Hour").and.callThrough()
      date_obj = new Date(2015, 0, 18, 16, 44, 44)
      dateFmt.date = date_obj
    })

    it('show full year', function(){
      let fyr = dateFmt.formatDate("%Y")
      expect(fyr).toEqual("2015")
    });

    it('show year', function(){
      let yr = dateFmt.formatDate("%y")
      expect(yr).toEqual("15")
    });

    it('show month with 0', function(){
      let fmt = dateFmt.formatDate("%m")
      expect(fmt).toEqual("01")
    });

    it('show month without 0', function(){
      let fmt = dateFmt.formatDate("%-m")
      expect(fmt).toEqual("1")
    });

    it('show month text full', function(){
      let fmt = dateFmt.formatDate("%B")
      expect(fmt).toEqual("January")
    });

    it('show month text short', function(){
      let fmt = dateFmt.formatDate("%b")
      expect(fmt).toEqual("Jan")
    });

    it('show date with 0', function(){
      date_obj.setDate(9)
      let fmt = dateFmt.formatDate("%d")
      expect(fmt).toEqual("09")
    });

    it('show date without', function(){
      date_obj.setDate(9)
      let fmt = dateFmt.formatDate("%-d")
      expect(fmt).toEqual("9")
    });


    it('show day text short', function(){
      let fmt = dateFmt.formatDate("%a")
      expect(fmt).toEqual("Sun")
    });

    it('show day text long', function(){
      let fmt = dateFmt.formatDate("%A")
      expect(fmt).toEqual("Sunday")
    });

    it('show hours', function(){
      let fmt = dateFmt.formatDate("%H")
      expect(fmt).toEqual("16")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate("%H")
      expect(fmt).toEqual("09")
    });

    it('show hours in AM/PM', function(){
      let fmt = dateFmt.formatDate("%-l%p")
      expect(fmt).toEqual("4pm")
      expect(dateFmt.set12Hour).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate("%-l%p")
      expect(fmt).toEqual("9am")
    });

    it('show minutes with 0', function(){
      let fmt = dateFmt.formatDate("%M")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setMinutes(9)
      fmt = dateFmt.formatDate("%M")
      expect(fmt).toEqual("09")
    });

    it('show minutes without 0', function(){
      let fmt = dateFmt.formatDate("%-M")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setMinutes(9)
      fmt = dateFmt.formatDate("%-M")
      expect(fmt).toEqual("9")
    });

    it('show seconds', function(){
      let fmt = dateFmt.formatDate("%S")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setSeconds(9)
      fmt = dateFmt.formatDate("%S")
      expect(fmt).toEqual("09")
    });

    it('show seconds without 0', function(){
      let fmt = dateFmt.formatDate("%s")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setSeconds(9)
      fmt = dateFmt.formatDate("%s")
      expect(fmt).toEqual("9")
    });

    it("should format all date chained", function() {
      let fmt = dateFmt.formatDate("%A, %d %B %Y at %-l:%M%p.")
      expect(fmt).toEqual("Sunday, 18 January 2015 at 4:44pm.")
    });

  });


  describe('checks if Date or string', function() {
    it("throw an error if not a Date", function() {
      expect(dateFmt.isDate(123)).toBeFalsy();
    });

    it("return true if a Date", function() {
      expect(dateFmt.isDate(new Date())).toBeTruthy();
    });


    it("throw an error if not a String", function() {
      expect(dateFmt.isString(123)).toBeFalsy();
    });

    it("return true if a Date", function() {
      expect(dateFmt.isString("test")).toBeTruthy();
    });
  });





})
