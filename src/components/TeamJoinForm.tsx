import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { joinTeam } from "../features/teams/teamsSlice";

const TeamJoinForm: React.FC = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    if (userId && username) {
      const user = {
        _id: userId,
        username: username,
        email: email,
      };

      const requestData = {
        name,
        user,
      };
      console.log(requestData);
      dispatch(joinTeam(requestData));
    } else {
      console.error("用户未登录");
    }
    setName("");
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="团队名称"
        required
      />
      <button type="submit">加入团队</button>
    </form>
  );
};

export default TeamJoinForm;
