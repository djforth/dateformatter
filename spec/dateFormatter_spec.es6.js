var DateFormatter = require('../lib/dateFormatter.es6.js')

var _ = require('lodash')

describe('DateFormatter', function(){
  let dateFmt;

  beforeEach(function(){
    dateFmt = new DateFormatter("2013-01-29");
  })

  it('It should exist', function(){
    expect(dateFmt).toBeDefined()
  })

  describe('show create valid date from string', function(){

    let date_str, date_obj;

    beforeEach(function(){
      date_str = '2015-01-18';
      date_obj = new Date(2015, 0, 18);
    })


    it('should throw an error if not a string', function(){
      expect(function(){
        dateFmt.dateFix(123)
      }).toThrowError("Not a string");
    })

    it('should return correct date', function(){
      let date = dateFmt.dateFix(date_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(date_obj.getTime());
    })
  });

  describe('show create valid dateTime from string', function(){

    let date_str, date_obj;

    beforeEach(function(){
      date_str = '2015-01-18 16:44'
      date_obj = new Date(2015, 0, 18, 16, 44)
    })


    it('show create valid dateTime from string', function(){
      expect(function(){
        dateFmt.dateTimeFix(123)
      }).toThrowError("Not a string");
    })

    it('should return correct date', function(){
      let date = dateFmt.dateTimeFix(date_str);
      expect(_.isDate(date)).toBeTruthy();
      expect(date.getTime()).toEqual(date_obj.getTime());
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
    })


    it('should throw an error if formatter not a string', function(){
      expect(function(){
        dateFmt.formatDate(date_obj, 123)
      }).toThrowError("Not a string");
    })

    it('should throw an error if not a date', function(){
      expect(function(){
        dateFmt.formatDate(123, "%Y")
      }).toThrowError("Not a date");
    });

    it('show full year', function(){
      let fyr = dateFmt.formatDate(date_obj, "%Y")
      expect(fyr).toEqual("2015")
    });

    it('show year', function(){
      let yr = dateFmt.formatDate(date_obj, "%y")
      expect(yr).toEqual("15")
    });

    it('show month', function(){
      let fmt = dateFmt.formatDate(date_obj, "%m")
      expect(fmt).toEqual("1")
    });

    it('show month text full', function(){
      let fmt = dateFmt.formatDate(date_obj, "%B")
      expect(fmt).toEqual("January")
    });

    it('show month text short', function(){
      let fmt = dateFmt.formatDate(date_obj, "%b")
      expect(fmt).toEqual("Jan")
    });

    it('show date', function(){
      let fmt = dateFmt.formatDate(date_obj, "%d")
      expect(fmt).toEqual("18")
    });

    it('show day text short', function(){
      let fmt = dateFmt.formatDate(date_obj, "%a")
      expect(fmt).toEqual("Sun")
    });

    it('show day text long', function(){
      let fmt = dateFmt.formatDate(date_obj, "%A")
      expect(fmt).toEqual("Sunday")
    });

    it('show hours', function(){
      let fmt = dateFmt.formatDate(date_obj, "%H")
      expect(fmt).toEqual("16")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate(date_obj, "%H")
      expect(fmt).toEqual("09")
    });

    it('show hours in AM/PM', function(){
      let fmt = dateFmt.formatDate(date_obj, "%-l%p")
      expect(fmt).toEqual("4pm")
      expect(dateFmt.set12Hour).toHaveBeenCalled()

      date_obj.setHours(9)
      fmt = dateFmt.formatDate(date_obj, "%-l%p")
      expect(fmt).toEqual("9am")
    });

    it('show minutes', function(){
      let fmt = dateFmt.formatDate(date_obj, "%M")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setMinutes(9)
      fmt = dateFmt.formatDate(date_obj, "%M")
      expect(fmt).toEqual("09")
    });

    it('show seconds', function(){
      let fmt = dateFmt.formatDate(date_obj, "%S")
      expect(fmt).toEqual("44")
      expect(dateFmt.fixTime).toHaveBeenCalled()

      date_obj.setSeconds(9)
      fmt = dateFmt.formatDate(date_obj, "%S")
      expect(fmt).toEqual("09")
    });

    it("should format all date chained", function() {
      let fmt = dateFmt.formatDate(date_obj, "%A, %d %B %Y at %-l:%M%p.")
      expect(fmt).toEqual("Sunday, 18 January 2015 at 4:44pm.")
    });

  });


  describe('checks if Date or string', function() {
    it("throw an error if not a Date", function() {
      expect(function(){
        dateFmt.isDate(123)
      }).toThrowError("Not a date");
    });

    it("return true if a Date", function() {
      expect(dateFmt.isDate(new Date())).toBeTruthy();
    });


    it("throw an error if not a String", function() {
      expect(function(){
        dateFmt.isString(123)
      }).toThrowError("Not a string");
    });

    it("return true if a Date", function() {
      expect(dateFmt.isString("test")).toBeTruthy();
    });
  });





})
