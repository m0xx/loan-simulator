import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import LoanForm from './Form';
import PaymentDetails from './PaymentDetails';

const DRAWER_WIDTH = 400;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: DRAWER_WIDTH,
        boxShadow: theme.shadows[12],
        paddingTop: theme.spacing.unit * 3,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        backgroundImage: theme.app.content.backgroundImage,
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
});

function TwoColumnLayout({classes, payments, initialValues, onCalculate}) {
    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open
            >
                <Typography component="h1" variant="h4" align="center">
                    Simulateur de prêt
                </Typography>
                <LoanForm initialValues={initialValues} onCalculate={onCalculate} />
            </Drawer>
            <main className={classes.content}>
               <PaymentDetails payments={payments} />
            </main>
        </div>
    )
}

export default withStyles(styles)(TwoColumnLayout);