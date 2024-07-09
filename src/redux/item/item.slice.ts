import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ItemType } from '../../types/types'

type ItemStateType={
    items:ItemType[]
}

const initialState: ItemStateType = { items: []}
const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItems:(state,action: PayloadAction<ItemType[]>)=>{
            state.items=action.payload;
        },
        addItem: (state, action: PayloadAction<ItemType>) => {
            state.items.push(action.payload)
        },
        updateItem: (state, action: PayloadAction<ItemType>) => {
            const index=state.items.findIndex(c=>action.payload.id)
            state.items[index]=action.payload
        },
        deleteItem:(state,action: PayloadAction<number>)=>{
            const index=state.items.findIndex(c=>action.payload)
            state.items.slice(index,1)
        }
    }

})
export const {setItems,addItem,updateItem,deleteItem}=itemSlice.actions
export default itemSlice.reducer