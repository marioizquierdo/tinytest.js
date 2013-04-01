// Tinytest is tested with Tinytest °O°
// Just run this file with node.js and check the output: node test/tinytest_test.js
var tinytest = require('tinytest');
var test   = tinytest.test;
var assert = tinytest.assert;
var report;

test('single assert with true expression', function() {
  report = tinytest.newReport();
  test('true', function() { assert(true) }, report);
  test('one is one', function(){ assert(1 === 1); }, report);

  assert(report.tests === 2);
  assert(report.failures.length === 0);
});

test('single assert with false expression', function() {
  report = tinytest.newReport();
  test('false', function() { assert(false) }, report);
  test('one is two', function() { assert(1 === 2) }, report);

  assert(report.tests === 2);
  assert(report.failures.length === 2);
});

test('failure is the test title', function() {
  report = tinytest.newReport();
  test('test title', function() {
    assert(false);
  }, report);

  assert(report.failures[0] == 'test title');
});

test('multiple asserts in the same test', function() {
  report = tinytest.newReport();
  test('with two asserts inside', function() {
    assert(true);
    assert(true);
  }, report);

  assert(report.tests === 1); // multiple asserts count just like one test
  assert(report.failures.length === 0);
});

test('multiple asserts in the same test, one assert fails', function() {
  report = tinytest.newReport();
  test('with two asserts inside', function() {
    assert(true);
    assert(false);
    assert(true);
  }, report);

  assert(report.tests === 1);
  assert(report.failures.length === 1);
  assert(report.failures[0], 'with two asserts inside');
});

test('nested test functions with no failures', function() {
  report = tinytest.newReport();
  test('root test', function(){
    test('child test 1', function(){ assert(true); }, report);
    test('child test 2', function(){ assert(true); }, report);
    assert(true);
  }, report);

  assert(report.tests === 3); // it counts root and nested tests
  assert(report.failures.length === 0); // no failures
});

test('nested test functions with failures', function() {
  report = tinytest.newReport();
  test('root test', function(){
    test('child test 1', function(){ assert(false); }, report);
    test('child test 2', function(){ assert(false); }, report);
    assert(false);
  }, report);

  assert(report.tests === 3); // it counts root and nested tests
  assert(report.failures.length === 3); // no failures
  assert(report.failures[0] == 'child test 1'); // first assertion to fail is added first in the failures list
});

test('division by zero should throw an exeption', function(){
  1 / 0;
});


console.log(tinytest.report.toString());