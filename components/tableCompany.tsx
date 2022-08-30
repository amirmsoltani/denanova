import React, { Children, FC, ReactNode } from "react";
import Pagination from "../components/pagination";

type propsType = {children : ReactNode, dataPagination:object}

const TableCompany: FC<propsType> = ({children,dataPagination}) => {
  return (
    <div className=" p-10">
      <table className="h-auto w-full border border-gray-500" dir="rtl">
        <thead>
          <tr className=" text-white h-14 bg-blue-900">
            <th className="border-l border-gray-500 py-2 w-12">شماره</th>
            <th className="border-l border-gray-500 ">نام شرکت</th>
            <th className="border-l border-gray-500 w-20 ">ناشر</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ انتشار</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ بروزرسانی</th>
            <th className="w-28 ">تغیرات</th>
          </tr>
        </thead>
        <tbody>
          <>
          {children}
          </>
        </tbody>
      </table>
      <div className="mt-6 flex justify-center">
        <Pagination counts={dataPagination.counts} lastPage={dataPagination.lastPage} page={dataPagination.page} pageSize={dataPagination.pageSize} />
      </div>
    </div>
  );
};

export default TableCompany;
