import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import NavBar from '../components/NavBar';

// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userAction';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const feeType = {
    'Tier 1': 500,
    'Tier 2': 1500,
    'Tier 3': 7500,
    'Tier 4': 10000
};

const styles = {
    textField: {
        margin: '30px 20px 30px 40px'
    }
}

export class signup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            name: "",
            address: "",
            fee: feeType['Tier 1'],
            type: "Tier 1"
        }
    }

    handleSignup = (event) => {
        const userData = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            fee: this.state.fee,
            type: this.state.type
        };

        this.props.signupUser(userData, this.props.history);
    }

    handleTextfieldChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDropdownChange = (event) => {
        this.setState({
            type: event.target.value,
            fee: feeType[event.target.value]
        });
    }

    render() {
        const {user: {loading}} = this.props;
        const {username, password, name, address, type} = this.state;

        return(
            <div>
                <Grid container justify="center" style={{marginTop: '150px'}}>
                    <NavBar/>
                    <Grid item sm />
                    <Grid item sm>
                        <Paper elevation={3}>
                            <Grid container justify="center" alignItems="center" style={{width: '700px', height: '500px'}}>
                                <Grid container justify="center" alignItems="center">
                                    <Grid item>
                                        <Typography variant='h4' style={{margin: '40px 150px auto 150px'}}>
                                            Sign Up
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <TextField
                                    id="username"
                                    name="username"
                                    type="username"
                                    label="Username"
                                    value={username}
                                    onChange={this.handleTextfieldChange}
                                    style={{ width: '200px', margin: '20px 20px 30px 40px' }}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    value={password}
                                    onChange={this.handleTextfieldChange}
                                    style={{ width: '200px', margin: '30px 20px 30px 40px' }}
                                />
                                <TextField
                                    id="name"
                                    name="name"
                                    type="name"
                                    label="Name (First and Last)"
                                    value={name}
                                    onChange={this.handleTextfieldChange}
                                    style={{ width: '200px', margin: '30px 20px auto 40px' }}
                                />
                                <Select
                                    labelId="type"
                                    id="type"
                                    value={type}
                                    onChange={this.handleDropdownChange}
                                    style={{ width: '200px', margin: '45px 20px auto 40px' }}
                                >
                                    <MenuItem value={'Tier 1'}>Tier 1</MenuItem>
                                    <MenuItem value={'Tier 2'}>Tier 2</MenuItem>
                                    <MenuItem value={'Tier 3'}>Tier 3</MenuItem>
                                    <MenuItem value={'Tier 4'}>Tier 4</MenuItem>
                                </Select>
                                <TextField
                                    id="address"
                                    name="address"
                                    type="address"
                                    label="Address"
                                    value={address}
                                    onChange={this.handleTextfieldChange}
                                    style={{ width: '450px', margin: '30px 20px 30px 40px' }}
                                />
                                <Grid item style={{width: '500px'}}>
                                    <Grid justify="space-between" alignItems="center" container>
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                component={Link}
                                                to="/"
                                                style={{marginBottom: '20px'}}
                                            >
                                                <ArrowBackIcon />
                                                Back
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                        <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={loading}
                                                style={{marginBottom: '20px'}}
                                                onClick={this.handleSignup}
                                            >
                                                Sign Up
                                                {loading && (
                                                    <LinearProgress style={{marginLeft: '5px', width: '30px'}}/>
                                                )}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    signupUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
