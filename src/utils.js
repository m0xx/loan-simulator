const YEAR = 'YEAR';
const MONTH = 'MONTH';
const BI_WEEKLY = 'BI_WEEKLY';
const WEEK = 'WEEK';

const UNITS = [
    {
        id: YEAR,
        label: 'Année',
    },
    {
        id: MONTH,
        label: 'Mois',
    },
    {
        id: BI_WEEKLY,
        label: 'Bi-Hebdomadaire',
    },
    {
        id: WEEK,
        label: 'Hebdomadaire',
    }
]

const DURATION_UNITS = [
    {
        id: YEAR,
        label: 'Année',
        freqConversion: {
            [YEAR]: 1,
            [MONTH]: 12,
            [WEEK]: 52,
            [BI_WEEKLY]: 26
        }
    },
    {
        id: MONTH,
        label: 'Mois',
        freqConversion: {
            [MONTH]: 1,
        }
    }
];



// export const listDurationUnits = () => ([...DURATION_UNITS])
// export const listFrequencyUnits = (durationUnit) => {
//     if(durationUnit === YEAR) {
//         return [
//             {
//
//             }
//         ]
//     }
// }

const PERIOD_COUNT_LOOKUP = {
    [YEAR]: 1,
    [MONTH]: 12,
    [WEEK]: 52,
    [BI_WEEKLY]: 26
}


function calcNbPeriodPerYear(unit) {
    if(!PERIOD_COUNT_LOOKUP[unit]) {
        throw new Error(`${unit} is not supported.`)
    }

    return PERIOD_COUNT_LOOKUP[unit];
}

function round(value, decimals = 2) {
    if(value == 0) {
        return value;
    }

    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function calcPeriodPayment({amount, annualRate, nbPeriodYear, nbPeriodTotal}) {
    const rateForPeriod = annualRate / 100 / nbPeriodYear;

    const payment = (rateForPeriod * amount) / (1 - Math.pow((1 + rateForPeriod), -1 * nbPeriodTotal));

    return round(payment, 2)
}

// function calcPaymentHistory({amount, annualRate, nbPeriodYear, nbPeriodTotal}) {
//     const history = [];
//
//     const payment = calcPeriodPayment({amount, annualRate, nbPeriodYear, nbPeriodTotal});
//     let remainingPrincipal = amount;
//     // let remaining = payment * nbPeriodTotal;
//     let interestTotal = 0;
//     let capitalTotal = 0;
//
//     for(let i=0; i < nbPeriodTotal; i++) {
//         const noPeriod = i + 1;
//
//         const interest = round(annualRate / 100 / nbPeriodYear * remainingPrincipal);
//         const capital = round(payment - interest);
//
//         // remaining = Math.max((remaining - payment), 0);
//         // interestTotal += interest;
//         // capitalTotal += capital + interest;
//         remainingPrincipal = Math.max((remainingPrincipal - capital), 0);
//
//         history.push({
//             noPeriod,
//             payment,
//             interest: round(interest),
//             capital: round(payment - interest),
//             balance:
//             initialAmount: amount,
//             interest: round(interest),
//             capital: round(capital),
//             interestTotal: round(interestTotal),
//             capitalTotal: round(amount - remaining),
//             remainingPrincipal: round(remainingPrincipal),
//             remaining: round(remaining)
//         })
//     }
//
//     console.log(history)
//     return history;
// }

function calcPaymentHistory({amount, annualRate, nbPeriodYear, nbPeriodTotal}) {
    const history = [];

    const payment = calcPeriodPayment({amount, annualRate, nbPeriodYear, nbPeriodTotal});
    let remainingPrincipal = amount;
    let remaining = payment * nbPeriodTotal;
    let interestTotal = 0;
    let capitalTotal = 0;

    for(let i=0; i < nbPeriodTotal; i++) {
        const noPeriod = i + 1;

        const interest = annualRate / 100 / nbPeriodYear * remainingPrincipal;

        let capital = payment - interest;

        remaining = Math.max((remaining - payment), 0);
        interestTotal += interest;
        capitalTotal += capital + interest;
        remainingPrincipal = Math.max((remainingPrincipal - capital), 0);

        history.push({
            noPeriod,
            initialAmount: amount,
            interest: round(interest),
            capital: round(capital),
            interestTotal: round(interestTotal),
            capitalTotal: round(amount - remaining),
            remainingPrincipal: round(remainingPrincipal),
            remaining: round(remaining)
        })
    }

    console.log(history)
    return history;
}

function getMoneyFormatter() {
    if(Intl && Intl.NumberFormat) {
        return new Intl.NumberFormat('fr-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 2
        })
    }

    return null;
}

function formatMoney(amount) {
    const formatter = getMoneyFormatter();

    return formatter ? formatter.format(amount) : `${amount.toFixed(2)} $`;
}

module.exports = {
    calcPeriodPayment,
    calcNbPeriodPerYear,
    calcPaymentHistory,
    formatMoney
}