import {
    ADD_RACE
} from '../types';
import axios from 'axios';

// add race
export const addRace = (rdata) => (dispatch) => {
    console.log('adding');
    console.log(rdata);
    axios
      .post(`/race/addrace.php`, rdata)
      .then((res)=>{
          console.log("printing out response")
          console.log(res.data);
          dispatch({
              type: ADD_RACE,
              payload: rdata
          })
      })
  }