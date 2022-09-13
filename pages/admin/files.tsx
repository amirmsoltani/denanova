import type { NextPage, InferGetServerSidePropsType } from "next";
import { useState } from "react";
import AdminWrapper from "../../layout/adminWrapper";
import { TrashIcon } from "@heroicons/react/24/solid";
import Modal from "../../components/modal";
import { prisma, withAuthSsr } from "../../lib";
import Pagination from "../../components/pagination";
import Router from "next/router";
import Pic from "../../components/pic";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10)|| 1);
  const page = Math.abs(+(query.page || 1)|| 1);
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
  const [acceptDelete, setAcceptDelete] = useState(false);
  const [fileDelete, setFileDelete] = useState<number>();
  const [showStatus, setShowStatus] = useState(true);
  const [statusUpload, setStatusUpload] = useState(false);

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  const modalDeleteHandler = (id: number | undefined) => {
    setAcceptDelete(!acceptDelete);
    id && setFileDelete(id);
  };


  const checkStatusUpload = (status: number) => {
    setStatusUpload(false);
    if (status === 400) {
      setShowStatus(false);
    }
    if (status === 201) {
      setModalOpen(!modalOpen);
      if (pagination.counts + 1 > pagination.lastPage * 10 && pagination.counts>1)
        Router.replace(Router.basePath + "?page=" + (pagination.page + 1));
      else Router.reload();
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const form = new FormData();
    setStatusUpload(true);
    form.append("image", event.target["image"].files[0]);
    form.append("name", event.target["name"].value);

    const response = await fetch("/api/admin/uploadImage", {
      method: "POST",
      body: form,
    });
    checkStatusUpload(response.status);
  };

  const deleteFile = async () => {
    const conApi = "/api/admin/file/" + fileDelete;

    const response = await fetch(conApi, {
      method: "delete",
    });

    if (response.status === 200) {
      if (pagination.counts - 1 === (pagination.lastPage - 1) * 10 && pagination.lastPage>1 && pagination.page>1) {
        Router.replace(Router.basePath + "?page=" + (pagination.page - 1));
        setAcceptDelete(!acceptDelete);
      } else {
        Router.reload();
      }
    }
    if(response.status === 401) Router.replace('/admin/login');
  };

  return (
    <>
      <Modal width="w-96" visible={modalOpen} onClose={modalHandler}>
        <form className="text-center" onSubmit={onSubmit}>
          <label htmlFor="file" dir="rtl" className="text-xl">
            انتخاب فایل :
          </label>
          <input
            name="image"
            type="file"
            className="w-full mt-5 file:"
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

          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                statusUpload
                  ? "bg-gray-800 hover:bg-gary-800"
                  : "bg-blue-900 hover:bg-blue-700"
              } text-xl text-white mt-5  py-2 px-4 h-10 w-auto drop-shadow flex items-center `}
              disabled={statusUpload ? true : false}
            >
              <div
                className={`${
                  statusUpload ? "inline" : "hidden"
                } w-6 h-6 inline`}
              >
                <Pic
                  srcPic="/loading.webp"
                  classPic="w-full h-full"
                  altPic=""
                />
              </div>
              <span className="inline mx-1" dir="rtl">
                {statusUpload ? "لطفا منتظر بمانید" : "ارسال"}
              </span>
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        width="w-96"
        visible={acceptDelete}
        onClose={() => modalDeleteHandler(undefined)}
      >
        <p className="w-full text-center mb-4">
          آیا مطمئن هستید میخواهید فایل را پاک کنید؟
        </p>
        <div className="flex justify-center text-white">
          <button
            className="px-5 py-1 bg-green-900 mr-5"
            onClick={() => modalDeleteHandler(undefined)}
          >
            خیر
          </button>
          <button className="px-5 py-1 bg-red-900" onClick={deleteFile}>
            بله
          </button>
        </div>
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
                <div className="w-full p-2 ">
                  <Pic
                    srcPic={item.filePath}
                    classPic="w-full h-full"
                    altPic=""
                  />
                </div>
                <div className="w-full mt-2 flex justify-between px-2">
                  <span className="text-center text-sm">{item.name}</span>
                  <button
                    onClick={() => {
                      modalDeleteHandler(item.id);
                    }}
                    className="W-8 h-7 "
                  >
                    <TrashIcon className="w-6 text-red-600 hover:text-red-400 inline" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <Pagination
              page={pagination.page}
              counts={pagination.counts}
              lastPage={pagination.lastPage}
              pageSize={pagination.pageSize}
            />
          </div>
        </div>
      </AdminWrapper>
    </>
  );
};

export default File;
