import type { InferGetServerSidePropsType, NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TableCompany from "../../components/tableCompany";
import { withAuthSsr, prisma } from "../../lib";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import Router from "next/router";
import dayjs from "dayjs";
import Pic from "../../components/pic";
import Modal from "../../components/modal";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10)||1);
  const page = Math.abs(+(query.page || 1)||1);
  const search = (query.search as string) || "";

  const companies = await prisma.post.findMany({
    where: { title: { contains: search }, type: "company" },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: {
      id: true,
      title: true,
      createAt: true,
      updateAt: true,
      author: { select: { fullname: true } },
    },
  });

  const counts = await prisma.post.count({
    where: { title: { contains: search }, type: "company" },
  });

  const lastPage = Math.ceil(counts / pageSize);

  return {
    props: {
      content: companies.map((company) => ({
        ...company,
        createAt: company.createAt.toISOString(),
        updateAt: company.updateAt.toISOString(),
      })),
      pagination: { pageSize, page, counts, lastPage },
    },
  };
});

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [companyDelete, setCompanyDelete] = useState<Number | undefined>();
  const [acceptDelete, setAcceptDelete] = useState(false);

  const deleteCompany = async () => {
    const urlApi = "/api/admin/post/" + companyDelete;
    const response = await fetch(urlApi, {
      method: "delete",
    });
    const msg = await response;
    if (msg.status === 200) {
      setShowLoading(false);
      Router.reload();
    }
    if (response.status === 401) Router.replace("/admin/login");
  };

  const modalDeleteHandler = (id: number | undefined, index?: number) => {
    setAcceptDelete(!acceptDelete);
    setShowLoading(true);
    id && setCompanyDelete(id);
  };

  return (
    <>
    <Modal
        width="w-96"
        visible={acceptDelete}
        onClose={() => modalDeleteHandler(undefined)}
      >
        <p className="w-full text-center mb-4">
          آیا مطمئن هستید میخواهید فایل را پاک کنید؟
        </p>
        <div className="flex justify-center text-white" dir="ltr">
          <button
            className="px-5 py-1 bg-green-900 mr-5"
            onClick={() => modalDeleteHandler(undefined)}
          >
            خیر
          </button>
          <button className="px-5 py-1 bg-red-900" onClick={deleteCompany}>
            <div className="flex items-center">
            <div className={`${showLoading ? "hidden" : "inline"} w-6 inline mr-2`}>
              <Pic srcPic="/loading.webp" classPic="h-full w-full" altPic="" />
            </div>
            <span>بله</span>
            </div>
          </button>
        </div>
      </Modal>
    <AdminWrapper>
      
      <TableCompany dataPagination={pagination}>
        {content.map((item, index) => {
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-gray-200"
              } text-center  border-b border-gray-300`}
            >
              <td className="border-l border-gray-500">{++index}</td>
              <td className="border-l border-gray-500">{item.title}</td>
              <td className="border-l border-gray-500 text-sm">
                {item.author.fullname}
              </td>
              <td className="border-l border-gray-500 text-sm">
                {dayjs(item.createAt)
                  .calendar("jalali")
                  .format("hh:mm - YYYY/MM/DD")}
              </td>
              <td className="border-l border-gray-500 text-sm">
                {dayjs(item.updateAt)
                  .calendar("jalali")
                  .format("hh:mm - YYYY/MM/DD")}
              </td>
              <td className="p-2 flex items-center justify-between">
                <Link href={"/agencies"}>
                  <EyeIcon className="w-5 text-stone-700 inline hover:cursor-pointer" />
                </Link>
                <Link href={"/admin/addPost?id=" + item.id}>
                  <PencilSquareIcon className="w-5 text-lime-600  inline hover:cursor-pointer" />
                </Link>

                <TrashIcon
                  onClick={() => modalDeleteHandler(item.id, index)}
                  className="w-5 text-red-600 hover:cursor-pointer"
                />
              </td>
            </tr>
          );
        })}
      </TableCompany>
    </AdminWrapper>
    </>
  );
};

export default Post;
