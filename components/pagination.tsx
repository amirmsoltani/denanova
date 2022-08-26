import React, { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { AppPropsType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

type PropsType = {
  pageSize: number;
  page: number;
  lastPage: number;
  counts: number;
};
const previousPage = () => {};

const paginationShowHandler = (lastPage: number, page: number) => {
  const pagi = [];
  let pageSelect = false,statusSelect;

  if(lastPage<=5){
    for (let i = 1; i <= lastPage; i++) {
      if (i === page) {
        pageSelect = true;
      } else {
        pageSelect = false;
      }
      pagi.push(
        <Link href={"?page=" + i} key={i}>
          <a
            aria-current="page"
            className={` ${
              pageSelect
                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            }`}
          >
            {" " + i + " "}
          </a>
        </Link>
      );
    }
  }else if(lastPage>5){
    for (let i = 1; i <= 5; i++) {
      if(page==i)
      pagi.push(
        <Link href={`?page=+${statusSelect}`} key={i}>
          <a
            aria-current="page"
            className={` ${
              pageSelect
                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            }`}
          >
            {" " + statusSelect + " "}
          </a>
        </Link>
      );
    }
  }
  

  return pagi;
};

const Pagination: FC<PropsType> = ({ pageSize, page, lastPage, counts }) => {
  const router = useRouter();

  return (
    <div dir="ltr" className=" px-4 py-3  sm:px-6">
      <div className=" flex-1 flex items-center justify-between ">
        <div
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <Link
            href={`${router.basePath}?page=${page - 1 > 0 ? page - 1 : page}`}
          >
            <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="w-6" />
            </a>
          </Link>

          <>{paginationShowHandler(lastPage, page)}</>

          <Link
            href={`${router.basePath}?page=${
              page + 1 <= lastPage ? page + 1 : page
            }`}
          >
            <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="w-6" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
