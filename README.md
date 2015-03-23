# Dateformatter
Utility For processing and formatting dates in javascript

## Install

Install via NPM

``` bash

npm install dateformatter

```

or via bower

``` bash

bower install dateformatter

```

## Setup

To parse a date string

``` javascript
  // yyyy-mm-dd hh:mm:ss
  // yyyy-mm-dd hh:mm
  // yyyy-mm-dd
  var datefmt = new DateFormatter("2015-01-28 16:44");

  //or as standard date str
  var datefmt = new DateFormatter("2015/01/28 16:44");

  //or as standard
  var datefmt = new DateFormatter(2015, 0, 28, 16,44);

  //or pass a date object
  var date = new Date(2015, 0, 28, 16,44)
  var datefmt = new DateFormatter(date);

```

# Methods

## Format Date
This is based on ruby's strftime and allows you to convert a date object into formatted string as required.

Options:

* %y - Year (e.g. 15)
* %Y - Full Year (e.g 2015)
* %m - Month (e.g 1)
* %b - Short Text month (e.g Jan)
* %B - Full month (e.g January)
* %d - Date (e.g 28)
* %a - Short Day (e.g. Sun)
* %A - Day (e.g. Sunday)
* %H - 24 Hours with 0 (e.g. 08)
* %h - 24 hour without 0 (e.g. 8)
* %-l - 12 hour (e.g. 8 or after 12 like 16:00 would be 4)
* %p - AM or PM
* %M - Mins with 0 (e.g. 09)
* %-M - Mins without 0 (e.g. 9)
* %S - seconds with 0 (e.g. 09)
* %s - seconds without 0 (e.g. 9)

So you can call something like this:

``` javascript
  var fmt = dateFmt.formatDate("%A, %d %B %Y at %-l:%M%p.")
  console.log(fmt) // Sunday, 18 January 2015 at 4:44pm.

```




# Bug reports

If you discover any bugs, feel free to create an issue on GitHub. Please add as much information as possible to help us fixing the possible bug. We also encourage you to help even more by forking and sending us a pull request.

https://github.com/djforth/urlparser/issues

## Contribute

If you'd like to contribute, URLParser is written using babel in ES6.

Please make sure any additional code should be covered in tests (Jasmine using karma).

If you need to run the test please use:

``` bash

gulp app:watch

```

or to rebuild the JS run:

``` bash

gulp build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

URLParser is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the URLParser project are licensed under MIT license.

