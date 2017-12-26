const test = require('tape');

const Countdownto = require('../index');

test('countdownto', (t) => {
  t.plan(2);

  t.test('should throw if to is not passed', (t) => {
    try {
      new Countdownto();
      t.end('should not be able to instantiate without a to');
    } catch(ex) {
      t.equal(ex.message, 'to should be passed as a date or date-string');
      t.end();
    }
  });

  t.test('should give a string time', (t) => {
    let output = new Countdownto(new Date('12/20/2020'), new Date('12/19/2020'));
    t.equal(output.toString(), '1d');
    t.end();
  });
});
