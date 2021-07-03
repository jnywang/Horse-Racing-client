import {
    ALL_JOCKEY_INFO,
    ALL_JOCKEY_INFO_FAIL,
    JOCKEY_INFO,
    JOCKEY_INFO_FAIL
} from '../types';
import axios from 'axios';

// fetch all jockey info
export const fetchAllJockeys = () => (dispatch) => {
    // console.log('fetching all jockey info');
    axios
        .get(`/jockey/allJockeyInfo.php`)
        .then((res) => {
            // console.log(res.data.records);
            dispatch({
                type: ALL_JOCKEY_INFO,
                payload: res.data.records
            });
        })
        .catch((err) => {
            dispatch({
                type: ALL_JOCKEY_INFO_FAIL
            })
        })
}

// fecth jockey information
export const fetchSingleJockey = (jockeyID) => (dispatch) => {
    
    axios
        .get(`/jockey/jockeyInfo.php?jockeyid=${jockeyID}`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: JOCKEY_INFO,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: JOCKEY_INFO_FAIL
            })
        })
}