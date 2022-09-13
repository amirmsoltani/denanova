import type { NextPage } from "next";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../layout";
import Pic from "../components/pic";

const Home: NextPage = () => {
  return (
    <Warpper>
      <Carousel
        showThumbs={false}
        showStatus={false}
        interval={3000}
        infiniteLoop
        autoPlay
      >
        <div className="md:h-ft h-72">
          <Pic srcPic="/ferdowsiUni1.webp" classPic="h-full w-full" altPic="" />
        </div>
        <div className="md:h-ft h-72">
          <Pic srcPic="/ferdowsiUni2.webp" classPic="h-full w-full" altPic="" />
        </div>
        <div className="md:h-ft h-72">
          <Pic srcPic="/ferdowsiUni3.webp" classPic="h-full w-full" altPic="" />
        </div>
        <div className="md:h-ft h-72">
          <Pic srcPic="/sliderHomeIMG1.jpg" classPic="h-full w-full" altPic="" />
        </div>
        <div className="md:h-ft h-72">
          <Pic srcPic="/sliderHomeIMG2.jpg" classPic="h-full w-full" altPic="" />
        </div>
      </Carousel>

      <div className="columns-1 mt-10 px-4 text-lg" dir="rtl">
        <hr className="w-full border-t-2" />
        <p className="mt-6 p-1 text-justify">
          شرکت سهامی خاص &quot;دنا نوا آزما&quot; در سال 1400 با تکیه بر اصل علم
          گرایی با همت جمعی از فارغ التحصیلان مقطع دکتری از دانشگاه های معتبر
          کشور و با هدف ارائه تولید محصولات دانش بنیان متکی بر دانش بیوتکنولوژی
          در شهر مشهد آغاز به کار نمود. در حال حاضر، دفتر اصلی شرکت در مرکز رشد
          دانشگاه فردوسی مشهد واقع شده است. اولین محصولات تولیدی شامل سرم جنین
          گاوی (FBS)، سرم آلبومین گاوی (BSA)، اسیدآمینه سیستئین و اسیدآمینه
          گلایسین هستند و پس از آن همچنین به تولید محصولاتی چون محیط‌‌‌‌های کشت
          میکروبیولوژی، معرف ها و محلول‌‌‌‌های مربوط به تشخیص‌‌‌‌های میکروبی و
          ...روی آورده است.
        </p>
        <p className="p-1 mt-4 text-justify">
          شرکت دانش بنیان دنا نوا آزما آماده همکاری برای تولید طرح‌‌‌‌های دانش
          بنیان تولیدی در حوزه سلامت بوده و از طرح‌‌‌‌های تولیدی پژوهش گران جوان
          همواره حمایت می نماید. بر این اساس به زودی شاهد رشد و شکوفایی ایده
          هایی نو با حمایت شرکت دنا نوا آزما و توسط محققان و دانشمندان کشور
          عزیزمان خواهید بود.
        </p>
      </div>
    </Warpper>
  );
};

export default Home;
