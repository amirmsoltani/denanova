import type { NextPage } from "next";
import { EventHandler, FormEvent, useState } from "react";
import AdminWrapper from "../../layout/adminWrapper";
import { TrashIcon } from "@heroicons/react/solid";
import Modal from "../../components/modal";

const File: NextPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const form = new FormData();
    form.append("image", event.target["image"].files[0]);
    form.append("name", event.target["name"].value);

    const response = await fetch("/api/admin/uploadImage", {
      method: "POST",
      body: form,
    });
    console.log(response);
  };
  return (
    <>
      <Modal visible={modalOpen} onClose={modalHandler}>
        <form className="text-center" onSubmit={onSubmit}>
          <label htmlFor="file" dir="rtl" className="text-xl">
            آپلود عکس :
          </label>
          <input name="image" type="file" className="w-full mt-5 " />
          <input name="name" type="text" className="w-full mt-5 " />
          <input
            type="submit"
            value="ارسال"
            className="text-xl text-white mt-5 bg-blue-900 hover:bg-blue-700 h-10 w-24 drop-shadow"
          />
        </form>
      </Modal>
      <AdminWrapper>
        <div className="w-full h-16">
          <button
            onClick={modalHandler}
            className="mr-5 mt-4 h-14 w-32 bg-blue-900 text-white border-2 border-blue-50 text-xl drop-shadow-xl hover:cursor-pointer hover:text-blue-900 hover:bg-blue-100 hover:border-blue-900"
          >
            افزودن عکس
          </button>
        </div>
        <div className=" w-full py-5 px-3" dir="ltr">
          <div className="w-full flex flex-wrap justify-around">
            <div className="w-56 h-min-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">1111</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">2</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">3</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">4</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2   drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">5</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">6</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">7</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">8</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">9</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">10</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">11</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2    drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">12</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2 drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">13</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
            <div className="w-56 h-52 m-2 p-2  drop-shadow  bg-gray-100 ">
              <img className="w-full p-2 " src="/crusel.jpg" alt="" />
              <div className="w-full mt-2 flex justify-between px-2">
                <span className="text-center text-md">14</span>
                <button className="W-8 h-7 ">
                  <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AdminWrapper>
    </>
  );
};

export default File;
