import React, { useState } from "react";
import { editTask } from "../features/tasks/tasksSlice.ts";
import { Task } from "../api/tasksApi";
import { useAppDispatch } from "../app/hooks.ts";
import TaskDetails from "./TaskDetails.tsx";
import TagManager from "./TagManager.tsx";
import "../assets/styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <TaskDetails
          task={editedTask}
          onSave={handleSave}
          onChange={setEditedTask}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <TaskDetails task={task} onEdit={handleEdit} onDelete={onDelete} />
          <TagManager task={task} setTask={setEditedTask} dispatch={dispatch} />
        </>
      )}
    </div>
  );
};

export default TaskItem;
