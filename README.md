tinytest.js
===========

Really tiny javascript test framework.
It's just a personal exercise, to see .

## Goals ##

 * Implement only must-have functions and avoid any complexity
 * Test Tinytest with Tinytest

## Usage ##

In node.js: see `test/tinytest_test.js` as example.
In a browser: see `test/browser_example.js` as example.

## Example ##

```javascript
require('tinytest');

tinytest.setup = function() {
  "executed before each test"
};

tinytest.teardown = function() {
  'executed after each test'
};

test("my test", function() {
  expression = true;
  assert(expression); // check if expression is evaluated to true
});

test("should raise an exception", function() {
  var error = assertError(function() { // assertError fails if no error was thrown
    throw 'myerror';
  });
  assert(error === 'myerror'); // additional assertions on the error
});

console.log(tinytest.report.toString()); // print test report

```

## What is NOT included ##

Tinytest is really, really tiny. It barely makes it to be a testing framework.

If there is a failure, it does not show the line. This is because showing the stacktrace in JavaScript is a hard problem to solve, because each browser/environment has its own solutions. There are some libraries around but I decided to stay away from that complexity. I actually found that just showing the failed test tilte is ok most of the times, but far from ideal.

Tinytest does not implement any kind of `mock` (`stub`, `double`, etc.). I think that is not in the scope of the "core" functionality of a small testing framework. Include other libraries like `sinon.js` for this purpose.

No formatters were added, and the only way to see the errors is using `tinytest.resport` object. This is enough for most of the cases.

## Important note ##

Don't use tinytest, and don't use tinytest-like frameworks to test your real code.

It sounds nice at first due to the simplicity of the core functions, but a reasonable test suite needs a feature-rich testing framework.

## Author ##

Written by [Mario Izquierdo](https://github.com/marioizquierdo)