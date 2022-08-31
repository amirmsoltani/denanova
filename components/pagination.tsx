import React, { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { AppPropsType } from "next/dist/shared/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

type PropsType = {
  pageSize: number;
  page: number;
  lastPage: number;
  counts: number;
};

const paginationShowHandler = (lastPage: number, page: number) => {
  const pagi = [];
  let valueShowPage = [],
    pageSelect = false;

  valueShowPage.push(1);

  if (page === 2) {
    valueShowPage.push(2);
  } else if (page === 3) {
    valueShowPage.push(page - 1, page);
  } else if (page >= 3) {
    valueShowPage.push(0, page - 1, page);
  }
  if (page + 1 === lastPage) {
    valueShowPage.push(lastPage);
  } else if (page + 2 === lastPage) {
    valueShowPage.push(page + 1, lastPage);
  } else if (page + 2 <= lastPage) {
    valueShowPage.push(page + 1, 0, lastPage);
  }

  for (let i = 0; i < valueShowPage.length; i++) {
    if (valueShowPage[i] === page) {
      pageSelect = true;
    } else {
      pageSelect = false;
    }
    pagi.push(
      <Link
        href={`${
          valueShowPage[i] > 0 ? "?page=" + valueShowPage[i] : "?page=" + page
        }`}
        key={i}
      >
        <a
          aria-current="page"
          className={` ${
            pageSelect
              ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
          }`}
        >
          {` ${valueShowPage[i] > 0 ? valueShowPage[i] : "..."} `}
        </a>
      </Link>
    );
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
