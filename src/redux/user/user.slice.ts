import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {UserDetailsType, UserType} from '../../types/user.types'

type UserStateType={
    users:UserDetailsType[]
}

const initialState: UserStateType = { users: []}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers:(state,action: PayloadAction<UserDetailsType[]>)=>{
            state.users=action.payload;
        },
        addUser: (state, action: PayloadAction<UserDetailsType>) => {
            state.users.push(action.payload)
        },
        updateUser: (state, action: PayloadAction<UserDetailsType>) => {
            const index=state.users.findIndex(c=>action.payload.id)
            state.users[index]=action.payload
        },
        deleteUser:(state,action: PayloadAction<number>)=>{
            const index=state.users.findIndex(c=>action.payload)
            state.users.slice(index,1)
        },
    }

})
export const {setUsers,addUser,updateUser,deleteUser}=userSlice.actions
export default userSlice.reducer