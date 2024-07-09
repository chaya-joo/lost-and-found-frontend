import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RequestType } from '../../types/types'

type RequestStateType={
    requests:RequestType[]
}

const initialState: RequestStateType = { requests: []}
const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        setRequests:(state,action: PayloadAction<RequestType[]>)=>{
            state.requests=action.payload;
        },
        addRequest: (state, action: PayloadAction<RequestType>) => {
            state.requests.push(action.payload)
        },
        updateRequest: (state, action: PayloadAction<RequestType>) => {
            const index=state.requests.findIndex(c=>action.payload.id)
            state.requests[index]=action.payload
        },
        deleteRequest:(state,action: PayloadAction<number>)=>{
            const index=state.requests.findIndex(c=>action.payload)
            state.requests.slice(index,1)
        },
    }

})
export const {setRequests: setRequests,addRequest,updateRequest,deleteRequest}=requestSlice.actions
export default requestSlice.reducer