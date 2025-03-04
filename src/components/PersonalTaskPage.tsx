import React from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const PersonalTaskPage: React.FC = () => {
  return (
    <>
      <TaskForm />
      <TaskList />
    </>
  );
};

export default PersonalTaskPage;
