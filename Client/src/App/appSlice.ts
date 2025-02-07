import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface appState {
    auth:boolean;
    role:string | null;
    userRegisterInfoState:{
        FirstName : string,
        LastName:string,
        Role:string,
        Email:string,
        Password:string
    },
    isOtpGenerating : boolean,
    isOtpCorrect : boolean,
    isOtpGenerated : boolean
}

const initialState : appState = {
    auth : false,
    role : null,
    userRegisterInfoState:{
        FirstName:"",
        LastName:"",
        Role:"",
        Password:"",
        Email:""
    },
    isOtpGenerating:false,
    isOtpCorrect : false,
    isOtpGenerated:false
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
        },
        setUserinfoForRegister:(state,action)=> {
            const data = {...action.payload};
            state.userRegisterInfoState = {...data};
        },
        setOtpGenerating:(state)=>{
            state.isOtpGenerating = !state.isOtpGenerating
        },
        setIsOtpGenerated:(state,{payload=true})=>{
            state.isOtpGenerated = payload
        }
    },
})

export const {SetLogin,setRole,setUserinfoForRegister
    , setOtpGenerating,setIsOtpGenerated
} = AppSlice.actions
export default AppSlice.reducer;