import type { NextPage } from "next";
import {UserIcon} from "@heroicons/react/solid"

const Home: NextPage = () => {
  return (
    <div className="text-white h-screen w-full flex items-center justify-center text-center  bg-gradient-to-tl from-sky-900 to-cyan-400">
      <div
        className="p-4  w-1/4 h-3/5 drop-shadow-2xl bg-gradient-to-t from-gray-900 to-slate-900 from">
        <p className="text-xl my-8">ADMIN LOGIN</p>
        <form className="w-full h-full" action="">
          <label htmlFor="">
            <input
              type="text"
              placeholder="Email"
              className="text-gray-700 relative w-5/6 px-2 py-2"
            />
            <span className=" absolute mr-10"><UserIcon className="w-4 absolute"/></span>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Home;
