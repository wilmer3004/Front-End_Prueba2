import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    estadoModal: "",
    idCompania: null,
    nombreComp:"",
    NIT: null,
    nombreRepre: "",
    estadoComp:null
};

export const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        changeModal:(state,action)=>{
            // Verificar si 'action.payload' y 'action.payload.idCompania' están definidos
            if (action.payload && action.payload.idCompania !== undefined) {
                const { idCompania, nombreComp, nombreRepre, NIT, estadoComp } = action.payload;
                state.idCompania = idCompania;
                state.nombreComp = nombreComp;
                state.nombreRepre = nombreRepre;
                state.NIT = NIT;
                state.estadoComp = estadoComp;
            } else {
                // Manejar el caso donde 'idCompania' no está presente en 'action.payload'
                console.error("La propiedad 'idCompania' no está definida en action.payload");
            }
        },

        changeEstadoModal:(state,action)=>{
            state.estadoModal = action.payload;
        }
    }
});

export const { changeModal, changeEstadoModal } = modalSlice.actions;
export default modalSlice.reducer;