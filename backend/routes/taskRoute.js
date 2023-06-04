// ! 5 -- routes
const express = require ("express")
const { getTasks, createTask, getTask, deleteTask, updateTask } = require("../controllers/taskController")

// How to define a router
const router = express.Router()

// ! routes
// 1. Create a Task
router.post("/", createTask)
// 2. Get / Read all task
router.get("/", getTasks)
// 3. get a single task
router.get("/:id", getTask)
// 4, delete a single task
router.delete("/:id", deleteTask)
// 5. update a task (put (ALL) & patch(single))
router.put("/:id", updateTask)


// ! ===========> shorter way < ======================= ! 
// router.route("/").get(getTasks).post(createTask)
// router.route("/:id").get(getTask).delete(createTask).put(updateTask)
// ! ========================================== !


// * req.body (the body of data that sends with the request)
// console.log(req.body)

// * doesn't send infinitely
// res.send("Task created")



module.exports = router