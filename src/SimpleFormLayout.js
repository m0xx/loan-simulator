import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';

import LoanForm from './Form';
import PaymentDetails from './PaymentDetails';
import Typography from "@material-ui/core/Typography/Typography";

const DRAWER_WIDTH = 400;

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 12,
        height: '100vh',
        backgroundImage: 'linear-gradient(to right top, #897dfe, #F370DD, #FF77AB, #FF9C7B, #FFCC61, #F9F871)',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginBottom: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
            marginBottom: theme.spacing.unit * 6,
            padding: theme.spacing.unit * 3,
        },
    },
});

function SimpleFormLayout({classes, initialValues, onCalculate}) {
    return (
        <div className={classes.root}>
            <div className={classes.layout}>
                <Paper className={classes.paper} square elevation={10}>
                    <Typography component="h1" variant="h4" align="center">
                        Simulateur de prêt
                    </Typography>
                    <LoanForm initialValues={initialValues} onCalculate={onCalculate}/>
                </Paper>
            </div>
        </div>
    )
}

export default withStyles(styles)(SimpleFormLayout);