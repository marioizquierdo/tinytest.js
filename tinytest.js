(function(tinytest){

  // Name a test case and group some assertions on it
  tinytest.test = function(title, testFunc, report) {
    report || (report = tinytest.report); // use another report to isolate test cases
    try {
      testFunc();
    } catch (err) {
      if (err === 'tinytest failure') {
        report.failures.push(title); // special error used to catch assert failures
      } else {
        throw err; // test error
      }
    } finally {
      report.tests++; // ensure count tests
    }
  };

  // Check that some expression is true. Use inside a testFunc.
  tinytest.assert = function(expr) {
    if (!expr) throw 'tinytest failure';
  };

  // Check that a exception is thrown.
  tinytest.assertError = function(testFunc) {
    try {
      testFunc();
    } catch (err) {
      return err; // use the returned error to add assertion on the error object
    }
    tinytest.assert(false); // add a failure if the error was not thrown
  };

  // Generate a new report to be used by tests.
  // You normally don't need to use this function, because a default report is generated in tinytest.report
  tinytest.newReport = function() {
    return {
      tests: 0,
      failures: [],
      toString: function() {
        var str = '';
        for (i in this.failures) str += 'Failure in "' + this.failures[i] + '"\n'; // failure test titles
        str += "" + this.tests + " tests"; // number of tests
        str += ", " + this.failures.length + " failures"; // number of failures
        str += this.failures.length === 0 ? ' [OK]' : ' [ERROR]'
        return str;
      },
      toHTML: function() {
        return this.toString().replace('\n', '<br/>'); // use BR tags instead of \n line-breaks
      }
    }
  };

  // Default report
  tinytest.report = tinytest.newReport();

})(typeof exports === 'undefined' ? this['tinytest']={} : exports);