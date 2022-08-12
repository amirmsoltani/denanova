import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import { PlusIcon, XCircleIcon } from "@heroicons/react/solid";
import Editor from "../../components/editor";
const AddPost: NextPage = () => {
  return (
    <AdminWrapper>
      <div className="p-10">
        <form name="formPost" action="">
          <label htmlFor="typePost" className="block">
            نوع محتوا :
          </label>
          <select
            className="mt-2 w-full h-10 p-1 bg-white border border-gray-500"
            name="type"
            id="typePost"
          >
            <option className="p-1" value="post">
              پست
            </option>
            <option className="p-1" value="company">
              شرکت
            </option>
          </select>
          <label htmlFor="title" className="mt-5 block">
            <span className="text-xl block ">عنوان : </span>
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="p-1 w-full h-10 mt-2 border border-gray-500"
          />

          <label htmlFor="description" className="mt-4 block">
            <span className="text-xl block">توضیحات : </span>
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="p-1 w-full h-10 mt-2 border border-gray-500"
          />

          <label htmlFor="content" className="block mt-6">
            <span className="text-xl">محتوا :</span>
          </label>
          <Editor name="content" />

          <span className="block w-full mt-5">عکس اصلی :</span>
          <div className="w-full p-1 mt-5 flex justify-center">
            <div className="w-96 flex flex-col items-center">
              <div className="w-96 h-96">
                {false ? (
                  <img className="w-full h-full" src="/crusel.jpg" alt="" />
                ) : (
                  <div className="flex items-center justify-center h-96 w-96 border border-black bg-white hover:bg-lime-50 hover:cursor-pointer hover:text-lime-600 hover:border-lime-600">
                    <PlusIcon className=" w-12 " />
                  </div>
                )}
              </div>
              {false && (
                <div className="w-32 mt-1">
                  <XCircleIcon className="w-6 mr-12 text-red-600 hover:text-red-400 hover:cursor-pointer" />
                </div>
              )}
            </div>
          </div>
          <span className="mt-5">عکس های اسلایدر :</span>
          <div className="w-full p-1 h-36 mt-5 flex" dir="ltr">
            <div className="w-32 h-36 ">
              <div className="w-full h-32">
                <img className="w-32 h-32" src="/crusel.jpg" alt="" />
              </div>
              <div className="w-32 mt-3  flex justify-center">
                <XCircleIcon className="w-6  text-red-600 hover:text-red-400 hover:cursor-pointer" />
              </div>
            </div>

            <div className="w-32 ml-2">
              <div className=" w-full h-32 bg-white flex items-center justify-center border border-black text-black hover:text-blue-600 hover:bg-blue-50 cursor-pointer hover:border-blue-600">
                <PlusIcon className=" w-8 " />
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminWrapper>
  );
};

export default AddPost;
