import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTask } from "../features/tasks/tasksSlice";
import "../assets/styles/TaskForm.css";

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("高");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      dueDate,
    };
    dispatch(addTask(newTask));
    setTitle("");
    setDescription("");
    setPriority("高");
    setDueDate("");
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="任务标题"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="任务描述"
        required
      />
      <div className="formArea">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">添加任务</button>
    </form>
  );
};

export default TaskForm;
