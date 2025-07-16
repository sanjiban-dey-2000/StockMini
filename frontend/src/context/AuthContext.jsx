import { Children, createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, userLogout } from "../services/axiosInstance";
import toast from "react-hot-toast";

const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    const login=(userData)=>setUser(userData);
    const logout=async()=>{
        try{
            const res=await userLogout();
            console.log(res.data);
            setUser(null);
            toast.success("Logged out successfully");
        }catch(error){
            console.log(error.message);
            toast.error("Logout failed");
        }
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth=()=>useContext(AuthContext);