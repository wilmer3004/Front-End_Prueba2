import {configureStore} from "@reduxjs/toolkit";
import documentoReducer from "./documetoSlice"

export const store = configureStore({
   reducer:{
       documento:documentoReducer,
   },
});



