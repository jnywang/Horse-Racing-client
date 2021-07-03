import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { fetchRaceInfo, setBetTrue, setBetFalse, setBetDetails } from '../redux/actions/raceInfoAction';
import { makeBet } from '../redux/actions/custBetAction';

const styles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#fafafa',
        position: 'relative',
        overflow: 'auto',
        height: 300,
    },
    title: {
        margin: (4, 0, 2),
    },
});

const betTypes = {
    'Show': "'show bet'",
    'Place': "'place bet'",
    'Win': "'win bet'",
}

export class BetRace extends Component {
    constructor() {
        super();
        this.state = {
            amount: 0,
            bettype: "Win",
            invalid: false,
        }
    }

    handleClickOpen = (data) => {
        this.props.setBetTrue();
        this.props.setBetDetails(data);
    };

    handleClose = () => {
        this.props.setBetFalse();
    };

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        });
        if (this.state.amount < 0) {
            this.setState({ invalid: true })
        } else {
            this.setState({ invalid: false })
        }
    };

    handleDropdownChange = (event) => {
        this.setState({
            bettype: event.target.value
        })
    }

    handleTransaction = () => {
        const {raceInfo: {selectedHorse, selectedRace}, customer: {accountID}} = this.props;
        const {amount, bettype} = this.state;
        const betData = {
            "horseid": parseInt(selectedHorse),
            "accountid": accountID,
            "amount": amount,
            "bettype": betTypes[bettype],
            "raceid": parseInt(selectedRace)
        }
        this.props.makeBet(betData);
        this.handleClose();
    }

    renderRow(races) {
        return races.map((data) => (
            <ListItem key={data.horseid}>
                <ListItemText primary={`${data.nickname} with odds ${data.odds}; number of races: ${data.number_of_races}`} />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={() => this.handleClickOpen(data)}
                        edge="end"
                        aria-label="comments">
                        <AttachMoney />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    }

    renderDefaultMessage() {
        return (
            <ListItem key={0}>
                <ListItemText primary={`Please select the race location.`} />
            </ListItem>
        )
    }

    renderNoHorsesMessage() {
        return (
            <ListItem key={0}>
                <ListItemText primary={`No horses are registered yet for this race.`} />
            </ListItem>
        )
    }

    render() {
        const { classes, bet, raceInfo: {races, selectedHorse, noHorsesRegistered} } = this.props;
        const { amount, bettype, invalid } = this.state;

        return (
            <div>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Available Bets
                    </Typography>
                    <List className={classes.root} subheader={<li />}>
                        {
                            races.length ? (noHorsesRegistered ? this.renderNoHorsesMessage() : this.renderRow(races)) : this.renderDefaultMessage()
                        }
                    </List>
                </Grid>

                <Dialog open={bet} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Make Your Bet on Horse ID: {selectedHorse}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the amount and type of bet.
                        </DialogContentText>
                        <TextField
                            error={invalid}
                            autoFocus
                            margin="dense"
                            id="addFund"
                            name="amount"
                            type="number"
                            value={amount}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <Select
                            labelId="type"
                            id="type"
                            value={bettype}
                            onChange={this.handleDropdownChange}
                            style={{margin: '10px auto 10px auto'}}
                            fullWidth
                        >
                            <MenuItem value={'Win'}>Win</MenuItem>
                            <MenuItem value={'Place'}>Place</MenuItem>
                            <MenuItem value={'Show'}>Show</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleTransaction} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    customer: state.customer,
    stadiums: state.raceInfo.stadiums,
    bet: state.raceInfo.bet,
    raceInfo: state.raceInfo
})

const mapActionsToProps = {
    fetchRaceInfo,
    setBetTrue,
    setBetFalse,
    setBetDetails,
    makeBet
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BetRace));
