const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const { verifyUser, isAnAdmin } = require("../middlewares/verifyUser");

/**
 * @POST create new resource
 * @GET Get
 * @DELETE delete
 * @PUT update
 */

router.post("/", verifyUser, taskController.createTask);

/// ADMIN
router.get("/", verifyUser, taskController.getAllTasks);


router.delete("/:taskId",verifyUser, taskController.deleteTask);
router.put("/:taskId",verifyUser, taskController.editTask);

module.exports = router;
