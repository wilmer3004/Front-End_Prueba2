import {configureStore} from "@reduxjs/toolkit";
import documentoReducer from "./documetoSlice"
import modalSlice from "./modalSlice";
import cargaMasiva from "./cargaMasiva";

export const store = configureStore({
   reducer:{
       documento:documentoReducer,
       modal:modalSlice,
       cargaMasiva:cargaMasiva
   },

});



