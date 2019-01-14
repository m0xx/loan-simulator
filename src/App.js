import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';
import SimpleFormLayout from "./SimpleFormLayout";
import TwoColumnLayout from './TwoColumnLayout';
import {calcPaymentHistory, calcPeriodPayment} from "./utils";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payments: [],
            isInitialized: false,
            formValues: {
                amount: 1000,
                annualRate: 3,
                duration: 12,
            }
        }

        this.handleOnCalculate = this.handleOnCalculate.bind(this);

    }
    handleOnCalculate({amount, duration, annualRate}) {
        const payments = calcPaymentHistory({amount, annualRate, nbPeriodYear: 12, nbPeriodTotal: duration});

        this.setState({
            payments,
            isInitialized: true,
            formValues: {
                amount,
                duration,
                annualRate
            }
        })
    }
    render() {
        const {payments, isInitialized, formValues} = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {
                    isInitialized
                        ? <TwoColumnLayout
                            initialValues={formValues}
                            onCalculate={this.handleOnCalculate}
                            payments={payments}
                        />
                        : <SimpleFormLayout
                            initialValues={formValues}
                            onCalculate={this.handleOnCalculate}/>
                }
            </MuiThemeProvider>
        )
    }
}


export default App;