import type { NextPage } from "next";
import { Warpper } from "../layout";
import { Carousel } from "react-responsive-carousel";


const Home: NextPage = () => {
  return (
    <Warpper>
      <div className="columns-1 p-4" dir="rtl">
        <div className="w-full">
          <h3 className="text-2xl">معرفی گروه دنا نوا</h3>
          <p className="text-justify mt-2 opacity-80">
            به صورت سنتی کسب و کار و درآمد شرکت های پیمانکاری و مدیریت پیمان
            وابستگی مستقیم به بودجه عمرانی دولت و الویتهای دولت در تعریف و
            واگذاری این پروژه ها دارد. اقتصاد دولتی ایران در دهه گذشته با چالش
            های بسیاری ناشی از مشکلات اقتصاد جهانی، اعمال تحریمهای جدید غرب و
            تشدید تحریم ها و سوء مدیریت دولتی مواجه بوده و هست.
            <br />
            حذف یا عدم تخصیص کافی و به موقع منابع دولتی به پروژه های عمرانی عملا
            بسیاری از این شرکت ها را با شرایط سخت و تهدید کننده و نامطمئن به
            آینده قرار داده است.
            <br />
            در گروه توسعه بن دا، ما اعتقاد داریم که توسعه پایدار یک فرآیند است
            که یک رویکرد جامع برای جنبه های مختلف اجتماعی، اقتصادی، محیط زیست و
            محیطی را در برمی گیرد. هدف اصلی ما در تمام پروژه های ساخت و ساز،
            ارتقاء کیفیت زندگی و ایجاد یک تغییر مثبت در زمینه هایی است که در آن
            ما قصد داریم مداخله کنیم
          </p>
          <h3 className="mt-5 text-2xl">حوزه های فعالیت</h3>
          <ul className=" list-disc mr-4 mt-2 opacity-80">
            <li>نفت و گاز و پتروشیمی</li>
            <li>حمل و نقل ریلی</li>
            <li>نیروگاه</li>
            <li>انرژی های نو</li>
            <li>پروژه های توسعه ای ساختمانی</li>
            <li>بیوتکنولوژی</li>
            <li>کشاورزی و آب</li>
          </ul>
        </div>

        <div className="w-full mt-8">
          <img className="w-full" src="/logoBig.png" alt="" />
        </div>
      </div>

      <Carousel
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
    </Warpper>
  );
};

export default Home;
