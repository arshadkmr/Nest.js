import express from 'express';
import { insertUser,loginUser ,insertTask,getTask,updateTask,deleteTask} from '../controller/userController.js';
import userAuthenticateToken from '../middleware/userMiddleware.js';

const userRoute = express()

userRoute.post('/register', insertUser)
userRoute.post('/login', loginUser)
userRoute.post('/task',userAuthenticateToken,insertTask)
userRoute.get('/task',userAuthenticateToken,getTask)
userRoute.patch('/task',userAuthenticateToken,updateTask)
userRoute.delete('/task/:id',userAuthenticateToken,deleteTask)

export default userRoute