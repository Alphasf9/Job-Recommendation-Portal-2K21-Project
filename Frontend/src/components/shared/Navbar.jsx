import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-lime-400">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {/* <li>
              <LinK>Home</LinK>
            </li>
            <li>
              <LinK>About</LinK>
            </li>
            <li>
              <LinK>Contact</LinK>
            </li> */}
          </ul>
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline" className="bg-lime-300">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Parth Dwivedi</h4>
                    <p className="text-sm text-muted-foreground">
                      Frontend Developer
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-4 gap-2 text-gray-500">
                  <User2 />
                  <div className="flex w-fit items-center justify-between cursor-pointer">
                    <Button variant="ghost" className="w-full">
                      Profile
                    </Button>
                  </div>
                  <LogOut />
                  <div className="flex w-fit items-center justify-between cursor-pointer">
                    <Button variant="ghost" className="w-full">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
