import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import TeamList from "./TeamList";
import { useAppDispatch } from "../app/hooks";
import { removeTeam } from "../features/teams/teamsSlice";
import "../assets/styles/TeamTaskPage.css";

const TeamTaskPage: React.FC = () => {
  const [focusTeam, setfocusTeam] = useState("first");
  const dispatch = useAppDispatch();

  const handleDeleteTeam = (teamId: string) => {
    dispatch(removeTeam({ teamId }));
    if (focusTeam === teamId) {
      setfocusTeam("first");
    }
  };

  return (
    <div className="father">
      <div className="left">
        <TeamList onFocus={setfocusTeam} onDelete={handleDeleteTeam} />
      </div>
      {focusTeam !== "first" && (
        <div className="right">
          <TaskForm teamId={focusTeam} />
          <TaskList teamId={focusTeam} />
        </div>
      )}
    </div>
  );
};

export default TeamTaskPage;
