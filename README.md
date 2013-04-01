tinytest.js
===========

Really tiny javascript test framework.

That's it, I made it as an exercise to see how smaller could a test framework be.

## Goals ##

 * Implement only must-have functions
 * Avoid any complexity
 * Tinytest should be able to test tinytest itself
 * Write some tests with it and see if it actually could be used on, at least, small projects

## Usage ##

In node.js: see `test/tinytest_test.js` as example.
In a browser: see `test/browser_example.js` as example.

## Example ##

```javascript

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

```

## What is not included ##

Tinytest does not implement any kind of `mock` (`stub`, `double`, etc.). I think that is not in the scope of the "core" functionality of a small testing framework. Include other libraries like `sinon.js` for this purpose.