const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const path=require('path');
const cookieParser=require('cookie-parser');
const {connect}=require('./lib/dbConnect');
const userRouter=require('./routes/authRoutes');
const categoryRouter=require('./routes/categoryRoutes');
const productRoute=require('./routes/productRoute');
const supplierRoute=require('./routes/supplierRoute');
const customerRouter=require('./routes/customerRoute');
const orderRouter=require('./routes/orderRoutes');
const paymentRouter=require('./routes/paymentRoutes');

const app=express();
const PORT=process.env.PORT || 5001;
const MONGO_URI=process.env.MONGO_URI;

connect(MONGO_URI).then(()=>{
    console.log('Database connected successfully');
}).catch((error)=>{
    console.log(`Error occured in database connection ${error.message}`);
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/assets',express.static(path.resolve('public/assets')));


app.use('/api/user',userRouter);
app.use('/api/category',categoryRouter);
app.use('/api/supplier',supplierRoute);
app.use('/api/product',productRoute);
app.use('/api/customer',customerRouter);
app.use('/api/order',orderRouter);
app.use('/api/payment',paymentRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port no ${PORT}`);
})