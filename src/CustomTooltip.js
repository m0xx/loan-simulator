import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {formatMoney} from "./utils";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 1,
        backgroundImage: theme.app.graph.tooltip.backgroundImage,
        borderRadius: 10,
        fontFamily: theme.typography.fontFamily,

    },
    label: {
        fontSize: theme.typography.fontSize,
        fontWeight: 300,
        color: 'rgba(255, 255, 255, 0.5)'
    },
    value: {
        fontSize: theme.typography.fontSize * 1.5,
        fontWeight: 400,
        color: '#FFF',
        marginBottom: theme.spacing.unit,
    }
});

function CustomTooltip({classes, active, payload, label, payments}) {
    if (active) {
        const noPeriod = parseInt(label);
        const {interest, capital, remaining, remainingPrincipal} = payments[noPeriod - 1];
        const data = [
            {label: 'Balance', value: formatMoney(remaining)},
            {label: 'Remboursement', value: formatMoney(capital)},
            {label: 'Intérêts', value: formatMoney(interest)},
        ]

        return (
            <Paper className={classes.root} elevation={12}>
                {
                    data.map(({label, value}) => (
                        <div key={label}>
                            <div className={classes.label}>{label}</div>
                            <div className={classes.value}>{value}</div>
                        </div>
                    ))
                }
            </Paper>
        );
    }
    return null;
};

export default withStyles(styles)(CustomTooltip);