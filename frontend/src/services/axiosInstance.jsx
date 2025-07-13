import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true,
});

export const signup=async(data)=>{
    return await api.post('/user/signup',data);
}

export const login=async(data)=>{
    return await api.post('/user/login',data);
}

export const addCategory=async(formData)=>{
    return await api.post('/category/add-category',formData,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    });
};

export const addProduct=async(formData)=>{
    return await api.post('/product/add-product',formData);
};

export const addSupplier=async(data)=>{
    return await api.post('/supplier/add-supplier',data);
};

export const getProduct=async()=>{
    return await api.get('/product/get-product');
}

export const getCategory=async()=>{
    return await api.get('/category/get-category');
}

export const getSupplier=async()=>{
    return await api.get('/supplier/get-supplier');
}