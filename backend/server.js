import express from 'express';
import dotenv from 'dotenv';
import connetDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connetDB();
const port = process.env.PORT;
const app = express();

app.get('/',(req, res)=>{
    res.send("API is Running ")

});

app.use('/api/products', productRoutes)

app.use(notFound);

app.use(errorHandler);



app.listen(port, ()=>{console.log(`Server is running on port ${port}`)})
