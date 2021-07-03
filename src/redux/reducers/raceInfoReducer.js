import {
    RACE_STADIUM_INFO,
    RACE_STADIUM_INFO_FAIL,
    RACE_INFO,
    RACE_INFO_FAIL,
    BET_TRUE,
    BET_FALSE,
    SET_RACE_LOCATION,
    BET_DETAILS,
    NO_HORSES_REGISTERED
} from '../types';

const initialState = {
    stadiums: [],
    races: [],
    raceLocation: 0,
    curBetType: '',
    bet: false,
    selectedHorse: 0,
    selectedRace: 0,
    noHorsesRegistered: false
}

export default function (state =initialState, action) {
    switch(action.type){
        case RACE_STADIUM_INFO:
            return {
                ...state,
                stadiums: action.payload,
                raceLocation: action.payload[0].raceid
            }
        case RACE_STADIUM_INFO_FAIL:
            return {
                stadiums:[{
                    "raceid": 0,
                    "stadium_name": "No Data Retrieved",
                    "stadium_address": "No Data Retrieved",
                    "race_type": "No Data Retrieved",
                    "race_date": "No Data Retrieved"
                }],
                raceLocation: 0
            }
        case RACE_INFO:
            return {
                ...state,
                races: action.payload,
                noHorsesRegistered: false
            }
        case RACE_INFO_FAIL:
            return {
                ...state,
                races: [{
                    "raceid": 0,
                    "horseid": 0,
                    "nickname": "No Data Retrieved",
                    "rank": "No Data Retrieved",
                    "odds": "No Data Retrieved",
                    "number_of_races": "No Data Retrieved",
                    "age": "No Data Retrieved"
                }],
                raceLocation: 0
            }
        // update this to set bet_type
        case SET_RACE_LOCATION:
            return {
                ...state,
                raceLocation: action.payload
            }
        case BET_TRUE:
            return {
                ...state,
                bet: true
            }
        case BET_FALSE:
            return {
                ...state,
                bet: false
            }
        case BET_DETAILS:
            return {
                ...state,
                selectedHorse: action.payload.horseid,
            }
        case NO_HORSES_REGISTERED:
            return {
                ...state,
                noHorsesRegistered: true
            }
        default:
            return state;
    }
}