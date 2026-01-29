import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
const port = 5000;

dotenv.config();



mongoose.connect(process.env.DB_URL).then((val) => {
  app.listen(port, () => {
    console.log('connected and server is running ');
  });
}).catch((err) => {
  console.log(err);
});




app.use(cors())
app.use(express.json());
app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));

app.use(express.static('uploads'));



app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: 'hello jee welcome to Server'
  });
});




app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);







