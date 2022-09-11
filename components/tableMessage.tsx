import React, { Children, FC, ReactNode } from "react";
import Pagination from "../components/pagination";

type PaginationType ={
  pageSize:number;
  page:number;
  lastPage:number;
  counts:number;
}

type PropsType ={children:ReactNode,dataPagination:PaginationType};

const TableMessage: FC<PropsType> = ({children,dataPagination}) => {
  return (
    <div className=" p-10">
      <table className="h-auto w-full border border-gray-500 drop-shadow-md" dir="rtl">
        <thead>
          <tr className=" text-white h-14 bg-blue-900">
            <th className="border-l border-gray-500 py-2 w-12">شماره</th>
            <th className="border-l border-gray-500 ">عنوان پیام</th>
            <th className="border-l border-gray-500 ">ایمیل</th>
            <th className="border-l border-gray-500 w-28 ">نام فرستنده</th>
            <th className="border-l border-gray-500 w-36 ">تاریخ انتشار</th>
            <th className="w-16 text-sm ">نمایش پیام</th>
          </tr>
        </thead>
        <tbody>
          <>
          {children}
          </> 
        </tbody>
      </table>
      <div className="flex justify-center mt-3 drop-shadow-md">
        <Pagination page={dataPagination.page} lastPage={dataPagination.lastPage} counts={dataPagination.counts} pageSize={dataPagination.pageSize} />
      </div>
    </div>
  );
};

export default TableMessage;
