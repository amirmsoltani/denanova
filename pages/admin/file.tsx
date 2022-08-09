import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";

const File: NextPage = () => {
  return (
    <AdminWrapper>
      <div className="columns-3">
        <div className="w-full p-2 bg-red-400 h-72 ">
          <img className="w-full h-52 p-4 " src="/crusel.jpg" alt="" />
          <span className="block text-center bg-green-500">name</span>
          
          <button className="">Delete</button>
          
          <div className="w-full">
            <span>sss</span>
            </div>
        </div>
        <div className="w-full bg-red-400 h-72 ">
          <img className="w-52 h-52" src="/crusel.jpg" alt="" />
          <div className="w-full">
            <span>sss</span>
            </div>
        </div>
        <div className="w-full bg-red-400 h-72 ">
          <img className="w-52 h-52" src="/crusel.jpg" alt="" />
          <div className="w-full">
            <span>sss</span>
            </div>
        </div>
      </div>
    </AdminWrapper>
  );
};

export default File;
