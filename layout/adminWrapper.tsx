import React, { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  DocumentAddIcon,
  AnnotationIcon,
  CollectionIcon,
  OfficeBuildingIcon,
  FolderIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

type PropsType = { children: ReactNode };

const menuItems = [
  { href: "/admin/messages", name: "پیام ها" , symbolIcon: <AnnotationIcon className='w-5 mr-14 ml-2 inline' /> },
  { href: "/admin/products", name: "پست ها" , symbolIcon:<CollectionIcon className='w-5 mr-14 ml-2 inline' /> },
  { href: "/admin/companies", name: "شرکت ها" , symbolIcon:<OfficeBuildingIcon className='w-5 mr-14 ml-2 inline' /> },
  { href: "/admin/addPost", name: "افزودن" , symbolIcon:<DocumentAddIcon className='w-5 mr-14 ml-2 inline' /> },
  { href: "/admin/files", name: "فایل ها" , symbolIcon:<FolderIcon className='w-5 mr-14 ml-2 inline' /> },
];

const AdminWrapper: FC<PropsType> = (props) => {
  const router = useRouter();
  const path = router.pathname;

  let uLink = path;



  return (
    <div className="w-full">
      {/* section sidbar */}

      <div className="flex" dir="rtl">
        <div className="w-60 h-screen text-white text-center">
          <div className="fixed w-52 h-screen overflow-hidden bg-gray-900 ">
            <div className="flex items-center w-full mr-14 py-8">
              <UserCircleIcon className="w-5 ml-2 inline" />
              <p className="select-none">نام کاربر</p>
            </div>

            <ul className="text-center text-xl ">
              {menuItems.map((item) => (
                <li
                  key={item.href}
                  className={`border-y border-gray-200 hover:bg-gray-700 hover:cursor-pointer ${
                    path === item.href ? "bg-gray-500" : ""
                  }`}
                >
                  <Link href={item.href}>
                    <a
                      className={`${
                        item.href === path ? "font-bold" : "text-stone-400"
                      } text-xl hover:cursor-pointer flex  h-12 items-center`}
                    >
                        {item.symbolIcon}
                        {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* selection contant */}

        <div className="w-full bg-gray-100 text-lg ">
          <div
            className="w-full h-14  p-4 bg-zinc-900 text-white text-xl"
            dir="ltr"
          >
            <span className="z-20 w-14 h-10 capitalize ">dashboard {uLink.replace("/"," ")}</span>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;
