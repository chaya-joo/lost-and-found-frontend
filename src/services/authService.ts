import axios from "../utils/axios";
import { UserType ,AuthUserType,UserDetailsType} from '../types/user.types'

export const login = async (Email: string, Password: string) => {
    const {data} = await axios.post('/Auth/Login', { Email, Password })
    const { name, id, token ,phone,email} = data;
    const userDetails: UserDetailsType = { name: name,id:id,phone:phone,email:email };
    debugger
    if(data)
    return {
        token:token,
        user:userDetails
    }
    return null
};



