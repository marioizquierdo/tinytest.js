// Tinytest is tested with Tinytest °O°
// Just run this file with node.js and check the output: node test/tinytest_test.js

if (typeof global != 'undefined') require('tinytest')(global); // node.js (CommonJS) only, in a browser just run tinytest.js script before
var sub; // used as "sub-test", to not interfere with the global tinytest, allows to assert in the sub-test report

tinytest.setup = function() {
  sub = new Tinytest();
}

test('single assert with true expression', function() {
  sub.test('true', function() { assert(true); });
  sub.test('one is one', function(){ expect(1).toBe(1); });

  expect(sub.report.tests).toBe(2);
  expect(sub.report.failures.length).toBe(0);
});

test('single assert with false expression', function() {
  sub.test('false', function() { assert(false) });
  sub.test('one is two', function() { assert(1 === 2) });

  expect(sub.report.tests).toBe(2);
  expect(sub.report.failures.length).toBe(2);
});

test('failure is the test title', function() {
  sub.test('test title', function() { assert(false); });

  expect(sub.report.failures[0].testTitle).toBe('test title');
});

test('multiple asserts in the same test', function() {
  sub.test('with two asserts inside', function() {
    assert(true);
    assert(true);
  });

  expect(sub.report.tests).toBe(1); // multiple asserts count just like one test
  expect(sub.report.failures.length).toBe(0);
});

test('multiple asserts in the same test, one assert fails', function() {
  sub.test('with two asserts inside', function() {
    assert(true);
    assert(false);
    assert(true);
  });

  expect(sub.report.tests).toBe(1);
  expect(sub.report.failures.length).toBe(1);
  expect(sub.report.failures[0].testTitle).toBe('with two asserts inside');
});

test('nested test functions with no failures', function() {
  sub.test('root test', function(){
    sub.test('child test 1', function(){ assert(true); });
    sub.test('child test 2', function(){ assert(true); });
    assert(true);
  });

  expect(sub.report.tests).toBe(3); // it counts root and nested tests
  expect(sub.report.failures.length).toBe(0); // no failures
});

test('nested test functions with failures', function() {
  sub.test('root test', function(){
    sub.test('child test 1', function(){ assert(false); });
    sub.test('child test 2', function(){ assert(false); });
    assert(false);
  });

  expect(sub.report.tests).toBe(3); // it counts root and nested tests
  expect(sub.report.failures.length).toBe(3); // no failures
  expect(sub.report.failures[0].testTitle).toBe('child test 1'); // first assertion to fail is added first in the failures list
});

test("The 'toBe' matcher compares with ===", function() {
  var a = 12;
  var b = a;
  expect(a).toBe(b);
  expect(a).toNotBe(null);
});

test("The 'toMatch' matcher is for regular expressions", function() {
  var message = 'foo bar baz';

  expect(message).toMatch(/bar/);
  expect(message).toMatch('bar');
  expect(message).toNotMatch(/quux/);
});

test("The 'toBeDefined' matcher compares against `undefined`", function() {
  var a = {
    foo: 'foo'
  };
  expect(a.foo).toBeDefined();
  expect(a.bar).toBeUndefined();
});

test("The 'toBeNull' matcher compares against null", function() {
  var a = null;
  var foo = 'foo';
  expect(null).toBeNull();
  expect(a).toBeNull();
  expect(foo).toNotBeNull();
});

test("The 'toBeTruthy' matcher is for boolean casting testing", function() {
  var foo = 'foo';
  expect(foo).toBeTruthy();
});

test("The 'toBeFalsy' matcher is for boolean casting testing", function() {
  var a;
  expect(a).toBeFalsy();
});

test("The 'toThrowError' matcher is for testing if a function throws an exception", function() {
  var foo = function() { return nonexistingvariable + 1; } // raises an error
  var error = expect(foo).toThrowError(); // save error to add more assertions on it
  expect(error.message).toBe('nonexistingvariable is not defined');
});

test("The 'toThrowError' matcher fails if the exception is not thrown", function() {
  var foo = function() { return 1 + 2; }; // no error raised
  sub.test('foo should thow an error', function() {
    expect(foo).toThrowError(); // this should fail
  });
  expect(sub.report.tests).toBe(1);
  expect(sub.report.failures.length).toBe(1);
  expect(sub.report.failures[0].reason).toBe("expected function toThrowError");
});

test('setup is called on each test case', function() {
  var counter = 0;
  sub.setup = function() { counter ++; }
  sub.test('counter plus', function(){
    expect(counter).toBe(1);
  });
  sub.test('counter plus', function(){
    expect(counter).toBe(2);
  });

  expect(sub.report.tests).toBe(2);
  expect(sub.report.failures.length).toBe(0);
  expect(counter).toBe(2);
});

test('teardown is called after each test case', function() {
  var counter = 0;
  sub.teardown = function() { counter ++; }
  sub.test('counter plus', function(){
    expect(counter).toBe(0); // teardown still not called
  });
  sub.test('counter plus', function(){
    expect(counter).toBe(1);
  });

  expect(sub.report.tests).toBe(2);
  expect(sub.report.failures.length).toBe(0);
  expect(counter).toBe(2);
})

console.log(tinytest.report.toString());