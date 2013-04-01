tinytest.js
===========

Really tiny javascript test framework.
It's just a personal exercise, to see .

## Goals ##

 * Avoid anything complex, implement only must-have methods (find the right balance is the challenge).
 * It should be contained in a small single file, that is easy to read and understand.
 * Although with small functionality set, it should be easy to use.
 * Test Tinytest with Tinytest.

## Usage Example ##

```javascript
if (typeof global != 'undefined') require('tinytest')(global); // node.js (CommonJS) only, in a browser just run tinytest.js script before

tinytest.setup = function() {
  "executed before each test"
};

tinytest.teardown = function() {
  "executed after each test"
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

Tinytest is tested with Tinytest, so you can see more usage examples in `test/test.js`

## What is NOT included ##

Tinytest is really, really tiny. It barely makes it to be a testing framework.

If there is a failure, it does not show the line. This is because showing the stacktrace in JavaScript is a hard problem to solve, because each browser/environment has its own solutions. There are some libraries around but I decided to stay away from that complexity. I actually found that just showing the failed test tilte is ok most of the times, but far from ideal.

Tinytest does not implement any kind of `mock` (`stub`, `double`, etc.). I think that is not in the scope of the "core" functionality of a small testing framework. Include other libraries like `sinon.js` for this purpose.

No formatters were added, and the only way to see the errors is using `tinytest.report` object. This is enough for most of the cases.

## Important note ##

Don't use tinytest, and don't use tinytest-like frameworks to test your real code.

It sounds nice at first due to the simplicity of the core functions, but a reasonable test suite needs a feature-rich testing framework.

## Author ##

Written by [Mario Izquierdo](https://github.com/marioizquierdo)