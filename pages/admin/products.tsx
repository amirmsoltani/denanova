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

  const counts = await prisma.file.count();
  const lastPage = Math.ceil(counts / pageSize);

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


 const deletePost = async(id:number) => {
  console.log(id)
 }

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  // console.log(content, pagination);


  return (
    <AdminWrapper>
      {JSON.stringify(content)}
      {JSON.stringify(pagination)}
      <TablePost dataPagination={pagination}>
        {content.map((item,index) => {
          return (
            <tr className="text-center bg-gray-100 border-b border-gray-300">
              <td className="border-l border-gray-500">{++index}</td>
              <td className="border-l border-gray-500">{item.title}</td>
              <td className="border-l border-gray-500 text-sm"> {item.author.fullname}</td>
              <td className="border-l border-gray-500 text-sm">{item.createAt}</td>
              <td className="border-l border-gray-500 text-sm">{item.updateAt}</td>
              <td className="p-2 flex items-center justify-between">
                <Link href={"/product/"+item.id}>
                  <EyeIcon href="" className="w-5 text-stone-700 inline" />
                </Link>
                <Link href={"/admin/addPost?id="+item.id}>
                <PencilSquareIcon className="w-5 text-lime-600  inline" />
                </Link>
                <TrashIcon onClick={() => deletePost(item.id)} className="w-5 text-red-600 inline" />
              </td>
            </tr>
          );
        })}
      </TablePost>
    </AdminWrapper>
  );
};

export default Post;
