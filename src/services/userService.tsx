import axios from "../utils/axios";
import { UserType } from "../types/user.types";

export const GetAllUsersApi  = async () => {
   const response=await axios.get('/User/Details')
   return response.data
};
export const GetUserByIdApi  = async (id:number) => {
   const response=await axios.get(`/User/${id}`)
   return response.data
};
export const PostApi  = async (userToPost:UserType) => {
    const response = await axios.post('/User/signIn',userToPost)
    debugger
    return response.data
};
export const UpdateApi = async (userToPut:UserType,id:number) => {
    const response = await axios.put(`/User/${id}`,userToPut)
    return response.data
};

export const DeleteApi = async (id: number) => {
    const response= await axios.delete(`/User/${id}`)
    return response.data
};