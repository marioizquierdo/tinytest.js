tinytest.js
===========

Really tiny javascript test framework.
It's just a personal exercise, to see .

## Goals ##

 * Avoid anything complex, implement only must-have methods (find the right balance is the challenge).
 * It should be contained in a small single file, that is easy to read and understand.
 * Although with small functionality set, it should be easy to use.
 * No dependencies, all library is coded in plain JavaScript (Note: I wouldn't force this in a real proejct)
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

## Things I tried to include that didn't work ##

Tinytest should be really, really tiny. I explored some ideas that were rejected, just because I didn't want to deal with the complexity added.

#### It doesn't show the line number on failure ####

If there is a failure, it does not show the line. This is because showing the stacktrace in JavaScript is a hard problem to solve: each browser/environment has its own solutions. There are some libraries around but I wanted to keep the goal of "no dependencies".
Then, when using it, I actually found that just showing the failed test tilte is ok most of the times, but far from ideal.

#### No mocks ####

Tinytest does not implement any kind of `mock`, `stub`, `double`, etc.). I think that is not in the scope of the "core" functionality, and other libraries like `sinon.js` would play nice with tinytest, so I don't need to implement them here.

#### Super simple formatters ####

No formatters were added, and the only way to see the errors is using `tinytest.report` object. This is enough for most of the cases.

#### assert(boolean) to rule them all ####

The only assert methods are `assert` and `assertError`. I think this is enough to cach all expected logic and expected exceptions.
And they are, but when something fails, there is no information at all about what happened.

I think adding support for different kind of asserts (equals, gt, lt, etc.) would be easy, it would not add much extra complexity, and the failure reports would be much more easy to understad.

```javascript

assert(x == y); // failure will just tell you something went wrong

assertEquals(x, y); // failure can explain what went wrong, for example "expected 'x' found 'y'"

```

## Important Note ##

Don't use tinytest, and don't use tinytest-like frameworks to test your real code.

It should suit your needs only for really small toy-like hacks. For medium/big projects you are going to need mocks, fakes, better expectation functions, better support, better documentation, continuous integration support, etc.

## Author ##

Written by [Mario Izquierdo](https://github.com/marioizquierdo)