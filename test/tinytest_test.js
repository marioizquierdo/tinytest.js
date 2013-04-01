// Tinytest is tested with Tinytest °O°
// Just run this file with node.js and check the output: node test/tinytest_test.js
var tinytest = require('tinytest');
test = tinytest.test;
assert = tinytest.assert;

test('one is one', function(){
  assert(1 == 1);
});


console.log(tinytest.report.toString());