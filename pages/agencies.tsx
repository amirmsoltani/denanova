import type {
  NextPage,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { Warpper } from "../layout";
import Link from "next/link";
import { prisma } from "../lib";

export const getServerSideProps = async ({ query }:GetServerSidePropsContext) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));

  const companies = await prisma.post.findMany({
    where: { type: "company" },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: {
      id: true,
      title: true,
      description: true,
      createAt: true,
      updateAt: true,
      author: { select: { fullname: true } },
    },
  });

  const counts = await prisma.post.count({
    where: { type: "company" },
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
};

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Company: NextPage<PropsType> = ({ content, pagination }) => {

  const dataCompany = () => {
    const data = Array();

    content.map( item => {
      data.push(
        <li className="mt-3">
            <Link href={item.description!}>
              <a className="hover:text-gray-600"> {item.title}</a>
            </Link>
          </li>
      )
    })



    return data;


  }

  return (
    <Warpper>
      <div className="columns-1 my-10 px-4" dir="rtl">
        <p className="text-lg">
          نمایندگی های شرکت دانش بنیان دنا نوا به شرح زیر می باشد :
        </p>
        <ul className="list-decimal mr-5 mt-2">
          {dataCompany()}
        </ul>
      </div>
    </Warpper>
  );
};

export default Company;
