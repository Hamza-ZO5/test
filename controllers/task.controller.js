const Task = require("../models/task.model");

module.exports = {
  createTask: async (req, res) => {
    const newTask = new Task({
      ...req.body,
      owner: req.user.id,
    });

    try {
      /// insert into TASKS values ...........
      const savedTask = await newTask.save();

      return res.status(201).json(savedTask);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
  getAllTasks: async (req, res) => {
    try {
      if (req.user.role === "admin") {
        const tasks = await Task.find().populate("owner", "username");

        return res.status(200).json(tasks);
      } else {
        const tasks = await Task.find({ owner: req.user.id });

        return res.status(200).json(tasks);
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  deleteTask: async (req, res) => {
    try {
      const task = await Task.findById(req.params.taskId);

      /// TASK Not Found
      if (!task) {
        return res.status(404).json({
          message: `Task not found for this id ${req.params.taskId}`,
        });
      }

      /// If Task Found check user permission
      if (req.user.id === task.owner.toString() || req.user.role === "admin") {
        await Task.findByIdAndDelete(req.params.taskId);

        return res.status(204).send();
      } else {
        return res
          .status(403)
          .json("you are not allowed to perform this action");
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  editTask: async (req, res) => {
    try {
      const availableStatus = ["todo", "ticket", "progress", "complete"];
      const status = req.body.status;
      if (status) {
        if (!availableStatus.includes(status)) {
          return res.status(400).json({ msg: "Invalid status value" });
        }
      }

      const task = await Task.findById(req.params.taskId);

      if (!task) {
        return res.status(404).json({
          message: `Task not found for this id ${req.params.taskId}`,
        });
      }

      if (req.user.id === task.owner.toString() || req.user.role === "admin") {
        const updatedTask = await Task.findByIdAndUpdate(
          req.params.taskId,
          req.body,
          { new: true }
        );
        return res.status(200).json(updatedTask);
      } else {
        return res
          .status(403)
          .json("you are not allowed to perform this action");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
