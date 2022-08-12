import React, { useState } from "react";
import type { NextPage } from "next";
import { UserIcon } from "@heroicons/react/solid";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";


const Login: NextPage = () => {
  const [showIcon, setShowIcon] = useState(false);

  const passHandelr = () => {
    setShowIcon(!showIcon);
  };


  const onSubmit = async (event:any) => {
    event.preventDefault();
    const form = new FormData();
    form.append("email",event.target["email"].value);
    form.append("password",event.target["password"].value);

    const response = await fetch("/api/admin/login", {
      method : "POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({"email":})
      
    });
    console.log(response);

  }

  return (
    <div className="text-white h-screen w-full flex items-center justify-center text-center  bg-gradient-to-tl from-sky-900 to-cyan-400">
      <div className=" p-4  w-96 h-96 drop-shadow-2xl bg-gradient-to-t from-gray-900 to-slate-900 from">
        <p className="text-2xl my-8">ADMIN LOGIN</p>
        <form className="w-full h-full " name="form" onSubmit={onSubmit}>
          <label
            htmlFor="email"
            className="flex shadow-xl items-center w-60 h-10 ml-14 mt-10 text-white bg-gray-600 hover:outline hover:outline-white"
          >
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="text-white bg-gray-600 w-52 ml-0  px-2 py-2 bg text-sm focus:outline-none "
            />
            <span className=" absolute ml-52 px-1">
              <UserIcon className="w-6 " />
            </span>
          </label>
          <label
            htmlFor="password"
            className="flex shadow-xl items-center w-60 h-10 mt-4 ml-14 text-white bg-gray-600 hover:outline hover:outline-white"
          >
            <input
              id="password"
              name="password"
              type={`${showIcon ? "text" : "password"}`}
              placeholder="Password"
              className="text-white bg-gray-600 w-52 ml-0 px-2 py-2 bg text-sm focus:outline-none "
            />
            <button
              type="button"
              className=" ml-52 px-1 w-8 h-10 absolute "
              onClick={passHandelr}
            >
              <EyeIcon
                id="eye"
                className={`${showIcon ? "hidden" : "block"} "w-1 "`}
              />
              <EyeOffIcon
                id="eyeOff"
                className={`${showIcon ? "block" : "hidden"} "w-1 "`}
              />
            </button>
          </label>
          <label htmlFor="remember" className="mt-4 block w-32 ml-14">
            <input type="checkbox" name="" id="remember" />
            <span className="text-sm  ml-2">Remember Me</span>
          </label>
          <input
            type="submit"
            value="Login"
            className="hover:bg-cyan-700 hover:text-neutral-300  transition-all delay-50 text-md font-bold w-28 h-10 mr-32  drop-shadow-xl  bg-sky-700 mt-4"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
