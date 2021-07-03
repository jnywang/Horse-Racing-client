import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/styles'
import NavBar from '../components/NavBar'
import BetHistory from '../components/BetHistory'
import RaceList from '../components/RaceList'
import BetRace from '../components/BetRace'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux';
import { fetchRaceStadiumInfo } from '../redux/actions/raceInfoAction';
import { fetchBetInfo } from '../redux/actions/custBetAction'

const styles = (theme) => ({
    root: {
      flexGrow: 1,
    },
});


export class MakeBetPage extends Component {

    componentDidMount() {
        const {customer: {accountID}} = this.props;
        this.props.fetchRaceStadiumInfo();
        this.props.fetchBetInfo(accountID);
    }

    render() {
        // this is required to refer styles
        const {classes} = this.props;

        return (
            <div>
                <NavBar/>
                <Container maxWidth="lg" style={{marginTop: '100px'}}>
                    <span>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/customer"
                        style={{ marginRight: '50px' }}
                    >
                        <ArrowBackIcon />
                        Back
                    </Button>
                    <h1>Race Betting</h1>
                    </span>
                    <Grid container spacing={6} justify="center" alignItems="center" style={{height: '500px'}}>
                        <Grid item xs={6}>
                            <RaceList/>
                        </Grid>
                        <Grid item xs={6}>   
                            <BetRace/>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="lg">
                    <BetHistory/>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    stadiums: state.raceInfo.stadiums,
    customer: state.customer
})

const mapActionsToProps = {
    fetchRaceStadiumInfo,
    fetchBetInfo
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MakeBetPage));
