import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import TaskItem from "./TaskItem";
import { fetchTasks, removeTask } from "../features/tasks/tasksSlice";
import { useAppDispatch } from "../app/hooks";
import "../assets/styles/TaskList.css";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [sortKey, setSortKey] = useState("normal");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSort = useCallback((key: string) => {
    setSortKey(key);
  }, []);

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => {
      if (sortKey === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortKey === "priority") {
        const priorityOrder: { [key: string]: number } = {
          高: 3,
          中: 2,
          低: 1,
        };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });
  }, [tasks, sortKey]);

  return (
    <div className="task-list">
      <h2 className="task-list-title">任务列表</h2>
      <div className="sort-button-wrap">
        <button className="sort-button" onClick={() => handleSort("dueDate")}>
          按截止日期排序
        </button>
        <button className="sort-button" onClick={() => handleSort("priority")}>
          按优先级排序
        </button>
      </div>
      {sortedTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={() => dispatch(removeTask(task._id!))}
        />
      ))}
    </div>
  );
};

export default TaskList;
