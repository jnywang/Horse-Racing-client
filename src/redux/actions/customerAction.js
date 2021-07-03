import {
    CUSTOMER_INFO,
    DISPLAY_PROFILE,
    DISPLAY_MEMBERSHIP,
    OPEN_ADD_FUND,
    CLOSE_ADD_FUND,
    ADD_FUND,
    CUSTOMER_INFO_FAIL
} from '../types';
import axios from 'axios';

// fecth customer information
export const fetchCustomerInfo = (username) => (dispatch) => {
    console.log('fetching customerInfo');
    
    axios
        .get(`/customer/customerInfo.php?username='${username}'`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: CUSTOMER_INFO,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: CUSTOMER_INFO_FAIL
            })
        })
}

// add fund to customer's balance
export const addFund = (transactionData) => (dispatch) => {

  axios
    .post('/transaction/addFund.php', transactionData)
    .then((res)=>{
        dispatch({
             type: ADD_FUND,
             payload: transactionData.fund
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

// to display Membership Summary
export const displayMemberInfo = () => (dispatch) => {
    dispatch({ type: DISPLAY_MEMBERSHIP });
}

// to display Profile Summary
export const displayProfile = () => (dispatch) => {
    dispatch({ type: DISPLAY_PROFILE });
}

// to open the add fund dialog
export const openAddFund = () => (dispatch) => {
    dispatch({ type: OPEN_ADD_FUND });
}

// to close the add fund dialog
export const closeAddFund = () => (dispatch) => {
    dispatch({ type: CLOSE_ADD_FUND });
}