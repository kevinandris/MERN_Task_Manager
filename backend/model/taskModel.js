// ! 4 -- create a schema
const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a task"]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        // automatically add timestamps for every data we'll save on database
        timestamps: true
    }
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;