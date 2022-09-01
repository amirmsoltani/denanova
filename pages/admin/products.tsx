import type { NextPage, InferGetServerSidePropsType } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TablePost from "../../components/tablePost";
import { withAuthSsr, prisma } from "../../lib";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import Router from "next/router";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));
  const search = (query.search as string) || "";

  const products = await prisma.post.findMany({
    where: { title: { contains: search }, type: "product" },
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
    where: { title: { contains: search }, type: "product" }
  });
  const lastPage = Math.ceil(counts  / pageSize);

  return {
    props: {
      content: products.map((product) => ({
        ...product,
        createAt: product.createAt.toISOString(),
        updateAt: product.updateAt.toISOString(),
      })),
      pagination: { pageSize, page, counts, lastPage },
    },
  };
});




type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {

  const [showLoading,setShowLoading] = useState<Number>();

  const deletePost = async(id:number,index:number) => {
    setShowLoading(index);
    const urlApi = "/api/admin/post/"+id;
    const  response = await fetch(urlApi,{
      method:"delete",
    })
    const msg = await response;
    if(msg.status === 200) {
      Router.reload()
    }
  
  }

  return (
    <AdminWrapper>
      <TablePost dataPagination={pagination}>
        {content.map((item,index) => {
          return (
            <tr key={index} className="text-center bg-gray-100 border-b border-gray-300">
              <td className="border-l border-gray-500">{++index}</td>
              <td className="border-l border-gray-500">{item.title}</td>
              <td className="border-l border-gray-500 text-sm"> {item.author.fullname}</td>
              <td className="border-l border-gray-500 text-sm">{dayjs(item.createAt).calendar('jalali').format('hh:mm - YYYY/MM/DD ')}</td>
              <td className="border-l border-gray-500 text-sm">{dayjs(item.updateAt).calendar('jalali').format('hh:mm - YYYY/MM/DD')}</td>
              <td className="px-2 py-3 flex items-center justify-between">
                <Link href={"/product/"+item.id}>
                  <EyeIcon href="" className="w-5 text-stone-700 inline" />
                </Link>
                <Link href={"/admin/addPost?id="+item.id}>
                <PencilSquareIcon className="w-5 text-lime-600  inline" />
                </Link>
                <img src="/loading.webp" className={`${index===showLoading?"inline":"hidden"} w-6 inline`} alt="" />
                <TrashIcon onClick={() => deletePost(item.id,index)} className={`${index !==showLoading ? "inline" : "hidden"} w-5 text-red-600`} />
              </td>
            </tr>
          );
        })}
      </TablePost>
    </AdminWrapper>
  );
};

export default Post;
