import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";
import { RadioGroup } from "@radix-ui/react-radio-group";

const SignUp = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    file: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto max-w-7xl">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 p-4 rounded-md my-10"
        >
          <h1 className="text-3xl font-bold text-center drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
            Sign Up
          </h1>
          <div className="flex flex-col gap-2 px-2 py-3">
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              value={input.name}
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={input.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              value={input.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={input.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label>Role</Label>
            <RadioGroup
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="flex flex-row gap-6"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  id="recruiter"
                  value="recruiter"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  className="cursor-pointer w-4 h-4"
                />
                <Label htmlFor="job-seeker" className="text-sm">
                  Job Seeker
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col gap-2 px-2 py-2">
            <Label htmlFor="file">Profile Picture</Label>
            <Input
              type="file"
              id="file"
              accept="image/*"
              className="cursor-pointer w-1/2"
              onChange={handleFileChange}
              name="file"
            />
          </div>

          <div className="flex flex-col gap-2 py-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md"
            >
              Sign Up
            </button>
          </div>
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
