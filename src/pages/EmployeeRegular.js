import React, { Component } from 'react';
import NavBarLP from '../components/NavBarLP';
import { Link } from 'react-router-dom';

// Components
import ManageHorses from '../components/manage/ManageHorses';
import ManageJockeys from '../components/manage/ManageJockeys';
import Button from '@material-ui/core/Button';


// redux
import { connect } from 'react-redux';
import { fetchAllHorses } from '../redux/actions/horseAction';
import { fetchAllJockeys } from '../redux/actions/jockeyAction';

export class EmployeeRegular extends Component {

    componentDidMount() {
        this.props.fetchAllHorses();
        this.props.fetchAllJockeys();
    }

    render() {
        return (

            <div>
                <NavBarLP/>
                <Button
                    variant="outlined"
                    component={Link}
                    to="/EmployeeManager"
                    style={{ margin: '7em auto auto 75em'}}
                >
                    Manage Employees
                </Button>
                <ManageHorses/>
                <ManageJockeys/>
            </div>
        )
    }
}


const mapActionsToProps = {
    fetchAllHorses,
    fetchAllJockeys,
}

export default connect(null ,mapActionsToProps)(EmployeeRegular);
