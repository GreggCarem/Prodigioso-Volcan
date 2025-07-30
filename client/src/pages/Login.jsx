import "../style/login.scss";

import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      toast.success("Sign In Successful");
      navigate("/home");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="login">
      <h1 className="login-tittle">Login</h1>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Sign In Failed")}
        auto_select={true}
      />
    </div>
  );
}
