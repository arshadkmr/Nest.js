import mongoose from "mongoose";

const todoModel = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

    export default mongoose.model('Todo', todoModel)