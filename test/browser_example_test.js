// Example of tinytest on a browser

// Alias methods
test = tinytest.test;
assert = tinytest.assert;

// Test case
test("one is one", function() {
  assert(1 == 1);
});

// print the result in the console, but we could also use console, or insert into the DOM using tinytest.report.toHTML()
console.log(tinytest.report.toString());