const test = require('tape');
const {calcPeriodPayment} = require('./utils')

test('timing test', function (t) {
    t.plan(1);

    const payment = calcPeriodPayment({annualRate: 10, amount: 12000, nbPeriodYear: 12, nbPeriodTotal: 60});

    t.equal(payment, 254.96);
});