import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import TeamCreateForm from "./TeamCreateForm";
import TeamJoinForm from "./TeamJoinForm";
import { useAppDispatch } from "../app/hooks";
import { fetchTeams } from "../features/teams/teamsSlice";
import "../assets/styles/TeamList.css";

interface TeamListProps {
  onFocus: (teamId: string) => void;
  onDelete: (teamId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ onFocus, onDelete }) => {
  const teams = useSelector((state: RootState) => state.teams.teams);
  const dispatch = useAppDispatch();
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [isJoiningTeam, setIsJoiningTeam] = useState(false);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch, teams]);

  const toggleCreateTeam = () => {
    setIsCreatingTeam(!isCreatingTeam);
    setIsJoiningTeam(false);
  };

  const toggleJoinTeam = () => {
    setIsJoiningTeam(!isJoiningTeam);
    setIsCreatingTeam(false);
  };

  return (
    <div className="team-list">
      <h2 className="team-list-title">团队列表</h2>
      <div className="button-group-1">
        <button className="team-button" onClick={toggleCreateTeam}>
          {isCreatingTeam ? "取消" : "创建团队"}
        </button>
        <button className="team-button" onClick={toggleJoinTeam}>
          {isJoiningTeam ? "取消" : "加入团队"}
        </button>
      </div>
      {isCreatingTeam && <TeamCreateForm />}
      {isJoiningTeam && <TeamJoinForm />}
      <div className="my-teams">
        {teams &&
          teams.map((team) => (
            <div className="team-item" key={team?._id}>
              {team && team._id && (
                <>
                  <div className="button-group-2">
                    <button
                      onClick={() => onFocus(team._id)}
                      className="team-button"
                    >
                      进入团队
                    </button>
                    <button
                      onClick={() => onDelete(team._id)}
                      className="delete-team team-button"
                    >
                      删除团队
                    </button>
                  </div>
                  <h3 className="team-name">{team.name}</h3>
                  <div className="team-description">{team.description}</div>
                  <div className="team-members">团队成员：</div>
                  {team.members &&
                    team.members.map((member) => (
                      <div className="member-name" key={member._id}>
                        {member.username}
                      </div>
                    ))}
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TeamList;
