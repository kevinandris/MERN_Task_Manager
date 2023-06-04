//  ! 6 -- controller is a file that saves our callback functions
//  ! if "await keyword is missing", the function won't work
const Task = require("../model/taskModel");

const createTask = async (req, res) => {
    try {
        const task  = await Task.create(req.body)

        // display the task
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

const getTask = async (req, res) => {

    try {
        const { id } = req.params
        const task = await Task.findById(id);

        // if a task could not be found on DATABASE
        if (!task) {
            return res.status(404).json(`NO task with id: ${id}`);
        }
        
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)

        // if a task could not be found on DATABASE
        if (!task) {
          return res.status(404).json(`NO task with id: ${id}`);
        }

        res.status(200).send("Task deleted")
        
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(
            {_id: id}, req.body, {
                new: true,
                runValidators: true,
            }
        );

        // if a task could not be found on DATABASE
        if (!task) {
            return res.status(404).json(`NO task with id: ${id}`);
        }

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}

