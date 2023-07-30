import React, {useEffect, useState } from "react";
import { Button, Table, Input, Space, Card, Select } from 'antd';
import "./App.css";
const emojiOptions = [ 
  { value: '😃', label: '😃 Smiling' },
  { value: '❤️', label: '❤️ Heart' },
  { value: '👍', label: '👍 Thumbs Up' },
  { value: '🚀', label: '🚀 Rocket' },
];


const { Column } = Table;
const { Meta } = Card;

function Draganddrop() {
  const [selectedEmoji, setSelectedEmoji] = useState('🙂');

  // Function to handle emoji selection
  const handleEmojiChange = (value) => {
    setSelectedEmoji(value);
  };
  const initialTasks = [
    { id: 'task-1', content: 'Task 1', status: 'tickets' },
    { id: 'task-2', content: 'Task 2', status: 'tickets' },
    { id: 'task-3', content: 'Task 3', status: 'tickets' },
    { id: 't', content: 'Task 4', status: 'To Do' },

  ];
  const [tasks, setTasks] = useState(() => {
    //retrieve "getItem"data from the browser's local storage based on the provided key"tasks""
    const storedTasks = localStorage.getItem("tasks");
    //condition ? trueValue : falseValue
    return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    //el return heyya bch tetsajel fel tasks
    
  });//btw he will always return the stored data khater deja tsjlet
  //ay changement bch ysir aala tasks bch ytsjl bel fnction hook useeffect
  useEffect(() => {
    // Save(localStorage.setItem) data mta3 tasks fel LocalStorage mta3 
    //browser sous forme(JSON string)whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [newTask, setNewTask] = useState('');

  const handleDeleteTask = (taskId) => {
    //filtrage bch yhez les elem lkol mta3 tasks b khlef l'ele elli aandou id=taskId
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    //we choosed the id(tasId) to be the data that being tranfered <3 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropZone) => {
    e.preventDefault();
    //we called the data that we shoosed to be moved(taskId)
    const taskId = e.dataTransfer.getData('text/plain');
    //we do the update in terms of th dragable id will be removed from it's latest status
    //by removing it from tasks array,after that we make recombo with the new status of the draggble item in the tasks array

    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const droppedTask = tasks.find((task) => task.id === taskId);
    setTasks([...updatedTasks, { ...droppedTask, status: dropZone }]);//dropzone("enti w win bh taychou")
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newTaskObject = { id: `task-${Date.now()}`, content: newTask, status: 'tickets' };
    setTasks([...tasks, newTaskObject]);//... copie
    setNewTask('');
  };

  return (
    <div className="drag-and-drop-container">
      <div className="add-task">
        <input
          type="text"
          placeholder="Add new task..."
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          //getting the info and use the handleAddTask to add it to the tasks array that it will atouch them with the tickets coloumn
        />
        
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div
        className="task-list"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 'tickets')}
      >
        <h3>tickets</h3>
        {tasks
          .filter((task) => task.status === 'tickets') // Corrected the status to 'tickets'
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="task"
            >

              {task.content}
              <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              

            </div>
          ))}
      </div>

       <div
        className="task-list"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 'todo')}
      >
        <h3>To Do</h3>
        {tasks
          .filter((task) => task.status === 'todo')
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="task"
            >
              {task.content}
            </div>
          ))}
      </div>

      <div
        className="task-list"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 'inProgress')}
      >
        <h3>In Progress</h3>
        {tasks
          .filter((task) => task.status === 'inProgress')//drope zone'inProgress'
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="task"
            >
              {task.content}
            </div>
          ))}
      </div>

      <div
        className="task-list"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, 'done')}
      >
        <h3>Done</h3>
        {tasks
          .filter((task) => task.status === 'done')
          .map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              className="task"
            >
              {'content of the tasks:° '+task.content+'//status of the tasks:'+task.status+'//id of the task:°'+task.id}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Draganddrop;