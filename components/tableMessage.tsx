import React, { FC } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Pagination from "../components/pagination";

type PropsType ={showModal: () => void};

const TableMessage: FC<PropsType> = ({showModal}) => {
  return (
    <div className=" p-10">
      <table className="h-96 w-full border border-gray-500" dir="rtl">
        <thead>
          <tr className=" text-white h-14 bg-blue-900">
            <th className="border-l border-gray-500 py-2 w-12">شماره</th>
            <th className="border-l border-gray-500 ">عنوان پیام</th>
            <th className="border-l border-gray-500 ">ایمیل</th>
            <th className="border-l border-gray-500 w-28 ">نام فرستنده</th>
            <th className="border-l border-gray-500 w-28 ">تاریخ انتشار</th>
            <th className="w-20 ">نمایش پیام</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">1</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">2</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">3</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">4</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">5</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">6</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">7</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center border-b border-gray-300">
            <td className="border-l border-gray-500">8</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center bg-gray-100 border-b border-gray-300">
            <td className="border-l border-gray-500">9</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1 inline" />
            </td>
          </tr>
          <tr className="text-center ">
            <td className="border-l border-gray-500">10</td>
            <td className="border-l border-gray-500">کرم</td>
            <td className="border-l border-gray-500">a@a.com</td>
            <td className="border-l border-gray-500">سارا</td>
            <td className="border-l border-gray-500">1401/5/17</td>

            <td className="py-1">
              <EnvelopeIcon onClick={showModal} className="w-5 mt-1  inline" />
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

export default TableMessage;
