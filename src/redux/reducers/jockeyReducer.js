import {
    ALL_JOCKEY_INFO,
    ALL_JOCKEY_INFO_FAIL,
    JOCKEY_INFO,
    JOCKEY_INFO_FAIL
} from '../types';

const initialState = {
    jockeys: [],
    jockeyid:0,
    name: "",
    years_of_exp: "",
    horse_club: "",
    num_of_horse_ridden: 0
}

export default function (state = initialState, action) {
    switch(action.type) {
        case ALL_JOCKEY_INFO:
            return {
                ...state,
                jockeys: action.payload
            }
        case ALL_JOCKEY_INFO_FAIL:
            return state;
        case JOCKEY_INFO:
            return {
                ...state,
                jockeyid: action.payload.horseID,
                name: action.payload.jName,
                years_of_exp: action.payload.years_of_exp,
                horse_club: action.payload.hName,
                num_of_horse_ridden: action.payload.num_of_horse_ridden
            }
        case JOCKEY_INFO_FAIL:
            return state;
        default:
            return state;
    }
}