import type { NextPage } from "next";
import { Carousel } from "react-responsive-carousel";
import { Warpper } from "../../layout";
import Link from "next/link";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // can also be true or 'blocking'
  };
}

export async function getStaticProps() {
  return { props: {} };
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
              <img src="/post.jpg" className="h-full" />
            </div>
            <div className="h-72">
              <img src="/post2.jpg" className="h-full" />
            </div>
          </Carousel>
        <div className="w-full" dir="rtl">
          

          <div className="p-4">
            <h3 className=" text-3xl text-zinc-800 font-bold">کرم کلاژن</h3>
            <div className="mt-2">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                25<span className="text-base">مهر</span>
              </span>
              <span className="mt-2text-sm opacity-40 mr-2">سارا</span>
            </div>

            <p className="mt-4 mb-6 opacity-80 text-justify">
              عصاره مخمر بعنوان یک منبع مغذی از مخمر بعنوان ماده اصلی تهیه می
              گردد...
            </p>
            <span className="font-bold text-lg">توضیحات :</span>
            <p className="text-justify">به طور کلی تابش های نور خورشید شامل پرتوهای گاما ، ایکس ، فرابنفش ، مرئی ، مادون قرمز ، امواج میکرو و امواج رادیویی می باشد . تابش هایی با طول موج کم ، فرکانس زیاد و انرژی بالا مانند اشعه گاما و ایکس که توانایی برانگیختگی الکترونی را دارند کاملا توسط لایه اوزون جذب می گردند .از تابش های نور خورشید رسیده به سطح زمین ، 54 درصد تابشهای آی آر ، 39 درصد تابش های مرئی و 7 درصد تابش های فرابنفش است . در حدود 95 درصد از تابش های فرابنفش نور خورشید از UVA و درصد کمی از UVB تشکیل شده است . همچنین لایه اوزون ، تمام تابش های UVC با انرژی زیاد و قسمت عمده ای از UVB را جذب میکند . اثرات مخرب تابش های فرابنفش به خوبی مشخص و اثبات شده است به گونه ای که اشعه UVB تا بخش های فوقانی درم پیشرفت کرده و تابش های UVA که دارای طول موج بلندتری هستند تا اعماف لایه درم نفوذ می کنند . از آسیب ها و عوارض پوستی ناشی از تابش های فرابنفش نور خورشید می توان به بیماری های حساس به نور آفتاب ، اریتم ( قرمزی ) و التهاب ، ایجاد لک های پوستی ، ضخیم شدن لایه شاخی پوست و عوارض مزمن نظیر پیری پوست ناشی از آفتاب و ایجاد انواع سرطان های پوستی اشاره کرد . همچنین تابش های مادون قرمز همانند تابش های فرابنفش و به ترتیب افزایش در طول موج به IRC ، IRB و IRA تقسیم بندی می شوند . </p>
          </div>
        </div>
    </Warpper>
  );
};

export default Home;
