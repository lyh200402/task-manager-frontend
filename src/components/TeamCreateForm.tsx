import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTeam } from "../features/teams/teamsSlice";
import { User } from "../api/teamsApi";

const TeamCreateForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState<User[]>([]);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";

    if (userId && username) {
      let user: User = {
        _id: userId,
        username: username,
        email: email,
      };
      const updatedMembers = [...members, user];
      setMembers(updatedMembers);

      const newTeam = {
        name,
        description,
        members: updatedMembers.map((member) => member._id),
      };
      console.log(newTeam);
      dispatch(addTeam(newTeam));
    } else {
      console.error("用户未登录");
    }
    setName("");
    setDescription("");
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
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="团队描述"
        required
      />
      <button type="submit">创建团队</button>
    </form>
  );
};

export default TeamCreateForm;
