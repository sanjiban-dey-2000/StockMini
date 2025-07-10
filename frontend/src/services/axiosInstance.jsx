import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
});

export const signup=async(data)=>{
    return await api.post('/user/signup',data);
}