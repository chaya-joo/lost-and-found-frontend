import { PayloadAction, UnknownAction, createSlice } from "@reduxjs/toolkit";
import { UserType,AuthUserType,UserDetailsType } from "../../types/user.types";

type AuthStateType = {
    user: UserDetailsType | null,
    isAuthenticated: boolean,
    isInitialized: boolean
}

const initialState: AuthStateType = {
    user: null,
    isAuthenticated: false,
    isInitialized: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<AuthUserType>) => {
            debugger
            state.user = action.payload.user;
            debugger
            state.isAuthenticated = true;
            state.isInitialized = true;
        },
        setInitialized: (state: AuthStateType) => {
            state.isInitialized = true
        },
        deleteUser:(state:AuthStateType)=>
        {
            state.user=null;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            state.isAuthenticated=false,
            state.isInitialized=false
        }
    }
})

export const { setUser, setInitialized,deleteUser } = authSlice.actions

export default authSlice.reducer