import type { NextPage } from "next";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../layout";

export async function getStaticProps() {
  // const { PrismaClient } = await import("@prisma/client");
  // const prisma = new PrismaClient();
  // const posts = await prisma.post.findMany({
  //   include: { author: {} },
  //   where: { published: true },
  // });

  return { props: { a:1 } };
}

type PropsType = Awaited<ReturnType<typeof getStaticProps>>["props"];

const Home: NextPage<PropsType> = (props) => {
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
        <div className="h-72">
          <img src="/crusel.jpg" className="h-full" />
        </div>
        <div className="h-72">
          <img src="/crusel2.jpg" className="h-full" />
        </div>
        <div className="h-72">
          <img src="/crusel3.jpg" className="h-full" />
        </div>
      </Carousel>

      <div className="columns-1 mt-10 px-4" dir="rtl">
        <hr className="w-full border-t-2" />
        <p className="mt-4 p-1 text-justify">
          در گروه توسعه بن دا، ما اعتقاد داریم که توسعه پایدار یک فرآیند است که
          یک رویکرد جامع برای جنبه های مختلف اجتماعی، اقتصادی، محیط زیست و محیطی
          را در برمی گیرد. هدف اصلی ما در تمام پروژه های ساخت و ساز، ارتقاء
          کیفیت زندگی و ایجاد یک تغییر مثبت در زمینه هایی است که در آن ما قصد
          داریم مداخله کنیم.
        </p>
        <hr className="w-full border-t-2 mt-8 " />
      </div>

      <section className="columns-1 mt-10 text-center text-xl px-4">
        <Link href="/company/1234">
          <figure className="w-full mb-8 ">
            <a>
              <img className="h-72 w-full" src="/company.jpg" alt="بن دا فرآور" />
              <h3 className="mt-2">بن دا فرآور</h3>
            </a>
          </figure>
        </Link>

        <Link href="/company/1234">
          <figure className="w-full mb-8 ">
            <a>
              <img className="h-72 w-full" src="/company2.jpg" alt="برسان مدیریت" />
              <h3 className="mt-2">برسان مدیریت</h3>
            </a>
          </figure>
        </Link>

        <Link href="/company/1234">
          <figure className="w-full mb-8 ">
            <a>
              <img className="h-72 w-full" src="/company3.jpg" alt="شرکت هیربدان" />
              <h3 className="mt-2">شرکت هیربدان</h3>
            </a>
          </figure>
        </Link>

        <Link href="/company/1234">
          <figure className="w-full mb-8 ">
            <a>
              <img className="h-72 w-full" src="/company4.jpg" alt="مهندسی و توسعه هیربدان" />
              <h3 className="mt-2">مهندسی و توسعه هیربدان</h3>
            </a>
          </figure>
        </Link>

        <Link href="/company/1234">
          <figure className="w-full ">
            <a>
              <img className="h-72 w-full" src="/company5.jpg" alt="توسعه ساختمان بن دا" />
              <h3 className="mt-2">توسعه ساختمان بن دا</h3>
            </a>
          </figure>
        </Link>
      </section>
      
    </Warpper>
  );
};

export default Home;
