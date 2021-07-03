import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import NavBar from '../components/NavBar';

// Redux
import { connect } from 'react-redux';
import { loginUser, setEmployee } from '../redux/actions/userAction';

// Material UI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export class login extends Component {
    constructor() {
        super();
        this.state = {
            isEmployee: false,
            username: "",
            password: ""
        }
    }

    handleLogin = (event) => {
        const loginData = {
            username: this.state.username.trim(),
            password: this.state.password
        };

        this.props.loginUser(loginData, this.props.history);
    }

    handleSetEmployee = (event, newStatus) => {
        this.setState({isEmployee: newStatus})
        this.props.setEmployee(newStatus);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {user: {loading, loginError}} = this.props;
        const {isEmployee, username, password} = this.state;

        return (
            <div>
                <Grid container justify="center" style={{marginTop: '150px'}}>
                    <NavBar/>
                    <Grid item sm />
                    <Grid item sm>
                        <Paper elevation={3}>
                            <Grid container justify="center" alignItems="center" style={{height: '500px'}}>
                                <Grid item>
                                    <Typography variant='h4' style={{margin: '20px 150px auto 150px'}}>
                                        Log In
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <ToggleButtonGroup value={isEmployee} exclusive onChange={this.handleSetEmployee}>
                                        <ToggleButton value={false}>
                                            Customer
                                        </ToggleButton>
                                        <ToggleButton value={true}>
                                            Employee
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                                <TextField
                                    id="username"
                                    name="username"
                                    type="username"
                                    label="Username"
                                    error={loginError}
                                    value={username}
                                    onChange={this.handleChange}
                                    style={{ width: '300px', margin: '30px 20px 30px 40px' }}
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    error={loginError}
                                    value={password}
                                    helperText={loginError ? "Invalid credentials" : null}
                                    onChange={this.handleChange}
                                    style={{ width: '300px', margin: '30px 20px 50px 40px' }}
                                />
                                <Grid item>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        style={{marginBottom: '20px'}}
                                        onClick={this.handleLogin}
                                    >
                                        Log In
                                        {loading && (
                                            <LinearProgress style={{marginLeft: '5px', width: '30px'}}/>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        component={ Link }
                                        to="/signup"
                                        style={{ marginLeft: '40px', marginBottom: '20px'}}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    loginUser,
    setEmployee
}

export default connect(mapStateToProps, mapActionsToProps)(login);
