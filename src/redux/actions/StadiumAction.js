import {
    ADD_STADIUM
} from '../types';
import axios from 'axios';

// add stadium
export const addStadium = (sddata) => (dispatch) => {
    console.log('adding');
    console.log(sddata);
    axios
      .post(`/stadium/addstadium.php`, sddata)
      .then((res)=>{
          console.log("printing out response")
          console.log(res.data);
          dispatch({
              type: ADD_STADIUM,
              payload: sddata
          })
      })
  }