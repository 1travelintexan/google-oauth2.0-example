import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ProfilePage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:5005/auth/logout");
    console.log("you logged out!", res.data);
    navigate("/");
  };
  const onSuccess = async () => {
    await axios("http://localhost:5005/auth/logout", { withCredentials: true });
    navigate("/login");
  };

  return (
    <div>
      <h1>Wecolme {user && user.fullname}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
