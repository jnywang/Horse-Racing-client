import {
    ADD_SUPPLIER
} from '../types';
import axios from 'axios';

// add supplier
export const addSupplier = (sdata) => (dispatch) => {
    console.log('adding');
    console.log(sdata);
    axios
      .post(`/supplier/addsupplier.php`, sdata)
      .then((res)=>{
          console.log("printing out response")
          console.log(res.data);
          dispatch({
              type: ADD_SUPPLIER,
              payload: sdata
          })
      })
  }