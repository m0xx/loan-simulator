import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginTop: theme.spacing.unit,
    },
    formControl: {
        marginBottom: theme.spacing.unit * 2,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
    }
});


class Form extends React.Component {
    constructor(props) {
        super(props);

        const {initialValues} = props;

        this.state = {
            amount: initialValues.amount,
            annualRate: initialValues.annualRate,
            duration: initialValues.duration,
            errorFields: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(name) {
        return (event) => {
            this.setState({[name]: parseFloat(event.target.value), errorFields: this.state.errorFields.filter((field) => (field !== name))})
        }
    }

    handleSubmit() {
        const {onCalculate} = this.props;

        const errorFields = ['amount', 'duration', 'annualRate']
            .filter((field) => {
                return !this.state[field];
            })

        if(errorFields.length) {
            this.setState({errorFields});
        }
        else {
            const {amount, duration, annualRate} = this.state;

            onCalculate({amount, duration, annualRate});
        }
    }

    render() {
        const {classes} = this.props;
        const {errorFields} = this.state;

        return (
            <div className={classes.root}>
                <FormControl className={classes.formControl} error={errorFields.indexOf('amount') > -1}>
                    <InputLabel htmlFor="adornment-amount">Montant du prêt</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.state.amount}
                        onChange={this.handleChange('amount')}
                        type="number"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.formControl} error={errorFields.indexOf('annualRate') > -1}>
                    <InputLabel htmlFor="adornment-annual-rate">Taux d'intérêt annuel (%)</InputLabel>
                    <Input
                        id="adornment-annual-rate"
                        value={this.state.annualRate}
                        onChange={this.handleChange('annualRate')}
                        type="number"
                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                </FormControl>
                <FormControl className={classes.formControl} error={errorFields.indexOf('duration') > -1}>
                    <InputLabel htmlFor="adornment-duration">Durée de l'emprunt (mois)</InputLabel>
                    <Input
                        id="adornment-duration"
                        value={this.state.duration}
                        onChange={this.handleChange('duration')}
                        type="number"
                        endAdornment={<InputAdornment position="end">Mois</InputAdornment>}
                    />
                </FormControl>
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    Calculer
                </Button>
            </div>
        )
    }
}


Form.propTypes = {
    onCalculate: PropTypes.func.isRequired
}

export default withStyles(styles)(Form);