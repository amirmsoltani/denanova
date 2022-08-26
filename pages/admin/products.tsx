import type { NextPage, InferGetServerSidePropsType } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TablePost from "../../components/tablePost";
import { withAuthSsr, prisma } from "../../lib";

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

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  console.log(content, pagination);

  return (
    <AdminWrapper>
      <TablePost />
    </AdminWrapper>
  );
};

export default Post;
