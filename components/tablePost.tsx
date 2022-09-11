import React, { ReactNode, FC } from "react";
import Pagination from "../components/pagination";

type PaginationType ={
  pageSize:number;
  page:number;
  lastPage:number;
  counts:number;
}

type PropsType = {children : ReactNode ,dataPagination:PaginationType}

const TablePost: FC <PropsType>= ({children, dataPagination}) => {
  return (
    <div className="p-10">
      <table className="h-auto w-full border border-gray-500" dir="rtl">
        <thead>
          <tr className=" text-white h-14 bg-blue-900">
            <th className="border-l border-gray-500 py-2 w-12">شماره</th>
            <th className="border-l border-gray-500 ">عنوان پست</th>
            <th className="border-l border-gray-500 w-20 ">ناشر</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ انتشار</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ بروزرسانی</th>
            <th className="w-28">تغیرات</th>
          </tr>
        </thead>
        <tbody>
          <>
          {children}
          </>

        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination lastPage={dataPagination.lastPage} page={dataPagination.page} counts={dataPagination.counts} pageSize={dataPagination.pageSize} />
      </div>
    </div>
  );
};

export default TablePost;
