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
  { href: "/admin", name: "پیام ها" },
  { href: "/admin/posts", name: "پست ها" },
  { href: "/admin/companys", name: "شرکت ها" },
  { href: "/admin/add", name: "افزودن" },
  { href: "/admin/files", name: "فایل ها" },
];

const AdminWrapper: FC<PropsType> = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;
  console.log(path);

  return (
    <div className="w-full">
      {/* section sidbar */}

      <div className="flex" dir="rtl">
        <div className="w-60 h-screen text-white text-center">
          <div className="fixed w-52 h-screen bg-gray-900 ">
            <div className="flex items-center w-full mr-14 py-8">
              <UserCircleIcon className="w-5 ml-2 inline" />
              <p className="select-none">نام کاربر</p>
            </div>

            <ul className="text-center text-xl">
              {
                menuItems.map((item) => (
                  <li key={item.href} className=" p-2 border-y border-gray-200 ">
                  <Link href={item.href}>
                    <div className="flex items-center w-full mr-14 h-10">
                      <AnnotationIcon className="w-5 ml-2 inline" />
                      <a className="hover:cursor-pointer select-none">
                      {item.name}
                      </a>
                    </div>
                  </Link>
                </li>))
                
              }
            </ul>
          </div>
        </div>

        {/* selection contant */}

        <div className="w-full bg-gray-200 text-lg ">
          <div
            className="w-full h-14  p-4 bg-zinc-900 text-white text-xl"
            dir="ltr"
          >
            <span className="z-20 w-14 h-10">Admin Dashboard </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;
