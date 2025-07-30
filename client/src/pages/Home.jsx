import React from "react";
import { useEffect, useState } from "react";
import "../style/home.scss";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Not authenticated");
      })
      .then((userData) => {
        console.log("User from backend:", userData);
        setUser(userData);
      })
      .catch(() => {
        toast.error("Please login");
        navigate("/");
      });
  }, []);
  function handleLogout() {
    console.log("BTN Pressed");

    fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    }).then((res) => {
      console.log("Logout response:", res);
      toast.success("Logged out");
      navigate("/");
    });
  }

  return (
    <div className="home">
      <h1 className="home-tittle">Welcome to the Home Page!</h1>
      <div className="home-user-information">
        {user?.picture && <img src={user.picture} alt="User Image" />}
        <h1 className="home-user-name"> {user?.name || "User Name"}</h1>
        <h1 className="home-user-name"> {user?.email || "User Email"}</h1>
      </div>
      <button className="home-logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
