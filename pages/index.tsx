import type { NextPage } from "next";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../layout";

export async function getStaticProps() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany({
    include: { author: {} },
    // where: { published: true },
  });

  return { props: { posts } };
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
      >
        <div className="h-72">
          <img src="/ferdowsiUni1.jpg" className="h-full" />
        </div>
        <div className="h-72">
          <img src="/ferdowsiUni2.jpg" className="h-full" />
        </div>
        <div className="h-72">
          <img src="/ferdowsiUni3.jpg" className="h-full" />
        </div>
      </Carousel>

      <div className="columns-1 mt-10 px-4" dir="rtl">
        <hr className="w-full border-t-2" />
        <p className="mt-6 p-1 text-justify">شرکت سهامی خاص " دنا نوا آزما"  در سال 1400 با تکیه بر اصل علم گرایی با همت جمعی از فارغ التحصیلان مقطع دکتری از دانشگاه های معتبر کشور و با هدف ارائه تولید محصولات دانش بنیان متکی بر دانش بیوتکنولوژی در شهر مشهد آغاز به کار نمود. در حال حاضر، دفتر اصلی شرکت در مرکز رشد دانشگاه فردوسی مشهد واقع شده است.  اولین محصولات تولیدی شامل سرم جنین گاوی (FBS)، سرم آلبومین گاوی (BSA)، اسیدآمینه سیستئین و اسیدآمینه گلایسین هستند و پس از آن همچنین به تولید محصولاتی چون محیط‌‌‌‌های کشت میکروبیولوژی، معرف ها و محلول‌‌‌‌های مربوط به تشخیص‌‌‌‌های میکروبی و ...روی آورده است.</p>
        <p className="p-1 mt-4 text-justify">شرکت دانش بنیان دنا نوا آزما آماده همکاری برای تولید طرح‌‌‌‌های دانش بنیان تولیدی در حوزه سلامت بوده و از طرح‌‌‌‌های تولیدی پژوهش گران جوان همواره حمایت می نماید. بر این اساس به زودی شاهد رشد و شکوفایی ایده هایی نو با حمایت شرکت دنا نوا آزما و توسط محققان و دانشمندان کشور عزیزمان خواهید بود.</p>
        <hr className="w-full border-t-2 mt-8 " />
      </div>

      <section className="columns-1 mt-10 text-center text-xl px-4">
        <Link href="/company/1234">
          <figure className="w-full mb-8 ">
            <a>
              <img className="h-72 w-full" src="/company1.jpg" alt="بن دا فرآور" />
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
