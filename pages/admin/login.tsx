import React, { useState } from "react";
import type { NextPage } from "next";
import { UserIcon } from "@heroicons/react/solid";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import Router from 'next/router';
const Login: NextPage = (props,dasd) => {

  
  
  const [showIcon, setShowIcon] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [showLoading , setShowLoading] = useState(false);

  const passHandelr = () => {
    setShowIcon(!showIcon);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    setShowLoading(true);


    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
    console.log(response);
    console.log(response.status);
    if (response.status === 200) {
      Router.replace("messages");
    }else {
      setErrorUser(true);
    }
    setShowLoading(false);

  };

  return (
    <div className="text-white h-screen w-full flex items-center justify-center text-center  bg-gradient-to-tl from-sky-900 to-cyan-400">
      <div className=" p-4  w-96 h-96 drop-shadow-2xl bg-gradient-to-t from-gray-900 to-slate-900 from">
        <p className="text-2xl mt-8">ADMIN LOGIN</p>
        <p
          className={`${
            errorUser ? "visible" : "invisible"
          } h-1 mt-1 text-red-600 w-full`}
        >
          The email or password entered is incorrect.
        </p>
        <form className="w-full  " name="form" onSubmit={onSubmit}>
          <div className="flex shadow-xl items-center w-60 h-10 ml-14 mt-10 text-white bg-gray-600 hover:outline hover:outline-white">
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
          </div>
          <div className="flex shadow-xl items-center w-60 h-10 mt-4 ml-14 text-white bg-gray-600 hover:outline hover:outline-white">
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
          </div>
          <label htmlFor="remember" className="mt-4 block w-32 ml-14">
            <input type="checkbox" name="" id="remember" />
            <span className="text-sm  ml-2">Remember Me</span>
          </label>
          <button
            type="submit"
            disabled={showLoading}
            className={` hover:bg-cyan-700 hover:text-neutral-300 flex items-center justify-center transition-all delay-50 text-md font-bold px-5 h-10 ml-14  drop-shadow-xl  bg-sky-700 mt-4`}
          >
            <img src="/loading.webp" className={`${showLoading?"inline":"hidden"} w-6 inline`} alt="" />
            <span className="mx-1">login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
