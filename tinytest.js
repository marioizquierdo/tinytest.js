// bind this context to a method (from coffeescript __bind)
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

// class Tinytest
var Tinytest = (function() {
  function Tinytest() {
    this.report = new TinytestReport(); // Default report

    // Bind scopes to ensure "this" keeps being "this"
    this.test = __bind(this.test, this);
  }
  var def = Tinytest.prototype;

  def.setup = function() {};    // override to execute before each test
  def.teardown = function() {}; // override to execute after each test

  // Name a test case and group some assertions on it
  def.test = function(title, testFunc) {
    try {
      this.setup(); // execute before each test
      testFunc();
    } catch (err) {
      if (typeof err === 'object' && err.message && err.message == 'tinytest failure') {
        var failure = {
          testTitle: title,
          reason: err.reason
        };
        this.report.failures.push(failure); // special error used to catch assert failures
      } else {
        throw err; // there was an unexpected error
      }
    } finally {
      this.report.tests++; // ensure count tests
      this.teardown(); // execute after each test
    }
  };

  return Tinytest;
})();

// Human readable Stirng representation of the object (or number or string)
// You can replace this function with a more powerfull pretty printer.
Tinytest.prettyPrint = function(obj) {
  if (typeof obj === 'object') {
    return typeof JSON !== 'undefined' ? JSON.stringify(obj) : ""+obj; // show objects as JSON (if JSON lib is available)
  } else if (typeof obj === 'string') {
    return '"' + obj + '"'; // show strings with quotes
  } else {
    return "" + obj; // other types will show as they are
  }
}

// class TinyTestExpect
// Used by the function expect
var TinyTestExpect = (function(){
  var matchers, i;
  matchers = ['toBe', 'toNotBe', 'toMatch', 'toNotMatch', 'toBeDefined', 'toBeUndefined', 'toBeNull', 'toBeNaN', 'toBeTruthy', 'toBeFalsy', 'toThrowError']

  function TinyTestExpect(actual) {
    this.actual = actual;

    // Bind all matcher methods to not loose "this" context
    for (i in matchers) {
      (function() {
        var matcher = matchers[i];
        this[matcher] = __bind(this[matcher], this);
        this['_' + matcher] = __bind('_' + matcher, this);
      })();
    }
  }
  var def = TinyTestExpect.prototype;

  // Define matcher methods: #toBe, #toNotBe, #toBeUndefined, etc..
  for (i in matchers) {
    (function() { // use closure to keep the matcher variable inside the method implementation
      var matcher = matchers[i];
      def[matcher] = function(expected) {
        if (!this['_' + matcher](expected)) { // use matcher conditionals (_toBe, _toMatch, _toBeUndefined) to get true or false
          err = new Error('tinytest failure');
          err.reason = "expected " + Tinytest.prettyPrint(this.actual) + " " + matcher
          if (expected !== void 0) err.reason += " " + Tinytest.prettyPrint(expected)
          throw err; // that will be catched by Tinytest#test method
        }
      };
    })()
  }

  // Matcher conditionals
  def._toBe = function(expected)       { return this.actual === expected; };
  def._toNotBe = function(expected)    { return this.actual !== expected; };
  def._toMatch = function(expected)    { return new RegExp(expected).test(this.actual); };
  def._toNotMatch = function(expected) { return !(new RegExp(expected).test(this.actual)); };
  def._toBeDefined = function()        { return this.actual !== void 0; };
  def._toBeUndefined = function()      { return this.actual === void 0; };
  def._toBeNull = function()           { return (this.actual === null); };
  def._toBeNaN = function()            { return (this.actual !== this.actual); };
  def._toBeTruthy = function()         { return !!this.actual; };
  def._toBeFalsy = function()          { return !this.actual; };
  def._toThrowError = function() {
    try {
      this.actual(); // actuall is a callback function, that should throw an error
    } catch (err) {
      return err; // use the returned error to add more expectations if needed
    }
    return false; // no error => expectation fail
  };

  return TinyTestExpect;
})();

// class TinytestReport
// Report is used to store failures and print results of a test suite
var TinytestReport = (function() {
  function TinytestReport() {
    this.tests = 0;
    this.failures = [];
  }
  var def = TinytestReport.prototype;

  def.toString = function() {
    var failure, str;
    str = '';
    for (i in this.failures) {
      failure = this.failures[i];
      str += 'Failure in "' + failure.testTitle + '"\n'; // failure test titles
      str += ' ' + failure.reason + '\n';
      str += '\n';
    }
    str += "" + this.tests + " tests"; // number of tests
    str += ", " + this.failures.length + " failures"; // number of failures
    str += this.failures.length === 0 ? ' [OK]' : ' [ERROR]'
    return str;
  },

  def.toHTML = function() {
    return this.toString().replace('\n', '<br/>'); // use BR tags instead of \n line-breaks
  }
  return TinytestReport;
})();

// Set Expectation (see TinyTestExpect for available matchers)
// Example: expect(true).toBe(true); expect(x).toBeDefined(); expect(1 > 2).toBeTruthy() ...
var expect = function(actual) {
  return new TinyTestExpect(actual);
}

// Keep assert function, it's still very simple to use for truth tests
var assert = function(condition) {
  expect(condition).toBeTruthy()
}

// EXPORT MODULE
// -------------

// Populate the global namespace with test functions.
// This is OK for a testing framework, because the test is the main file
var defineGlobalTest = function(context) {
  context.Tinytest    = Tinytest;
  context.tinytest    = new Tinytest();
  context.test        = context.tinytest.test;
  context.expect      = expect;
  context.assert      = assert;
}

// browser (non CommonJS environment)
if (typeof exports === 'undefined') {
  defineGlobalTest(window);

// node.js/require.js (with CommonJS)
} else {
  module.exports = defineGlobalTest; // require('tinytest')(this)
}