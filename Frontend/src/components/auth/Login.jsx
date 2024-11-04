import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${User_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 p-4 rounded-md my-10"
        >
          <h1 className="text-3xl font-bold text-center">Login</h1>

          <div className="flex flex-col gap-3 px-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInput}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-3 px-2 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInput}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col gap-3 px-2 py-2">
            <Label>Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex flex-col space-y-2"
            >
              <div className="flex flex-row gap-6">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="recruiter"
                    value="recruiter"
                    name="role"
                    checked={input.role === "recruiter"}
                    onChange={handleInput}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label htmlFor="recruiter" className="text-sm">
                    Recruiter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    id="job-seeker"
                    value="job-seeker"
                    name="role"
                    checked={input.role === "job-seeker"}
                    onChange={handleInput}
                    className="cursor-pointer w-4 h-4"
                  />
                  <Label htmlFor="job-seeker" className="text-sm">
                    Job Seeker
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-3 py-4">
            <button
              type="submit"
              className="w-full h-10 bg-blue-500 text-white p-1 rounded-md text-sm"
            >
              Login
            </button>
          </div>
          <span className="text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
