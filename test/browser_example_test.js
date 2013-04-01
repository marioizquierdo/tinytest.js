// Example of tinytest on a browser.
// Be sure to include the tinytest.js script before this one

tinytest.setup = function() {
  'executed before each test'
}
tinytest.teardown = function() {
  'executed after each test'
}

// Test case
test("one is one", function() {
  assert(1 == 1);
});

// print the result in the console, but we could also use console, or insert into the DOM using tinytest.report.toHTML()
console.log(tinytest.report.toString());