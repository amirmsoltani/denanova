import type { NextPage, InferGetServerSidePropsType } from "next";
import { EventHandler, FormEvent, useState } from "react";
import AdminWrapper from "../../layout/adminWrapper";
import { TrashIcon } from "@heroicons/react/solid";
import Modal from "../../components/modal";
import { prisma, withAuthSsr } from "../../lib";
import Pagination from "../../components/pagination";
import Router from 'next/router';
import Document from "next/document";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));
  const search = (query.search as string) || "";

  const files = await prisma.file.findMany({
    where: { name: { contains: search } },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: { name: true, id: true, filePath: true },
  });

  const counts = await prisma.file.count();
  const lastPage = Math.ceil(counts / pageSize);

  return {
    props: {
      contents: files,
      pagination: { pageSize, page, lastPage, counts },
    },
  };
});

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const File: NextPage<PropsType> = ({ contents, pagination }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(true);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const checkStatusUpload = (status: number) => {
    if (status === 400) {
      setShowStatus(false);
    }
    if (status === 201) {
      setModalOpen(!modalOpen);
      Router.reload()

    }
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

    checkStatusUpload(response.status);
  };

  const deleteFile = async (id:number) => {
    const conApi = "/api/admin/file/"+id;

    const response = await fetch(conApi,{
      method:"delete"
    })


    
    if(response.status === 200){
      Router.reload();
    }


  }





  return (
    <>
      <Modal visible={modalOpen} onClose={modalHandler}>
        <form className="text-center" onSubmit={onSubmit}>
          <label htmlFor="file" dir="rtl" className="text-xl">
            انتخاب فایل :
          </label>
          <input
            name="image"
            type="file"
            className="w-full mt-5 "
            onClick={() => {
              checkStatusUpload(0);
            }}
          />
          <label htmlFor="">: نام فایل</label>
          <input
            name="name"
            type="text"
            className="w-full mt-5 p-1 border border-gray-500"
          />
          <p className={`${showStatus ? "hidden" : "block"} text-red-500 mt-2`}>
            فایل را انتخاب کرده سپس نام فایل را وارد کنید!
          </p>

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
          <div className="w-full flex flex-wrap justify-around items-center">
            {contents.map((item) => (
              <div
                key={item.id}
                className="w-56 h-auto m-2 p-2 drop-shadow  bg-gray-100 "
              >
                <img className="w-full p-2 " src={item.filePath} alt="" />
                <div className="w-full mt-2 flex justify-between px-2">
                  <span className="text-center text-sm">{item.name}</span>
                  <button onClick={()=> { deleteFile(item.id)}} className="W-8 h-7 ">
                    <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <Pagination
              page = {pagination.page}
              counts = {pagination.counts}
              lastPage = {pagination.lastPage}
              pageSize = {pagination.pageSize}
            />
          </div>
        </div>
      </AdminWrapper>
    </>
  );
};

export default File;
