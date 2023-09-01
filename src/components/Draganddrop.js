import React from "react";
import { Button } from "antd";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useRef, useState, useEffect, useContext } from 'react';
import { useContext } from "react";
import AuthContext from '../context/AuthProvider'; // Import your AuthContext


// import "./App.css";
import axios from "axios";

const BASE_URL = `http://localhost:2000/`;

const emojiOptions = [
  { value: "❌", label: "❌ Not Approved" }, // Cross Mark emoji
  { value: "✔️", label: "✔️ Not Approved" }, // Cross Mark emoji
];



class Draganddrop extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      nbre: "",
      newTask: "",
      tasks: [],
    };
  }

  handleLogout = () => {
    const { setAuth } = this.context;
    setAuth({});
    this.props.history.push('/linkpage'); // Navigate to the desired page
  };
  componentDidMount() {
    // Load the stored tasks from local storage
    const storedTasks = localStorage.getItem('dragAndDropTasks');
    if (storedTasks) {
      this.setState({ tasks: JSON.parse(storedTasks) });
    }

    axios.get(`${BASE_URL}task`).then((response) => {
      console.log("data being fetched",response.data);//to check if te data come or not console
      this.setState({ tasks: response.data })


    }).catch((error) => {
      console.log(error);


    })
  }
  componentWillUnmount() {
    // Save the component's tasks to local storage before unmounting
    localStorage.setItem('dragAndDropTasks', JSON.stringify(this.state.tasks));
  }
  //delete
  handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}task/${taskId}`).then((response) => {
      console.log(response);
      console.log(response.status);
      if (response.status == 204) {
        const updatedTasks = this.state.tasks.filter((task) => task._id !== taskId);
        this.setState({ tasks: updatedTasks });
      }
      // console.log(response.data); juste l teste



    }).catch((error) => {
      console.log(error);


    })

  };
  //add
  handleAddTask = () => {

    const { newTask } = this.state;
    if (newTask.trim() === "") return;

    const newTaskObject = {
      content: newTask,
      owner: this.context.userId, // Set the owner ID to the user ID from context


    };


    this.addNewTask(newTaskObject)

  };
  addNewTask = (newTask) => {

    axios.post(`${BASE_URL}task`, newTask).then((response) => {
      // console.log(response.data); juste l teste
      this.setState(
        (prevState) => ({
          tasks: [...prevState.tasks, response.data],//response.data hedha el task elli tzed jdid
          newTask: "",
        }),
      );


    }).catch((error) => {
      console.log(error);


    })
  };
  // handleAddEmoji = (taskId, emoji) => {
  //   const updatedTasks = this.state.tasks.map((task) =>
  //     task._id === taskId ? { ...task, content: emoji + task.content } : task
  //   );

  //   this.setState({ tasks: updatedTasks });
  // };


  handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("application/json", taskId);
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };
  handleDrop = (e, dropZone) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("application/json");
    const taskToUpdate = this.state.tasks.find((task) => task._id === taskId);
  
    if (!taskToUpdate) {
      console.log("Task not found in state");
      return;
    }
  
    const updatedTaskData = {
      ...taskToUpdate,
      status: dropZone,
    };
  
    axios.put(`${BASE_URL}task/${taskId}`, updatedTaskData).then((response) => {
      if (response.status === 200) {
        const updatedTask = response.data; // Updated task from the response
        const updatedTasks = this.state.tasks.map((task) => {
          if (task._id === taskId) {
            return updatedTask;
          } else {
            return task;
          }
        });
  
        this.setState({
          tasks: updatedTasks,
        });
      }
    }).catch((error) => {
      console.log(error);
    });
  };
  
  // handleDrop = (e, dropZone) => {
  //   e.preventDefault();
  //   const taskId = e.dataTransfer.getData("application/json");
  //   axios.put(`${BASE_URL}task/${taskId}`, { status: dropZone }).then((response) => {
  //     if (response.status == 200) {
  //       const updatedTasks = this.state.tasks.filter((task) => task._id !== taskId);
  //       const droppedTask = this.state.tasks.find((task) => task._id === taskId);
  //       this.setState(
  //         {
  //           tasks: [...updatedTasks, response.data],
  //         },
  //       );
  //     }


  //   }).catch((error) => {
  //     console.log(error);


  //   })

  // };
  // handleDrop = (e, dropZone) => {
  //   e.preventDefault();
  //   const taskId = e.dataTransfer.getData("application/json");
  //   const taskToUpdate = this.state.tasks.find((task) => task._id === taskId);
  
  //   if (!taskToUpdate) {
  //     console.log("Task not found in state");
  //     return;
  //   }
  
  //   const updatedTaskData = {
  //     ...taskToUpdate,
  //     status: dropZone,
  //   };
  
  //   axios.put(`${BASE_URL}task/${taskId}`, updatedTaskData).then((response) => {
  //     if (response.status === 200) {
  //       const updatedTasks = this.state.tasks.map((task) => {
  //         if (task._id === taskId) {
  //           return response.data;
  //         } else {
  //           return task;
  //         }
  //       });
  
  //       this.setState({
  //         tasks: updatedTasks,
  //       });
  //     }
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };
  
  render() {
    const { selectedEmoji, tasks, newTask, nbre } = this.state;
    return (

      <div className="drag-and-drop-container">
         <div className="logout-button">
          <button onClick={this.handleLogout}>Sign Out</button>
        </div>
        <div className="add-task">
          <input
            type="text"
            placeholder="Add new task..."
            value={newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
          />
          <button onClick={this.handleAddTask} className="add-task-button">Add Task</button>

        </div>
        {/* <div>
  //add number 
  
  <h1>add number</h1>
  {tasks.filter((task) => task.status === "ticket").map((task) => (
    <div>
 <div>
          <input
            type="text"
            placeholder="Add new nbre..."
            value={nbre}
            onChange={(e) => this.setState({ nbre: e.target.value })}
          />
          <button onClick={this.handleAddTask}>Add nmbre</button>

        </div>
    </div>
  ))}
</div> */}
        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "ticket")}
        >
          <h3>tickets</h3>
          {tasks
            .filter((task) => task.status === "ticket")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
                {task.emoji}
                <div>
                  <strong>Task Owner:</strong>
                  {task.owner.username}
                </div>

                <Button onClick={() => this.handleDeleteTask(task._id)} className="delete-button">
                  Delete
                </Button>
                {<div className="emoji-dropdown">
                  <select
                    type="text"
                    placeholder="Add new task..."
                    value={selectedEmoji}
                    onChange={(e) => {
                      const taskId = task._id;
                      axios.put(`${BASE_URL}task/${taskId}`, { emoji: e.target.value }).then((response) => {
                        if (response.status == 200) {
                          const updatedTasks = this.state.tasks.filter((task) => task._id !== taskId);
                          this.setState(
                            {
                              tasks: [...updatedTasks, response.data],
                            },
                          );
                        }


                      }).catch((error) => {
                        console.log(error);


                      })

                    }}
                  >
                    <option value="">Select Emoji</option>
                    {emojiOptions.map((emoji) => (
                      <option key={emoji.value} value={emoji.value}>
                        {emoji.label}
                      </option>
                    ))}
                  </select>

                </div>}

              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "todo")}
        >
          <h3>To Do</h3>
          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                                {task.emoji}

                {task.content}
                <div>
                  <strong>Task Owner:</strong>
                  {task.owner.username}
                </div>



              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "progress")}
        >
          <h3>In Progress</h3>
          {tasks
            .filter((task) => task.status === "progress")
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.content}
                <div>
                  <strong>Task Owner:</strong>
                  {task.owner.username}
                </div>

              </div>
            ))}
        </div>

        <div
          className="task-list"
          onDragOver={(e) => this.handleDragOver(e)}
          onDrop={(e) => this.handleDrop(e, "complete")}
        >
          <h3>Done</h3>
          {tasks
            .filter((task) => task.status === "complete")//mot cleee mm que le base :3 complete
            .map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => this.handleDragStart(e, task._id)}
                className="task"
              >
                {task.emoji}

                {task.content}
                <div>
                  <strong>Task Owner:</strong>
                  {task.owner.username}
                </div>

              </div>
            ))}
        </div>

      </div>

    );
  }
}

export default Draganddrop;
