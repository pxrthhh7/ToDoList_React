import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {

  // This State is use for handel input text when task is add
  const [input, setInput] = useState("");
  // This is use for handel index when task is Edit
  const [editIndex, setEditIndex] = useState(null)
  // This is use for handel input value when task is Edit
  const [editValue, setEditValue] = useState("")
  // This is use for Hold the all Task's
  const [task, setTask] = useState(() => {
    const storedTask = localStorage.getItem('task');
    return storedTask ? JSON.parse(storedTask) : [];
  });

  // That is the store the task into local storage when any Changes occured into task State
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);


  // That can Handel Add task Button
  const handleAdd = () => {
    if (input !== "") {
      const updatedTask = [...task, { input, isCompleted: false }];
      setTask(updatedTask);
      setInput("");
    }
  };

  // That can Handel Edit task Button
  const handleEdit = (index) => {
    setEditIndex(index)
  };

  // That can Handel Complete and Undo task Button
  const handleCompleted = (index) => {
    const updatedTasks = [...task];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTask(updatedTasks);
  };

  // That can Handel Delete task Button
  const handleDelete = (index) => {
    const deletedTask = [...task];
    deletedTask.splice(index, 1);
    setTask(deletedTask);
  };

  // That can Handel Save task Button after edit the task
  const handleSaveEdit = ((index) => {
    if (editValue !== "") {
      const updatedTask = [...task];
      updatedTask[index].input = editValue
      setTask(updatedTask)
      setEditIndex(null)
      setEditValue("")
    }
  })

  return (
    <div className="w-full min-h-screen bg-[#F1E8CD] flex justify-center items-center px-4">
      <div className="bg-[#172719] w-full max-w-3xl rounded-2xl p-6 sm:p-8 my-20 shadow-lg">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#F1E8CD] mb-6 font-semibold">Create your Todo-List</h1>

        {/* Add Task Field */}
        <div className="flex flex-col sm:flex-row gap-4 text-[#F1E8CD] mb-10">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 border border-[#F1E8CD] bg-transparent rounded-[15px] px-4 py-3 placeholder:text-[#F1E8CD] outline-none text-sm sm:text-base" type="text" placeholder="What are your tasks for today?" />
          <button onClick={handleAdd} className="whitespace-nowrap border border-[#F1E8CD] rounded-[15px] px-5 py-3 font-bold text-sm sm:text-base hover:bg-[#F1E8CD] hover:text-[#172719] transition">Add</button>
        </div>

        <div className="space-y-4">
          {task.map((e, i) => (
            <div key={i} className="border border-[#F1E8CD] w-full min-h-[55px] flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 rounded-[15px] bg-[#1f3323]">
              {
                editIndex === i ?
                  (
                    <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} className='text-[#F1E8CD] border-b outline-none text-sm sm:text-base break-words' />
                  )
                  :
                  (
                    <p className={`text-[#F1E8CD] text-sm sm:text-base break-words ${e.isCompleted ? 'line-through' : ''}`}>
                      {e.input}
                    </p>
                  )
              }

              {/* All Button's For Handel Task's */}
              <div className="flex gap-4 mt-2 sm:mt-0 flex-wrap sm:flex-nowrap">

                {editIndex === i ?
                  (
                    <button onClick={() => handleSaveEdit(i)} className="text-[#00c78a] text-sm sm:text-base hover:underline">
                      SAVE
                    </button>
                  )
                  :
                  (
                    <button onClick={() => handleEdit(i)} className="text-[#00c78a] text-sm sm:text-base hover:underline">
                      EDIT
                    </button>
                  )

                }
                <button onClick={() => handleCompleted(i)} className="text-[#ff9c27] text-sm sm:text-base hover:underline">
                  {task[i].isCompleted ? "UNDO" : "COMPLETED"}
                </button>
                <button onClick={() => handleDelete(i)} className="text-[#dc143c] text-sm sm:text-base hover:underline">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
