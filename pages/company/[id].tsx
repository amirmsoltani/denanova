import type { NextPage } from "next";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../../layout";

export async function getStaticPaths(){
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  }
}

export async function getStaticProps() {
  return {props:{}}
}

const Home: NextPage = () => {
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

      <div className="columns-1 my-1 px-4" dir="rtl">
        <hr className="border-x-2 my-6" />
        <h3 className="text-center text-2xl ">شرکت توسعه بن دا فرآور</h3>
        <img className="w-full h-72 my-5" src="/company.jpg" alt="" />
        <p className="my-8 text-justify">شرکت توسعه بن دا فرآور، در سال ۱۳۹۴ با هدف دستیابی به دانش فنی تولید آنزیم در صنایع مختلف، فعالیت های زیر بنایی- تحقیق و توسعه خود را آغاز نمود. پس از دستیابی به دانش فنی تولید محصولات آنزیمی و بومی سازی این تکنولوژی، در آبان ماه سال ۱۳۹۵ با احداث کارخانه ای به مساحت بالغ بر ۵۰۰۰ متر مربع در شهرک صنعتی صفادشت در عرصه پیاده سازی تفکر تولید گام نهاد. این شرکت برای نخستین بار مفتخر به اخذ گواهی دانش بنیان در تولید محصولات آنزیمی در مقیاس صنعتی از نهاد ریاست جمهوری شده است.شرکت توسعه بن دا فرآور دارای امکانات تولیدی با سه خط جداگانه فرمانتاسیون و بیش از ۱۲۰۰متر مربع اتاق تمیز جهت تولید انواع محصولات آنزیمی و محصولات بیولوژیک بوده و همچنین دارای یکی از مجهزترین آزمایشگاههای کنترل کیفی اینگونه محصولات مطابق با استاندارد ISO-17025 می باشد. <br />شرکت توسعه بن دا فرآور دارای امکانات تولیدی با سه خط جداگانه فرمانتاسیون و بیش از ۱۲۰۰متر مربع اتاق تمیز جهت تولید انواع محصولات آنزیمی و محصولات بیولوژیک بوده و همچنین دارای یکی از مجهزترین آزمایشگاههای کنترل کیفی اینگونه محصولات مطابق با استاندارد ISO-17025 می باشد.</p>
      </div>
    </Warpper>
  );
};

export default Home;
