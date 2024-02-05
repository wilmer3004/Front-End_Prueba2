import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    estado:""
};

export const cargaMasivaSlice = createSlice({
    name:"cargaMasiva",
    initialState,
    reducers:{
        changeEstado:(state,action)=>{
          state.estado = action.payload;
        },
    }
});

export const { changeEstado } = cargaMasivaSlice.actions;
export default cargaMasivaSlice.reducer;
