import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Editor from "../../components/editor";
import Modal from "../../components/modal";
import { useState } from "react";
import { isArray } from "util";

type FileType = {
  name: string;
  filePath: string;
  createAt: string;
  id: number;
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
  const [multiChange, setMultiChange] = useState(false);

  const [file, setFile] = useState<
    | undefined
    | Array<{
        name: string;
        filePath: string;
        createAt: string;
        id: number;
      }>
  >([]);

  const [fileCoverPost, setFileCoverPost] = useState<FileType | undefined>();
  const [filePost, setFilePost] = useState();

  const [statusRelFile, setStatusRelFile] = useState(false);

  const modalHandler = (status: string) => {
    setModalOpen(!modalOpen);
    !multiChange && apiHandler();
    if (status === "cover") setStatusRelFile(false);
    if (status === "multi") {
      setMultiChange(!multiChange);

      setStatusRelFile(true);
    }
  };

  const apiHandler = async () => {
    const response = await fetch("/api/admin/file/", {
      method: "get",
    });
    const result = await response.json();
    setFile(result.contents);
  };

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

    console.log(fileCoverPost)
  };

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

  const removeFile = (index: number) => {
    getFile.splice(index, 1);
    !multiChange && apiHandler();
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const type = event.target["type"].value;
    const title = event.target["title"].value;
    const description = event.target["description"].value;
    const content = event.target["content"].value;

    let post = ()=> {
      let value;
      getFile.map((item) => {
      return { fileId: item.id, type: "slide" };
    })
  };
    
    post.push({fileId: filePost ,type:"post"});
    
    console.log('post id is',filePost);

    console.log(post)

    const response = await fetch("/api/admin/post", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({type : type,  description: description, title: title, content: content, files: post}),  
    });

    console.log(response)
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
              className=" px-1 w-96 h-10 bg-slate-50/0 focus:outline-none"
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
        </div>
      </Modal>

      <AdminWrapper>
        <div className="p-10">
          <form name="formPost" onSubmit={onSubmit}>
            <label htmlFor="typePost" className="block">
              نوع محتوا :
            </label>
            <select
              className="mt-2 w-full h-10 p-1 bg-white border border-gray-500"
              name="type"
              id="typePost"
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
                    <XCircleIcon className="w-6 mr-12 text-red-600 hover:text-red-400 hover:cursor-pointer" />
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
                <>{!multiChange && propsImage()}</>
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
                onClick={() => console.log("true")}
                className="p-1 bg-emerald-700 text-white text-2xl border border-emerald-900 w-28 h-12"
              />
            </div>
          </form>
        </div>
      </AdminWrapper>
    </>
  );
};

export default AddPost;
