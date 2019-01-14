import React from "react";
import { withStyles } from '@material-ui/core/styles';
import cn from 'classnames'
import Paper from '@material-ui/core/Paper';

import Graph from "./Graph";
import {formatMoney} from "./utils";

const style = theme => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing.unit * 1,
    },
    block: {
        padding: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 1.5,
        marginRight: theme.spacing.unit * 1.5,
        borderRadius: 10,
        fontFamily: theme.typography.fontFamily,
        backgroundColor: 'transparent',
    },
    label: {
        fontSize: theme.typography.fontSize * 2,
        fontWeight: 300,
        color: 'rgba(255, 255, 255, 0.5)'
    },
    value: {
        fontSize: theme.typography.fontSize * 3,
        fontWeight: 400,
        color: '#FFF',
    },
    graph: {
        flex: 1,
        position: 'relative'
    },
    primaryBlock: {
        backgroundImage: theme.app.gradiant.primary,
        border: '1px solid #897dfe'
    },
    secondaryBlock: {
        backgroundImage: theme.app.gradiant.dark,
        border: '1px solid #585865'
    }
})

function RawBlock({label, value, classes, className}) {
    return <Paper className={cn(classes.block, className)} elevation={6}>
        <div className={classes.label}>{label}</div>
        <div className={classes.value}>{value}</div>
    </Paper>
}

const Block = withStyles(style)(RawBlock);

function PaymentDetails({payments, classes}) {
    if(!payments || payments.length === 0) {
        return null;
    }

    const {capital, interest, initialAmount} = payments[0];
    const payment = capital + interest;

    const interestTotal = payments.reduce((total, {interest}) => {
        return total + interest;
    }, 0.00);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Block className={classes.primaryBlock} label="Paiement mensuel" value={formatMoney(payment)} />
                <Block className={classes.secondaryBlock} label="Total des paiements" value={formatMoney(initialAmount + interestTotal)} />
                <Block className={classes.secondaryBlock} label="Total des Intérêts" value={formatMoney(interestTotal)} />
            </div>
            <Graph payments={payments} />
        </div>
    )
}

export default withStyles(style)(PaymentDetails);