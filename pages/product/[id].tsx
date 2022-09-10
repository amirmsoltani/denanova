import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from "next";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../../layout";
import { prisma } from "../../lib";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const id = params!.id!.toString();

  if (!/^\d$/g.test(id)) {
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

  return (
    <Warpper>
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
          <div className="mt-2">
            <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
              25<span className="text-base">مرداد</span>
            </span>
            <span className="mt-2 text-sm opacity-40 mr-2">مهدیه درودی</span>
          </div>
          <h3 className=" text-3xl text-zinc-800 font-bold my-4">
            محصول سرم جنین گاوی (FBS)
          </h3>

          <p className="my-2 opacity-80 text-justify">
            سرم جنین گاوی (FBS): بخش مایع خون لخته شده در جنین گوساله است که از
            سلول ها، فیبرین و فاکتورهای لخته کننده آن گرفته شده، اما حاوی تعداد
            زیادی از مواد مغذی و ماکرومولکول های ضروری برای رشد سلول است.
            آلبومین موجود در سرم گاوی، اصلی ترین ترکیب موجود در FBS است.
          </p>
          <p className="my-2 opacity-80 text-justify">
            سرم جنین گاوی در طیف وسیعی از کارها استفاده می شود.
          </p>
          <ul className="list-disc mr-4">
            <li className="my-2">
              یکی از کاربردهای اصلی FBS در کشت سلول های یوکاریوتی است، که با
              غلظت هایی تا 20٪ یا حتی بیشتر به کار برده می شود و بسیاری از مواد
              مغذی ضروری و فاکتورهای رشد را فراهم می کند که بقا و تکثیر سلول را
              تسهیل می کند.
            </li>
            <li>
              همچنین در تحقیقات، ساخت و کنترل واکسن های انسانی و دامپزشکی و
              داروهای بیوتکنولوژی از FBS استفاده می شود.
            </li>
          </ul>
          <span className="font-bold text-lg my-4 block">
            آلبومین سرم گاوی (BSA) :
          </span>
          <p className="text-justify">
            آلبومین سرم گاوی یک پپتید زیست فعال است که یک پروتئین محلول در آب
            است؛ وجود آن برای حیات بسیاری از ارگانیسم های زنده ضروری می باشد.
            این پروتئین نقش مهمی نظیر حفظ فشار اسمزی لازم برای انتشار مایعات بدن
            دارد و همچنین یک پروتئین حامل برای اسیدهای چرب و هِم می باشد. با
            توجه به اهمیت نقش آلبومین در بدن، حفظ ساختار طبیعی این پروتئین تحت
            شرایط مختلف حائز اهمیت است. پروتئین BSA، دارای بار منفی است و pH
            ایزوالکتریک بین 9/4 تا 5/4 دارد.
          </p>
        </div>
      </div>
    </Warpper>
  );
};

export default Product;
