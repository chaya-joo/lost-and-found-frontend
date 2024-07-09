import axios from '../utils/axios'
import { ItemType } from "../types/types";

export const GetByCategoryIdApi = async(id:number) => {
    const response = await axios.get(`/Item/category/${id}`);
    return response.data
};
export const GetAllItemsApi = async() => {
    const response = await axios.get(`/Item`);
    return response.data
};
export const GetByUserIdApi = async(id:number) => {
    const response = await axios.get(`/Item/user/${id}`);
    return response.data
};

export const AddItem  = async (itemToPost:ItemType) => {
    const response = await axios.post('/Item',itemToPost,{ headers: { 'Content-Type': 'application/json' } })
    return response.data
};

export const UpdateApi = async (itemToPut:ItemType,id:number) => {
    const response = await axios.put(`/Item/${id}`,itemToPut)
    return response.data
};

export const DeleteApi = async (id: number) => {
    const response= await axios.delete(`/Item/${id}`)
    return response.data
};
