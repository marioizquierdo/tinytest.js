tinytest.js
===========

Really tiny javascript test framework. Developed as a personal exercise to explore how test frameworks work.

## Goals ##

 * Keep it simple, implement only must-have methods, but should be perfectly functional. Finding the right balance is the challenge.
 * Code contained in a small single file, easy to read and understand.
 * Easy to explain and use.
 * No dependencies.
 * Play nice with other libraries and easy to extend.
 * Tinytest is tested with Tinytest.

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

test("error stuff", function() {
  var foo = function() { return nonexistingvariable + 1; } // throws an error
  var error = expect(foo).toThrowError(); // get error to add more assertions on it
  expect(error.message).toBe('nonexistingvariable is not defined'); // ensure the error is the one we want
});

// Print test report
console.log(tinytest.report.toString());
```

Tinytest is tested with Tinytest, so you can see more usage examples in `test/test.js`


## Lessons learned while coding Tinytest ##

#### A testing framework doesn't have to be complicated ####

Good error reporting and expressive testing primitives go a long way to improve the quality of your tests, but the biggest issue with unit testing is that it forces you to write code that is modular and decoupled from the rest of your program, which some time can be seen as unneccesary work.

While I wouldn't use Tinytest for bigger projects, it's clear that using a good testing framework is not as important as it is having a library echosistem that is free of hard dependencies.

#### Show line numbers on failure ####

If there is a failure, tinytest doesn't show the error line. This is because showing the stacktrace in JavaScript is a hard problem to solve: each browser/environment has its own solutions. There are some libraries around but I wanted to keep the goal of "no dependencies".

Also, I found that for small or middle size test suites it's easy enough to find the failed example from the test title.

#### Mocks ####

Tinytest does not implement any kind of mock, stub or double. I think that is not in the scope of the "core" functionality, and other libraries like `sinon.js` would play nice with tinytest, so I don't need to implement them here.

#### Formatters ####

No formatters were added, and the only way to see the errors is using `tinytest.report` object. This is enough and could be easily extended.

#### Using assert(expression) is not enough ####

At first I only implemented `assert` and `assertError`, because that is as simple as it can get. But when an assertio fails, there is no information at all about what happened.

In this case I applied the Einstain's quote "Everything Should Be Made as Simple as Possible, But Not Simpler", and I ended up implementing the "expect(x).toBe(x)" approach. It didn't add much more complexity to the code and the result is way better.

```javascript
assert(x == y); // failure will just tell you something went wrong, but you don't know what.
expect(x).toBe(y); // failure report says: "expected 1 toBe 2", that gives a lot more information about the problem.
```


## Author ##

Tinytest was designed and written by [Mario Izquierdo](https://github.com/marioizquierdo)
