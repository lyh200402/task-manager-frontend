import React, { useState } from "react";
import { Task } from "../api/tasksApi";
import { editTask } from "../features/tasks/tasksSlice";
import { useAppDispatch } from "../app/hooks";

interface TagManagerProps {
  task: Task;
  setTask: (task: Task) => void;
  dispatch: ReturnType<typeof useAppDispatch>;
}

const TagManager: React.FC<TagManagerProps> = ({ task, setTask, dispatch }) => {
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (task.tags && task.tags.length >= 5) {
      alert("最多只能添加五个标签");
      return;
    }
    setIsAddingTag(true);
  };

  const handleSaveTag = () => {
    if (newTag.length > 6) {
      alert("每个标签最多只能包含六个字符");
      return;
    }
    if (newTag && task.tags && !task.tags.includes(newTag)) {
      const updatedTask = { ...task, tags: [...task.tags, newTag] };
      setTask(updatedTask);
      setNewTag("");
      setIsAddingTag(false);
      dispatch(editTask(updatedTask));
    }
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  return (
    <div className="task-tag-container">
      {isAddingTag ? (
        <>
          <input
            className="tag-add-input"
            type="text"
            placeholder="输入标签"
            value={newTag}
            onChange={handleChangeTag}
          />
          <button className="tag-add-button" onClick={handleSaveTag}>
            添加
          </button>
          <button
            className="tag-add-button-2"
            onClick={() => setIsAddingTag(false)}
          >
            取消
          </button>
        </>
      ) : (
        <>
          <button className="tag-add-button" onClick={handleAddTag}>
            添加标签
          </button>
          {task.tags &&
            task.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
        </>
      )}
    </div>
  );
};

export default TagManager;
