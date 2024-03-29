import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    numeroCompania:null,
    documento:"",
};

export const documentoSlice = createSlice({
    name:"documento",
    initialState,
    reducers:{
        changeNumCompani:(state,action)=>{
            state.numeroCompania = action.payload;
        },

        changeDocument:(state,action)=>{
          state.documento = action.payload;
        },
    }
});

export const {changeNumCompani,changeDocument} = documentoSlice.actions;
export default documentoSlice.reducer;



