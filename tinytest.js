(function(tinytest){

  // Name a test case and group some assertions on it
  tinytest.test = function(title, testFunc, report) {
    report || (report = tinytest.report); // use another report to isolate test suites
    try {
      testFunc();
    } catch (err) {
      if (err == 'tinytest failure') {
        report.failures.push(title); // special error used to catch assert failures
      } else {
        throw err; // errors are easily debbuged if we just raise them
      }
    } finally {
      report.tests++; // ensure count tests
    }
  };

  // Check that some expression is true. Use inside a testFunc.
  tinytest.assert = function(expr) {
    if (!expr) throw 'tinytest failure';
  };

  // Generate a new report to be used by tests
  tinytest.newReport = function() {
    return {
      tests: 0,
      failures: [],
      toString: function() {
        var str = '';
        for (i in this.failures) str += 'Failure in "' + this.failures[i] + '"\n'; // failure test titles
        str += "" + this.tests + " tests"; // number of tests
        str += ", " + this.failures.length + " failures"; // number of failures
        str += this.failures.length == 0 ? ' [OK]' : ' [ERROR]'
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