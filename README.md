tinytest.js
===========

Really tiny javascript test framework.
It's just a personal exercise, to see .

## Goals ##

 * Avoid anything complex, implement only must-have methods (find the right balance is the challenge).
 * It should be contained in a small single file, that is easy to read and understand.
 * Although with small functionality set, it should be easy to use.
 * All home-made. If something becomes too complex, it should be removed and ported to another library.
 * Crossbrowser: it should be tiny, but also work everywhere.
 * It should play nice with other libraries and be easily extensible.
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
  expect(1).toBe(1);
  expect(1).toNotBe(2);
  expect('hello world').toMatch(/hello/);
  expect('hello world').toNotMatch(/kitty/);
  expect(foo).toBeDefined();
  expect(unfoo).toBeUndefined();
  expect(null).toBeNull();
  expect(NaN).toBeNaN();
  expect('I am true').toBeTruthy();
  expect(0).toBeFalsy();
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

#### assert(expression) to rule them all ####

At first I only implemented `assert` and `assertError`.
I though that should be enough to cach all expected logic and exceptions.
And they are, but when something fails, there is no information at all about what happened.

As Einstain once said: "Everything Should Be Made as Simple as Possible, But Not Simpler".

So I changed the "assert" approach to a "expect(x).toBe(x)" approach. It didn't add much more complexity to the code and the result is way better.

```javascript

assert(x == y); // failure will just tell you something went wrong, but you don't know what.

expect(x).toBe(y); // failure report says: "expected 1 toBe 2", that gives a lot more information about the problem.

```

## Important Note ##

Don't use tinytest, and don't use tinytest-like frameworks to test your real code.

It should suit your needs only for really small toy-like hacks. For medium/big projects you are going to need mocks, fakes, better expectation functions, better support, better documentation, continuous integration support, etc.

## Author ##

Written by [Mario Izquierdo](https://github.com/marioizquierdo)