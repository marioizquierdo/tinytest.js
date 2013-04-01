// Tinytest is tested with Tinytest °O°
// Just run this file with node.js and check the output: node test/tinytest_test.js
require('tinytest')(global);
var sub; // used as "sub-test", to not interfere with the global tinytest, allows to assert in the sub-test report

tinytest.setup = function() {
  sub = new Tinytest();
}

test('single assert with true expression', function() {
  sub.test('true', function() { assert(true) });
  sub.test('one is one', function(){ assert(1 === 1); });

  assert(sub.report.tests === 2);
  assert(sub.report.failures.length === 0);
});

test('single assert with false expression', function() {
  sub.test('false', function() { assert(false) });
  sub.test('one is two', function() { assert(1 === 2) });

  assert(sub.report.tests === 2);
  assert(sub.report.failures.length === 2);
});

test('failure is the test title', function() {
  sub.test('test title', function() {
    assert(false);
  });

  assert(sub.report.failures[0] == 'test title');
});

test('multiple asserts in the same test', function() {
  sub.test('with two asserts inside', function() {
    assert(true);
    assert(true);
  });

  assert(sub.report.tests === 1); // multiple asserts count just like one test
  assert(sub.report.failures.length === 0);
});

test('multiple asserts in the same test, one assert fails', function() {
  sub.test('with two asserts inside', function() {
    assert(true);
    assert(false);
    assert(true);
  });

  assert(sub.report.tests === 1);
  assert(sub.report.failures.length === 1);
  assert(sub.report.failures[0], 'with two asserts inside');
});

test('nested test functions with no failures', function() {
  sub.test('root test', function(){
    sub.test('child test 1', function(){ assert(true); });
    sub.test('child test 2', function(){ assert(true); });
    assert(true);
  });

  assert(sub.report.tests === 3); // it counts root and nested tests
  assert(sub.report.failures.length === 0); // no failures
});

test('nested test functions with failures', function() {
  sub.test('root test', function(){
    sub.test('child test 1', function(){ assert(false); });
    sub.test('child test 2', function(){ assert(false); });
    assert(false);
  });

  assert(sub.report.tests === 3); // it counts root and nested tests
  assert(sub.report.failures.length === 3); // no failures
  assert(sub.report.failures[0] == 'child test 1'); // first assertion to fail is added first in the failures list
});

test('assertError should not fail if an error is raised inside', function() {
  sub.test('should throw an exeption', function(){
    assertError(function() {
      throw new Error('kaa'); // throw an Error
    });
  });
  sub.test('should throw an exeption', function(){
    assertError(function() {
      throw 'kaa'; // throw a String
    });
  });

  assert(sub.report.tests === 2);
  assert(sub.report.failures.length === 0); // no failures
})

test('assertError should add a failure if no error was raised inside', function() {
  sub.test('should throw an exeption', function(){
    assertError(function() {
      // stuff but no errors
    });
  });

  assert(sub.report.tests === 1);
  assert(sub.report.failures.length === 1); // no error was raised
});

test('assertError should return the raised error', function() {
  sub.test('should throw a "not my problem" exception', function() {
    var err = assertError(function() {
      throw "not my problem";
    });
    assert(err === "not my problem"); // use this error to add more asserts
  });

  assert(sub.report.tests === 1);
  assert(sub.report.failures.length === 0);
});

test('setup is called on each test case', function() {
  var counter = 0;
  sub.setup = function() { counter ++; }
  sub.test('counter plus', function(){
    assert(counter === 1);
  });
  sub.test('counter plus', function(){
    assert(counter === 2);
  });

  assert(sub.report.tests === 2);
  assert(sub.report.failures.length === 0);
  assert(counter === 2);
});

test('teardown is called after each test case', function() {
  var counter = 0;
  sub.teardown = function() { counter ++; }
  sub.test('counter plus', function(){
    assert(counter === 0); // teardown still not called
  });
  sub.test('counter plus', function(){
    assert(counter === 1);
  });

  assert(sub.report.tests === 2);
  assert(sub.report.failures.length === 0);
  assert(counter === 2);
})

console.log(tinytest.report.toString());