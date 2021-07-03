import {
    CUSTOMER_BET_INFO,
    CUSTOMER_BET_INFO_FAIL
} from '../types';

const initialState = {
    bets: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_BET_INFO:
            return {
                ...state,
                bets: action.payload
            }
        case CUSTOMER_BET_INFO_FAIL:
            return {
                ...state,
                nickname: 'Failed to Retrieve User Data'
            }
        default:
            return state;
    }
}