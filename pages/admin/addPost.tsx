import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Editor from "../../components/editor";
import Modal from "../../components/modal";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { withAuthSsr, prisma } from "../../lib";


export const getServerSideProps = withAuthSsr(async () => {
  return {
    props: {},
  };
});

type FileType = {
  name: string;
  filePath: string;
  createAt: string;
  id: number;
};
type getPost = {
  authorId: number;
  content: string;
  createAt: string;
  description: string;
  id: number;
  title: string;
  type: string;
  updateAt: string;
};

type FileStateType = {
  name: string;
  filePath: string;
  createAt: string;
  id: number;
  type:string;
  file:FileStateType;
};

const AddPost: NextPage = () => {
  const [getFile, setGetFile] = useState<
    Array<{
      name: string;
      filePath: string;
      createAt: string;
      id: number;
    }>
  >([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalErrOpen, setModalErrOpen] = useState(false);
  const [multiChange, setMultiChange] = useState(false);
  const [errorPost, setErrorPost] = useState<string[]>([]);
  const [file, setFile] = useState<FileStateType[]>([]);

  const [fileCoverPost, setFileCoverPost] = useState<FileType | undefined>();
  const [filePost, setFilePost] = useState<number | undefined>();
  const [statusRelFile, setStatusRelFile] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<number | null>();
  const [getPost, setGetPost] = useState<getPost | undefined>();

  const { query } = useRouter();
  const id = Number(query.id);

  //check id for set mode update post
  useEffect(() => {
    if (id) {
      axios.get("/api/admin/post/" + id).then((response) => {
        setGetPost(response.data);
        const slide = Array();
        response.data.files.map((item:FileStateType) =>{
          if(item.type === "post"){
            setFileCoverPost(item.file)
            setFilePost(item.file.id)
          }
          else if(item.type === "slide"){
            slide.push(item.file)
          }
        });
        setGetFile(slide);
      });
    }
  }, [id]);

  //modal files handler
  const modalHandler = (status: string) => {
    setModalOpen(!modalOpen);
    !multiChange && apiHandler();
    if (status === "cover") setStatusRelFile(false);
    if (status === "multi") {
      setMultiChange(!multiChange);
      setStatusRelFile(true);
    }
  };
  //get files and set state for show
  const apiHandler = async () => {
    const response = await fetch("/api/admin/file/", {
      method: "get",
    });
    const result = await response.json();
    setFile(result.contents);
  };

  //set imaages for post and slider
  const addImageCoverPost = (item: FileType) => {
    if (statusRelFile === false) {
      setFileCoverPost(item);
      setFilePost(item.id);
    }
    if (statusRelFile === true) {
      setGetFile((oldFile) => [...oldFile, item]);
      setMultiChange(!multiChange);
    }
    setModalOpen(!modalOpen);
  };

  // show selected images silder
  const propsImage = () => {
    let property = [];
    property.push(
      getFile.map((item, index) => {
        return (
          <div className="w-32 h-36 mt-8 px-1">
            <div className="w-full h-32">
              <img className="w-32 h-32" src={item.filePath} alt="" />
            </div>
            <div className="w-32 mt-3  flex justify-center">
              <XCircleIcon
                onClick={() => removeFile(index)}
                className="w-6  text-red-600 hover:text-red-400 hover:cursor-pointer"
              />
            </div>
          </div>
        );
      })
    );

    return property;
  };

  //remove file post
  const removeCover = () => {
    setFileCoverPost(undefined);
  };
  const removeFile = (index: number) => {
    getFile.splice(index, 1);
    !multiChange && apiHandler();
  };

  // form submited send data to api for add post
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const type = event.target["type"].value;
    const title = event.target["title"].value;
    const description = event.target["description"].value;
    const content = event.target["content"].value;

    let post = [];

    for (let i = 0; i < getFile.length; i++) {
      post[i] = { fileId: getFile[i].id, type: "slide" };
    }

    if (filePost !== undefined) post.push({ fileId: filePost, type: "post" });

    try {
      const response = await axios[id ? "put" : "post"](
        `/api/admin/post${id ? "/" + id : ""}`,
        {
          type: type,
          description: description,
          title: title,
          content: content,
          files: post,
        }
      );
      const infoType = type === "company" ? "companies" : "products";
      Router.replace('/admin/'+infoType);
    } catch (e) {
      const error = e as AxiosError<{ message: { param: string }[] }>;
      const err = await error.response?.data;
      const setErr: any = [];
      err?.message.map((item) => {
        setErr.push(item.param);
      });

      setErrorPost(setErr);
      setModalErrOpen(!modalErrOpen);
    }
  };

  //search file in modal image post and slider
  const search = async (event: any) => {
    event.preventDefault();
    const value = event.target.value;

    const response = await fetch("/api/admin/file?search=" + value, {
      method: "get",
      headers: { "Content-type": "application/json" },
    });
    const res = await response.json();

    setFile(res.contents);
  };

  //show error in modal
  const showErr = () => {
    const result: any = [];
    let counter = 0;
    if (errorPost !== undefined) counter = errorPost?.length;
    for (let i = 0; i < counter; i++) {
      let message = "";
      switch (errorPost ? errorPost[i] : null) {
        case "title":
          message =
            "مقدار ورودی عنوان خالی یا تکراری می باشد ! (طول رشته باید بین ۵ تا ۱۰۰ حرف باشد)";
          result.push(
            <div
              key={i}
              className={`${
                result.length % 2 === 1 ? "text-gray-600" : "text-black"
              } w-full p-1`}
            >
              <p>{message}</p>
            </div>
          );
          break;
        case "description":
          message =
            "مقدار ورودی توضیحات خالی می باشد ! (طول رشته باید بین ۵ تا ۲۵۵ حرف باشد)";
          result.push(
            <div
              key={i}
              className={`${
                result.length % 2 === 1 ? "text-gray-600" : "text-black"
              } w-full p-1`}
            >
              <p>{message}</p>
            </div>
          );
          break;
        case "content":
          message =
            "مقدار ورودی محتوا درست نمی باشد ! (طول رشته باید حداقال ۱۰ حرف باشد)";
          result.push(
            <div
              key={i}
              className={`${
                result.length % 2 === 1 ? "text-gray-600" : "text-black"
              } w-full p-1`}
            >
              <p>{message}</p>
            </div>
          );
          break;
      }
    }

    if (fileCoverPost === undefined) {
      result.push(
        <div
          key={10}
          className={`${
            result.length % 2 === 1 ? "text-gray-600" : "text-black"
          } w-full p-1`}
        >
          <p>عکس کاور پست خالی یا در دیتابیس موجود نمی باشد !</p>
        </div>
      );
    }

    if (getFile.length === 0) {
      result.push(
        <div
          key={11}
          className={`${
            result.length % 2 === 1 ? "text-gray-600" : "text-black"
          } w-full p-1`}
        >
          <p>عکس های اسلایدر خالی یا در دیتابیس موجود نمی باشد !</p>
        </div>
      );
    }

    return result.reverse();
  };

  //modal error handler
  const modalErrHandler = () => {
    setModalErrOpen(!modalErrOpen);
  };

  return (
    <>
      <Modal
        width="w-11/12"
        visible={modalOpen}
        onClose={() => modalHandler("not")}
      >
        <div className="w-full flex justify-center">
          <div className="w-96 bg-slate-200 rounded-full flex  py-1 px-1 border border-slate-700">
            <input
              type="text"
              name="search"
              className=" px-1 w-96 h-10 bg-slate-50/0 focus:outline-none"
              onChange={search}
            />
            <MagnifyingGlassCircleIcon className="w-9 text-slate-700" />
          </div>
        </div>
        <hr className="mt-6" />
        <div className="w-full flex flex-wrap justify-around items-center mt-2">
          {file?.map((item) => (
            <div
              key={item.id}
              className="w-32 h-auto m-2 p-2 drop-shadow  bg-gray-100 "
              onClick={() => addImageCoverPost(item)}
            >
              <img className="w-full p-2 " src={item.filePath} alt="" />
              <div className="w-full mt-2 flex justify-center px-2">
                <span className="text-center text-sm">{item.name}</span>
              </div>
            </div>
          ))}
          <div
            className={`${
              file?.length === 0 ? "block" : "hidden"
            } w-full text-center text-2xl h-auto m-2 p-2  `}
          >
            <p> ! فایل مورد نظر موجود نیست</p>
          </div>
        </div>
      </Modal>

      <Modal
        width="w-8/12"
        visible={modalErrOpen}
        onClose={() => modalErrHandler()}
      >
        <div className="w-full text-center text-lg" dir="rtl">
          <div className="w-full border-b border-b-slate-700 mb-2 pb-2 text-red-600 text-xl">
            <p>پست ارسال نشد !</p>
          </div>
          {errorPost && showErr()}
        </div>
      </Modal>

      <AdminWrapper>
        <div className="">
          {getPost || !id ? (
            <form name="formPost" className="p-10" onSubmit={onSubmit} >
              <label htmlFor="typePost" className="block">
                نوع محتوا :
              </label>
              <select
                className="mt-2 w-full h-10 p-1 bg-white border border-gray-500"
                name="type"
                defaultValue={getPost?.type}
              >
                <option className="p-1" value="product">
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
                type="text"
                name="title"
                defaultValue={getPost?.title}
                className="p-1 w-full h-10 mt-2 border border-gray-500"
              />

              <label htmlFor="description" className="mt-4 block">
                <span className="text-xl block">توضیحات : </span>
              </label>
              <input
                type="text"
                name="description"
                defaultValue={getPost?.description}
                className="p-1 w-full h-10 mt-2 border border-gray-500"
              />

              <label htmlFor="content" className="block mt-6">
                <span className="text-xl">محتوا :</span>
              </label>
              <Editor name="content" initialValue={getPost?.content}/>

              <span className="block w-full mt-5">عکس اصلی :</span>
              <div className="w-full p-1 mt-5 flex justify-center">
                <div className="w-96 flex flex-col items-center">
                  <div
                    className="w-96 h-96"
                    onClick={() => modalHandler("cover")}
                  >
                    {fileCoverPost ? (
                      <img
                        className="w-full h-full"
                        src={fileCoverPost.filePath}
                        alt=""
                      />
                    ) : (
                      <div className="flex items-center justify-center h-96 w-96 border border-black bg-white hover:bg-lime-50 hover:cursor-pointer hover:text-lime-600 hover:border-lime-600">
                        <PlusIcon className=" w-12 " />
                      </div>
                    )}
                  </div>
                  {fileCoverPost && (
                    <div className="w-32 mt-1">
                      <XCircleIcon
                        onClick={removeCover}
                        className="w-6 mr-12 text-red-600 hover:text-red-400 hover:cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>
              <span className="mt-5">عکس های اسلایدر :</span>
              <div className="w-full h-auto">
                <div
                  className="w-full flex flex-wrap justify-around items-center h-auto"
                  dir="ltr"
                >
                  {!multiChange && propsImage()}
                  <div
                    onClick={() => modalHandler("multi")}
                    className="w-32 ml-2"
                  >
                    <div className=" w-full h-32 mt-8 bg-white flex items-center justify-center border border-black text-black hover:text-blue-600 hover:bg-blue-50 cursor-pointer hover:border-blue-600">
                      <PlusIcon className=" w-8 " />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-14 flex justify-center">
                <input
                  type="submit"
                  value="ارسال"
                  className="p-1 bg-emerald-700 text-white drop-shadow-xl text-2xl border border-emerald-900 w-32 h-12 hover:cursor-pointer  hover:bg-emerald-200 hover:text-emerald-700"
                />
              </div>
            </form>
          ) : (
            <div className="w-full h-screen flex justify-center items-center">
              <img src="/loading.webp" className="w-24" alt="" />

            </div>
          )}
        </div>
      </AdminWrapper>
    </>
  );
};

export default AddPost;
