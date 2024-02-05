import {configureStore} from "@reduxjs/toolkit";
import documentoReducer from "./documetoSlice"
import modalSlice from "./modalSlice";

export const store = configureStore({
   reducer:{
       documento:documentoReducer,
       modal:modalSlice
   },

});



