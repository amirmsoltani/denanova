import React, { FC } from "react";
import Pagination from "../components/pagination";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";

const TablePost: FC = () => {
  return (
    <div className=" p-10">
      <table className="h-96 w-full border border-gray-500" dir="rtl">
        <thead>
          <tr className=" text-white bg-gray-900">
            <th className="border-l border-gray-500 py-2 w-12">شماره</th>
            <th className="border-l border-gray-500 ">عنوان</th>
            <th className="border-l border-gray-500 w-20 ">ناشر</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ انتشار</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ بروزرسانی</th>
            <th className="w-24 ">تغیرات</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">1</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">2</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">3</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">4</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">5</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">6</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">7</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">8</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">9</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
          <tr className="text-center ">
            <td className="border-l border-gray-500">10</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="border-l border-gray-500">1401/5/17</td>
            <td className="py-1">
              <PencilAltIcon className="w-5 inline" />
              <TrashIcon className="w-5 mr-6 inline" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination />
      </div>
    </div>
  );
};

export default TablePost;
