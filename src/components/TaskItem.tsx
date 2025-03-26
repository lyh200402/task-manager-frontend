import React, { useState, useCallback } from 'react';
import { editTask } from '../features/tasks/tasksSlice';
import { Task } from '../api/tasksApi';
import { useAppDispatch } from '../app/hooks';
import TaskDetails from './TaskDetails';
import TagManager from './TagManager';
import '../assets/styles/TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (teamId?: string) => void;
  teamId?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, teamId }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(() => task);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    dispatch(editTask({ task: editedTask, teamId }));
    setIsEditing(false);
  }, [dispatch, editedTask, teamId]);

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
          <TaskDetails
            task={task}
            onEdit={handleEdit}
            onDelete={() => onDelete(teamId)}
          />
          <TagManager
            task={task}
            setTask={setEditedTask}
            dispatch={dispatch}
            teamId={teamId}
          />
        </>
      )}
    </div>
  );
};

export default TaskItem;
