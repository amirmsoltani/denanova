import type { InferGetServerSidePropsType, NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TableCompany from "../../components/tableCompany";
import { withAuthSsr, prisma } from "../../lib";

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

  const counts = await prisma.file.count();
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
  console.log(content, pagination);

  return (
    <AdminWrapper>
      <TableCompany />
    </AdminWrapper>
  );
};

export default Post;
