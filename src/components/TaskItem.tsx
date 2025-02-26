import React, { useState, useCallback } from "react";
import { editTask } from "../features/tasks/tasksSlice";
import { Task } from "../api/tasksApi";
import { useAppDispatch } from "../app/hooks";
import TaskDetails from "./TaskDetails";
import TagManager from "./TagManager";
import "../assets/styles/TaskItem.css";

interface TaskItemProps {
  task: Task;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(() => task); // 使用 useMemo 初始值

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    dispatch(editTask(editedTask));
    setIsEditing(false);
  }, [dispatch, editedTask]);

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
