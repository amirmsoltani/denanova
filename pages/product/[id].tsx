import { data } from "autoprefixer";
import dayjs from "dayjs";
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { ReactNode } from "react";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../../layout";
import { prisma } from "../../lib";
import {} from 'react-quill';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

type contentType ={
  title:string;
  description:string;
  content:string;
  files:{
    file:{
      filePath:string
    }
  };
  author:{
    fullname:string;
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params!.id!.toString();

  if (!/^\d+$/g.test(id)) {
    return {
      notFound: true,
    };
  }

  const product = await prisma.post.findFirst({
    where: { type: "product", id: { equals: +id } },
    select: {
      id: true,
      title: true,
      description: true,
      content: true,
      files: {
        include: { file: { select: { filePath: true } } },
      },
      createAt: true,
      updateAt: true,
      author: { select: { fullname: true } },
    },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: {
        ...product,
        createAt: product!.createAt.toISOString(),
        updateAt: product!.updateAt.toISOString(),
      },
    },
  };
};

type PropsType = InferGetStaticPropsType<typeof getStaticProps>;

const Product: NextPage<PropsType> = ({ content }) => {

  const cont :contentType = content ;
  
  const dataProduct = () => {


    return (

      <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        interval={3000}
        infiniteLoop
        autoPlay
        className="mt-6"
      >
        <div className="md:h-ft h-72">
          <img src="/imgProduct1.jpg" className="h-full object-contain" />
        </div>
        <div className="md:h-ft h-72">
          <img src="/imgProduct3.jpg" className="h-full object-contain" />
        </div>
      </Carousel>
      <div className="w-full" dir="rtl">
        <div className="p-4">
        <div className="">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
              {dayjs().calendar('jalali').format('DD')}<span className="text-base"> {dayjs().calendar('jalali').locale('fa').format('MMMM')}</span>
              </span>
              <span className="mt-2 text-sm opacity-40 mr-2"> {cont.author.fullname}</span>
            </div>
          <h3 className=" text-3xl text-zinc-800 font-bold my-4"> {cont.title} </h3>

          <div className="my-2 opacity-80 text-justify">

          </div>
        </div>
      </div>
      </>
    )
  }

  return (
    <Warpper>
      {dataProduct()}
      
    </Warpper>
  );
};

export default Product;
