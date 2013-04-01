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
      if (err === 'tinytest failure') {
        this.report.failures.push(title); // special error used to catch assert failures
      } else {
        throw err; // there was an unexpected error
      }
    } finally {
      this.report.tests++; // ensure count tests
      this.teardown(); // execute after each test
    }
  };

  // Check that some expression is true. Use inside a testFunc.
  def.assert = function(expr) {
    if (!expr) throw 'tinytest failure';
  };

  // Check that a exception is thrown.
  def.assertError = function(testFunc) {
    try {
      testFunc();
    } catch (err) {
      return err; // use the returned error to assert the error object
    }
    def.assert(false); // expected error not thrown
  };

  return Tinytest;
})();

// Report is used to store failures and print results of a test suite
var TinytestReport = (function() {
  function TinytestReport() {
    this.tests = 0;
    this.failures = [];
  }
  var def = TinytestReport.prototype;

  def.toString = function() {
    var str = '';
    for (i in this.failures) str += 'Failure in "' + this.failures[i] + '"\n'; // failure test titles
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

// Method to populate the global namespace with test functions.
// This is OK for a testing framework, because the test is the main file
var defineGlobalTest = function(context) {
  context.Tinytest    = Tinytest;
  context.tinytest    = new Tinytest();
  context.test        = context.tinytest.test;
  context.assert      = context.tinytest.assert;
  context.assertError = context.tinytest.assertError;
}

// browser (non CommonJS environment)
if (typeof exports === 'undefined') {
  defineGlobalTest(window);

// node.js/require.js (with CommonJS)
} else {
  module.exports = defineGlobalTest; // require('tinytest')(this)
}