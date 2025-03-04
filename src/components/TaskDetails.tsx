import React from "react";
import { Task } from "../api/tasksApi";

interface TaskDetailsProps {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onChange?: (task: Task) => void;
  onCancel?: () => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onEdit,
  onDelete,
  onSave,
  onChange,
  onCancel,
}) => {
  const priorityClass =
    task.priority === "高"
      ? "priority-high"
      : task.priority === "中"
      ? "priority-medium"
      : "priority-low";

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (onSave && onChange) {
    return (
      <div>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={(e) => onChange({ ...task, title: e.target.value })}
        />
        <textarea
          name="description"
          value={task.description}
          onChange={(e) => onChange({ ...task, description: e.target.value })}
        />
        <div className="formArea">
          <select
            name="priority"
            value={task.priority}
            onChange={(e) => onChange({ ...task, priority: e.target.value })}
          >
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="低">低</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => onChange({ ...task, dueDate: e.target.value })}
          />
        </div>
        <button className="edit-button" onClick={onSave}>
          保存
        </button>
        <button className="cancel-button" onClick={onCancel}>
          取消
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="task-title">{task.title}</h3>
      <p className="task-description">{task.description}</p>
      <p className={`task-priority ${priorityClass}`}>
        优先级: {task.priority}
      </p>
      <p className="task-due-date">截止日期: {formatDate(task.dueDate)}</p>
      <button className="edit-button" onClick={onEdit}>
        编辑
      </button>
      <button className="delete-button" onClick={onDelete}>
        删除
      </button>
    </div>
  );
};

export default TaskDetails;
