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

import axios from 'axios';

export const fetchRaceStadiumInfo = () => (dispatch) => {

    axios
        .get(`/race/stadiumInfo.php`)
        .then((res) => {
            dispatch({
                type: RACE_STADIUM_INFO,
                payload: res.data.records
            });
        })
        .catch((err) => {
            dispatch({
                type: RACE_STADIUM_INFO_FAIL
            })
        })
}

export const fetchRaceInfo = (raceid) => (dispatch) => {

    axios
    .get(`/race/raceInfo.php?raceid=${raceid}`)
    .then((res)=>{
        console.log('priting race info');
        console.log(res.data);
        dispatch({
            type: RACE_INFO,
            payload: res.data.records
        });
    })
    .catch((err) => {
        if (err.response.status === 404) {
            dispatch({type: NO_HORSES_REGISTERED});
        }
        dispatch({
            type: RACE_INFO_FAIL
        })
    })
}

export const raceInitialFail = () => (dispatch) => {
    dispatch({
        type: RACE_INFO_FAIL
    })
}

export const setRaceLocation = (location) => (dispatch) => {
    dispatch({
        type: SET_RACE_LOCATION,
        payload: location
    })
}


export const setBetTrue = () => (dispatch) => {
    dispatch({
        type: BET_TRUE
    })
}

export const setBetFalse = () => (dispatch) => {
    dispatch({
        type: BET_FALSE
    })
}

export const setBetDetails = (betDetails) => (dispatch) => {
    dispatch({
        type: BET_DETAILS,
        payload: betDetails
    })
}