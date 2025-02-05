import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface appState {
    auth:boolean;
    role:string | null;
}

const initialState : appState = {
    auth : false,
    role : null
}

const AppSlice = createSlice({
    name: 'appSlice',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        SetLogin : (state) => {
            state.auth = true;
        },
        setRole: (state,action : PayloadAction<string>) => {
            state.role = action.payload;
        }
    },
})

export const {SetLogin,setRole} = AppSlice.actions
export default AppSlice.reducer;