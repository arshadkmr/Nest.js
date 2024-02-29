import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';




if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}


const app = express();
const port = 5000

app.use(express.json())
app.use(cors())

app.use('/', userRoute)

app.listen(port, () => { console.log(`listening on port ${port}`); });
connectDB()
