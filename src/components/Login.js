import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { getAdminDetailsAsync } from "../redux/adminDashboardSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const status = useSelector((store) => store.auth.status);
  const id = useSelector((store) => store.auth.user);
  console.log(id);
  useEffect(() => {
    if (status === 200) {
      console.log(status);
      dispatch(getAdminDetailsAsync(id));
      navigate("/admin");
    } else {
      navigate("/");
    }
    console.log(status);
  }, [status]);
  const handleLogin = () => {
    // Perform login action
    dispatch(loginAsync(username, password));
  };

  return (
    <div className=" bg-[#030303]">
      {/* Login form and UI components */}
      {/* ... */}
      <div className="flex justify-center items-center h-screen">
        <div className="bg-[#030303] p-8 rounded">
          <h1 className="font-['Poppins'] text-4xl font-bold text-center text-white mb-8">
            Venue Admin Login
          </h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="font-['Poppins'] bg-[#030303] text-white border-white border-solid border-2 p-2 mb-4 w-full rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="font-['Poppins'] bg-[#030303] text-white border-white border-2 p-2 mb-4 w-full rounded-md"
          />
          <button
            onClick={handleLogin}
            className="font-['Poppins'] mt-7 mb-5 bg-purple-600 text-white p-2 rounded w-full hover:bg-purple-700"
          >
            Sign In
          </button>
          <div className="font-['Poppins'] text-center text-white text-[16px]">
            New Registration?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
