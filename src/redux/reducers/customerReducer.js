import {
    CUSTOMER_INFO,
    DISPLAY_PROFILE,
    DISPLAY_MEMBERSHIP,
    OPEN_ADD_FUND,
    CLOSE_ADD_FUND,
    ADD_FUND,
    CUSTOMER_INFO_FAIL
} from '../types';

const initialState = {
    accountID: "",
    memberID: "",
    username: "",
    name: "",
    address: "",
    balance: 0,
    fundWindow: false,
    memberOrProfile: true,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_INFO:
            return {
                ...state,
                accountID: action.payload.accountID,
                memberID: action.payload.memberID,
                username: action.payload.username,
                name: action.payload.name,
                address: action.payload.address,
                balance: action.payload.balance
            }
        case DISPLAY_MEMBERSHIP:
            return {
                ...state,
                memberOrProfile: true
            }
        case DISPLAY_PROFILE:
            return {
                ...state,
                memberOrProfile: false
            }
        case OPEN_ADD_FUND:
            return {
                ...state,
                fundWindow: true
            }
        case CLOSE_ADD_FUND:
            return {
                ...state,
                fundWindow: false
            }
        case ADD_FUND:
            let newBalance = parseInt(state.balance) + parseInt(action.payload);
            return {
                ...state,
                balance: newBalance
            }
        case CUSTOMER_INFO_FAIL:
            return {
                ...state,
                accountID: 'No Data Retrieved',
                memberID: 'No Data Retrieved',
                username: 'No Data Retrieved',
                name: 'No Data Retrieved',
                address: 'No Data Retrieved',
                balance: 'No Data Retrieved'
            }
        default:
            return state;
    }
}