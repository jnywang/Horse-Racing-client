import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBarLP from '../components/NavBarLP';

// Components
import AddEmployee from '../components/add/AddEmployee';
import ManageEmployees from '../components/manage/ManageEmployees';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Container from '@material-ui/core/Container'

// redux
import { connect } from 'react-redux';
import { fetchAllEmployeesInfo } from '../redux/actions/employeeAction';

export class EmployeeManager extends Component {

    componentDidMount() {
        this.props.fetchAllEmployeesInfo();
    }

    render() {
        return (
            <div>
                <NavBarLP />
                <Container maxWidth="lg" style={{ marginTop: '100px' }}>
                    <Button
                        variant="outlined"
                        component={Link}
                        to="/EmployeeRegular"
                        style={{ marginRight: '50px' }}
                    >
                        <ArrowBackIcon />
                        Back
                    </Button>
                    <ManageEmployees />
                    <AddEmployee />
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employee.employeeS
})

export default connect(mapStateToProps,{fetchAllEmployeesInfo})(EmployeeManager);
