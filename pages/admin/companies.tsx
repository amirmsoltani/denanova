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

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));
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
    where: { title: { contains: search }, type: "company" }
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

const deletecompany = (id: number) => {
  console.log(id);
};

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  console.log(content, pagination);

  return (
    <AdminWrapper>
      <TableCompany dataPagination={pagination}>
        {content.map((item, index) => {
          return (
            <tr className="text-center bg-gray-100 border-b border-gray-300">
              <td className="border-l border-gray-500">{++index}</td>
              <td className="border-l border-gray-500">{item.title}</td>
              <td className="border-l border-gray-500 text-sm">
                {item.author.fullname}
              </td>
              <td className="border-l border-gray-500 text-sm">
                {item.createAt}
              </td>
              <td className="border-l border-gray-500 text-sm">
                {item.updateAt}
              </td>
              <td className="p-2 flex items-center justify-between">
                <Link href={"/company/" + item.id}>
                  <EyeIcon className="w-5 text-stone-700 inline" />
                </Link>
                <Link href={"/admin/addPost?id=" + item.id}>
                  <PencilSquareIcon className="w-5 text-lime-600  inline" />
                </Link>
                <TrashIcon
                  onClick={() => deletecompany(item.id)}
                  className="w-5 text-red-600 inline"
                />
              </td>
            </tr>
          );
        })}
      </TableCompany>
    </AdminWrapper>
  );
};

export default Post;
