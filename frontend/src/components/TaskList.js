//  ! 1 -- parent
import { useEffect, useState } from "react"
import Task from "./Task"
import TaskForm from "./TaskForm"
import { toast } from "react-toastify"
import axios from "axios"
import { URL } from "../App"
import loadingImg from "../assets/loader.gif"

const TaskList = () => {

    const [formData, setFormData] = useState({
        name: "",
        completed: false
    })

    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [taskID, setTaskID] = useState("")

    const {name} = formData

    const handleInputChange = (e) => {
        const { name, value} = e.target
        setFormData({  ...formData, [name]: value})
    };

    // ! 1. function -- to send data and connect to the database
    const createTask = async (e) => {
        e.preventDefault()
        // console.log(formData)

        // to prevent empty input
        if (name === "") {
            return toast.error("Input field cannot be empty")
        }

        try {
            // send data to the database
            await axios.post(`${URL}/api/tasks`, formData)

            // success message from toast
            toast.success("Task added successfully");

            // clear the input once the data is submitted
            setFormData({...formData, name: ""})

            // reload the task so the removed item is gone
            getTasks()
        } catch (error) {
            toast.error(error.message);
            // console.log(error)
        }
    }

    // ! 2. function to get the data from the database
    const getTasks = async () => {
        setIsLoading(true)

        try {
            // fetch the data from the database
            const {data} = await axios.get(`${URL}/api/tasks`)

            // assign data property to tasks
            setTasks(data)

            setIsLoading(false)
        } catch (error) {
            toast.error(error.message);
            // console.log(error)

            setIsLoading(false)
        }
    }

    useEffect(() => {
        getTasks()
    },[])

    // ! 3. function to delete a data
    const deleteTask = async (id) => {
        try {
            // delete the task in the database
            await axios.delete(`${URL}/api/tasks/${id}`)

            // reload the task so the removed item is gone
            getTasks()
        } catch (error) {
            toast.error(error.message);
        }
    }

    // ! for completed tasks
    useEffect(() => {
        const cTask = tasks.filter((task) => {
            return task.completed === true
        })

        setCompletedTasks(cTask)
    }, [tasks])

    // ! 4. function to get a single task
    const getSingleTask = async (task) => {
        try {
            // grab the data properties
            setFormData({name: task.name, completed: false})

            setTaskID(task._id)

            // fetch the edit button
            setIsEditing(true)
            
        } catch (error) {
            toast.error(error.message);
        }
    }

    // ! 5. function to update a task
    const updateTask = async (e) => {
        // to prevent reload for the page
        e.preventDefault()

        if (name === "") {
            return toast.error("Input field cannot be empty.")
        }

        try {
            await axios.put(`${URL}/api/tasks/${taskID}`, formData)

            // clear the input once the data is submitted
            setFormData({...formData, name: ""})
            
            // bring back the add button 
            setIsEditing(false)

            // refresh the page by calling getTasks function
            getTasks()
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ! 6. function to complete a task and get task count
    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            completed: true,
        }

        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)

            // refresh the page by calling getTasks function
            getTasks()
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            <h2>Task Manager</h2>

            {/* 1. the FORM */}
            <TaskForm 
                name={name} 
                handleInputChange={handleInputChange} 
                createTask={createTask}
                isEditing={isEditing}
                updateTask={updateTask}
            />

            {/* 2. The information */}
            {tasks.length > 0 && (
                <div className="--flex-between --pb">
                    <p>
                        <b>Total Tasks:</b> {tasks.length}
                    </p>

                    <p>
                        <b>Completed Tasks:</b> {completedTasks.length}
                    </p>
                </div>
            )}

            <hr />

            {/* 3. the Task */}
            
            {/* condition before I display the task */}
            {isLoading && (
                <div className="--flex-center">
                    <img src={loadingImg} alt="Loading" />
                </div>
            )}

            {/* display the data */}
            {
                !isLoading && tasks.length === 0 ? (
                    <p className="--py">No task added. Please add a task</p>
                ) : (
                    <>
                        {/* represent every item */}
                        {tasks.map((task, index) => {
                            return (
                                <Task 
                                    key={task._id} 
                                    task={task} 
                                    index={index}
                                    setToComplete={setToComplete}
                                    getSingleTask={getSingleTask}
                                    deleteTask={deleteTask}
                                />
                            )
                        })}
                    </>
                )
            }
            
        </div>
    )
}

export default TaskList