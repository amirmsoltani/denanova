import { NextPage } from "next";
import Link from "next/link";
import {
  DocumentAddIcon,
  AnnotationIcon,
  CollectionIcon,
  OfficeBuildingIcon,
  FolderIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import TablePost from "../../../components/tablePost";
import TableMessage from "../../../components/tableMessage";
import File from "../dashboard/file";

const Post: NextPage = () => {
  return (
    <div className="w-full">
      {/* section sidbar */}

      <div className="flex" dir="rtl">
        <div className="columns-3xs h-screen p-1 text-white bg-gray-900 text-center">
          <div className="flex items-center w-full mr-14 py-8">
            <UserCircleIcon className="w-5 ml-2 inline" />
            <p className="select-none">نام کاربر</p>
          </div>

          <ul className="text-center text-xl">
            <li className=" p-2 border-y border-gray-200 ">
              <Link href="#">
                <div className="flex items-center w-full mr-14 h-10">
                  <AnnotationIcon className="w-5 ml-2 inline" />
                  <a className="hover:cursor-pointer select-none">پیام ها</a>
                </div>
              </Link>
            </li>
            <li className="p-2  border-b border-gray-200 ">
              <Link href="#">
                <div className="flex items-center w-full mr-14 h-10">
                  <CollectionIcon className="w-5 ml-2 inline" />
                  <a className="hover:cursor-pointer select-none">پست ها</a>
                </div>
              </Link>
            </li>
            <li className="p-2  border-b border-gray-200">
              <Link href="#">
                <div className="flex items-center w-full mr-12 h-10">
                  <OfficeBuildingIcon className="w-5 ml-2 inline" />
                  <a className="hover:cursor-pointer select-none">شرکت ها</a>
                </div>
              </Link>
            </li>
            <li className="p-2  border-b border-gray-200">
              <Link href="#">
                <div className="flex items-center w-full mr-12 h-10">
                  <DocumentAddIcon className="w-5 ml-2 inline" />
                  <a className="hover:cursor-pointer select-none">افزودن</a>
                </div>
              </Link>
            </li>
            <li className="p-2  border-b border-gray-200">
              <Link href="#">
                <div className="flex items-center w-full mr-12 h-10">
                  <FolderIcon className="w-5 ml-2 inline" />
                  <a className="hover:cursor-pointer select-none">فایل ها</a>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* selection contant */}

        <div className="w-full bg-gray-200 text-lg ">
          <div
            className="w-full h-14  p-4 bg-zinc-900 text-white text-xl"
            dir="ltr"
          >
            <span>Admin Dashboard </span>
          </div>

          <File />
        </div>
      </div>
    </div>
  );
};

export default Post;
