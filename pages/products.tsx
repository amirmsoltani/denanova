import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { Warpper } from "../layout";
import { prisma } from "../lib";
import Link from "next/link";
import dayjs from "dayjs";
import Pagination from "../components/pagination";
import Image from "next/image";

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));

  const products = await prisma.post.findMany({
    where: { type: "product" },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: {
      id: true,
      title: true,
      description: true,
      files: {
        where: { type: { equals: "post" } },
        include: { file: { select: { filePath: true } } },
      },
      createAt: true,
      updateAt: true,
      author: { select: { fullname: true } },
    },
  });

  const counts = await prisma.post.count({
    where: { type: "product" },
  });
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
};

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Products: NextPage<PropsType> = ({ content, pagination }) => {

  return (
    <Warpper>
      <section className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        {
          content.map( item => (
              <figure className="h-auto bg-gray-100 m-5 drop-shadow-lg" dir="rtl" key={item.id}>
                <div className=" w-full md:h-72 sm:h-96 h-72">
                <Image
                  src={item.files[0].file.filePath}
                  alt=""
                  width="100%" height="100%" layout="responsive" 
                />
                </div>
                <div className="px-2">
                  <h3 className="my-4 text-2xl text-zinc-800 font-bold">
                    {item.title}
                  </h3>
                  <div className="">
                    <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                    {dayjs().calendar('jalali').format('DD')}<span className="text-base"> {dayjs().calendar('jalali').locale('fa').format('MMMM')}</span>
                    </span>
                    <span className="mt-2 text-sm opacity-40 mr-2"> {item.author.fullname}</span>
                  </div>
      
                  <p className="mt-4 h-20 w-full mb-16 opacity-80 text-justify text-ellipsis overflow-hidden ...">
                    {item.description!.slice(0,100)}{item.description!.length>100 &&'. . .'}
                  </p>
                </div>
                <div className="w-full h-16 absolute bottom-0">
                <Link href={`/product/${item.id}`}>
                  <button className="w-full flex justify-center">
                    <a className="px-20 py-4 text-center mb-4 shadow-sm block text-white bg-lime-500">
                      ?????????? ????????
                    </a>
                  </button>
                </Link>
                </div>
              </figure>
            )
          )
        }
      </section>
      <div className={`${pagination.lastPage>1 ? 'block': 'hidden'} flex justify-center mt-6`}>
      <Pagination counts={pagination.counts} lastPage={pagination.lastPage} page={pagination.page} pageSize={pagination.pageSize} />

      </div>
    </Warpper>
  );
};

export default Products;
