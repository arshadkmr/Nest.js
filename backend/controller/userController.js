import User from '../Models/userModel.js'
import Todo from '../Models/todoModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../util/token.js'

export const insertUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(409).json({
                message: 'User already exists !!!'
            })
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            if (hashPassword) {
                const newUser = await User.create({
                    name,
                    email,
                    password: hashPassword
                })
                if (newUser) {
                    const token = generateToken(newUser._id)
                    res.status(201).json({
                        token,
                        Id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        mobile: newUser.mobile,
                        isAdmin: newUser.isAdmin,
                        wallet: newUser.wallet
                    })
                } else {
                    res.status(400).json({
                        message: 'User creation failed'
                    })
                }
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email })
        if (userData) {
            const compare = await bcrypt.compare(password, userData.password)
            if (compare) {
                const token = generateToken(userData._id)
                res.status(200).json({
                    token,
                    Id: userData._id,
                    name: userData.name,
                    email: userData.email
                })
            } else {
                res.status(401).json({
                    message: 'Invalid password'
                })
            }
        } else {
            res.status(404).json({
                message: "User Not Found"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const insertTask = async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const { task } = req.body
            const newTask = await Todo.create({
                userId: userId._id.toString(),
                task
            })
            await newTask.save()
            res.status(201).json({
                newTask
            })
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const getTask = async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const tasks = await Todo.find({ userId: userId._id.toString() }).sort({createdAt: -1})
            res.status(200).json({
                tasks
            })
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const updateTask = async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const { id } = req.body
            const task = await Todo.findOne({ _id: id })
            task.completed = true
            await task.save()
            res.status(200).json({
                task
            })
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const { id } = req.params
            const task = await Todo.findOneAndDelete({ _id: id })
            res.status(200).json({ task })
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}