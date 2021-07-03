import {
    ALL_EMPLOYEE,
    ALL_EMPLOYEE_FAIL,
    SET_CUR_EMP_ACC_ID,
    EMPLOYEE_INFO,
    EMPLOYEE_INFO_FAIL,
    // below not used
    DELETE_EMPLOYEE,
    OPEN_ADD_E,
    CLOSE_ADD_E,
    ADD_EMPLOYEE,
    DISPLAY_PROFILE,
    EDIT_EMPLOYEE
} from '../types';


const initialState = {
    employeeS: [],
    curEmpAccountID: 0,
    curEmpName:"",
    curEmpLevel:"",
    curEmpType:"",
    curEmpStartDate:"",
    curEmpSalary:0,
    curEmpUsername:""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ALL_EMPLOYEE:
            return {
                ...state,
                employeeS: action.payload
            }
        case ALL_EMPLOYEE_FAIL:
            return {
                ...state,
                employeeS:[{
                    'accountID': 0,
                    'username': "No record retrieved",
                    'name': "No record retrieved"
                }]
            }
        case SET_CUR_EMP_ACC_ID:
            return {
                ...state,
                curEmpAccountID: action.payload
            }
        case EMPLOYEE_INFO:
            return {
                ...state,
                curEmpAccountID: action.payload.accountID,
                // may move these to somehwer else?
                curEmpName: action.payload.name,
                curEmpLevel: action.payload.emp_level,
                curEmpType: action.payload.emp_type,
                curEmpStartDate: action.payload.starting_date,
                curEmpSalary: action.payload.salary,
                curEmpUsername: action.payload.username
            }
        case EMPLOYEE_INFO_FAIL:
            return {
                ...state,
                curEmpAccountID: 0,
                // may move these to somehwer else?
                curEmpName: "No Data Retrieved",
                curEmpLevel: "No Data Retrieved",
                curEmpType: "No Data Retrieved",
                curEmpStartDate: "No Data Retrieved",
                curEmpSalary: "No Data Retrieved",
                curEmpUsername: "No Data Retrieved"
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                curEmpAccountID: 0,
                curEmpName: "",
                curEmpLevel: "",
                curEmpType: "",
                curEmpStartDate: "",
                curEmpSalary: "",
                curEmpUsername: ""
            }
        default:
            return state;
    }
}