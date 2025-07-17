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
    return await api.post('/category/add-category',formData);
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

export const getCurrentUser=async()=>{
    return await api.get('/user/verify');
}

export const updateProduct=async(id,data)=>{
    return await api.put(`/product/update/${id}`,data);
}

export const deleteProduct=async(id)=>{
    return await api.delete(`/product/delete/${id}`);
}

export const deleteCategory=async(id)=>{
    return await api.delete(`/category/delete/${id}`);
}

export const updateCategory=async(id,data)=>{
    return await api.put(`/category/update/${id}`,data);
}

export const userLogout=async()=>{
    return await api.post('/user/logout');
}

export const updateSupplier=async(id,data)=>{
    return await api.put(`/supplier/update/${id}`,data);
}

export const deleteSupplier=async(id)=>{
    return await api.delete(`/supplier/delete/${id}`);
}

export const getCustomers =async () => {
    return await api.get('/customer/getCustomer');
}
export const addCustomer = async (data) => {
    return await api.post('/customer/add',data);
}
export const updateCustomer =async (id, data) => {
    return await api.put(`/customer/update/${id}`,data);
}
export const deleteCustomer = async (id) => {
    return await api.delete(`/customer/delete/${id}`);
}

export const getOrders =async () => {
    return await api.get('/order/getOrder');
}
export const addOrder =async (data) => {
    return await api.post('/order/create',data);
}
export const updateOrder =async (id, data) => {
    return await api.put(`/order/update/${id}`,data);
}
export const deleteOrder =async (id) => {
    return await api.delete(`/order/${id}`);
}

export const getPayments =async () => {
    return await api.get('/payment/get');
}
export const addPayment =async (data) =>{
    return await api.post('/payment/add',data);
} 
