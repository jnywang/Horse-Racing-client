import {
    ALL_EMPLOYEE,
    ALL_EMPLOYEE_FAIL,
    SET_CUR_EMP_ACC_ID,
    EMPLOYEE_INFO,
    EMPLOYEE_INFO_FAIL,
    // below not used
    OPEN_ADD_E,
    CLOSE_ADD_E,
    DELETE_EMPLOYEE,
    DISPLAY_PROFILE,
    EDIT_EMPLOYEE
} from '../types';
import axios from 'axios';

// fecth employee information
export const fetchSingleEmployeeInfo = (accountID) => (dispatch) => {
    console.log('fetching employeeInfo');
    
    axios
        .get(`/employee/employeeInfo.php?accountid=${accountID}`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: EMPLOYEE_INFO,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: EMPLOYEE_INFO_FAIL
            })
        })
}

export const fetchAllEmployeesInfo = () => (dispatch) => {
    console.log('fetching all employees');

    axios
        .get(`/employee/allEmployeeInfo.php`)
        .then((res) => {
            //console.log(res.data);
            dispatch({
                type: ALL_EMPLOYEE,
                payload: res.data.records
            })
        })
        .catch((err)=> {
            dispatch({
                type: ALL_EMPLOYEE_FAIL
            })
        })
}

export const setCurEmpAccountID = (accountID) => (dispatch) => {
    dispatch({
        type: SET_CUR_EMP_ACC_ID,
        payload: accountID
    })
}

// edit employee 
export const editEmployee = (edata, accountid) => (dispatch) => {

  axios
    .post(`/employee/editEmployee.php`, edata)
    .then((res)=>{
        dispatch(fetchSingleEmployeeInfo(accountid));
        dispatch(fetchAllEmployeesInfo());
    })
    .catch((err) => {
        console.log(err)
    })
}

export const deleteEmployee = (username) => (dispatch) => {

    axios
        .post(`/employee/deleteEmployee.php?username='${username}'`)
        .then((res) => {
            dispatch({
                type: DELETE_EMPLOYEE
            });
            dispatch(fetchAllEmployeesInfo());
        })
        .catch((err) => {
            console.log(err)
        })
}

// to display Profile Summary
export const displayProfile = () => (dispatch) => {
    dispatch({ type: DISPLAY_PROFILE });
}

// to open the add employee dialog
export const openAddE = () => (dispatch) => {
    dispatch({ type: OPEN_ADD_E });
}

// to close the add employee dialog
export const closeAddE = () => (dispatch) => {
    dispatch({ type: CLOSE_ADD_E });
}

export const addEmployee = (edata) => (dispatch) => {
    axios
        .post('/employee/addEmployee.php', edata)
        .then((res) => {
            dispatch(fetchAllEmployeesInfo());
        })
        .catch((err) => {
            console.log(err)
        })
}
