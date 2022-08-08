import type { NextPage } from "next";
import { Warpper } from "../layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Warpper>
      <section className="columns-1 p-4">
        <h3 className="w-full bg-lime-500 text-white p-3 text-center text-2xl mb-5">
          محصولات
        </h3>
        <figure className="w-full bg-gray-100 mt-10 drop-shadow-lg" dir="rtl">
          <img className=" w-full h-72" src="/post.jpg" alt="" />
          <div className="px-2">
            <h3 className="my-4 text-3xl text-zinc-800 font-bold">کرم کلاژن</h3>
            <div className="">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                25<span className="text-base">مهر</span>
              </span>
              <span className="mt-2text-sm opacity-40 mr-2">سارا</span>
            </div>

            <p className="mt-4 mb-6 opacity-80 text-justify">
              عصاره مخمر بعنوان یک منبع مغذی از مخمر بعنوان ماده اصلی تهیه می
              گردد...
            </p>
          </div>
          <Link href="/product/123">
            <button className="w-full flex justify-center mt-8">
              <a className="px-20 py-4 text-center mb-4 shadow-sm block text-white bg-lime-500">
                ادامه مطلب
              </a>
            </button>
          </Link>
        </figure>
        <figure className="w-full bg-gray-100 mt-10 drop-shadow-lg" dir="rtl">
          <img className=" w-full h-72" src="/post2.jpg" alt="" />
          <div className="px-2">
            <h3 className="my-4 text-3xl text-zinc-800 font-bold">
              کرم ضد آفتاب و مرطوب کننده
            </h3>
            <div className="">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                24<span className="text-base">مهر</span>
              </span>
              <span className="mt-2text-sm opacity-40 mr-2">ژیلا</span>
            </div>

            <p className="mt-4 mb-6 opacity-80 text-justify">
              حاوی کمپلکس مواد مرطوب کننده موثر جهت پیشگیری از خشکی پوست...
            </p>
          </div>
          <Link href="/product/123">
            <button className="w-full flex justify-center mt-8">
              <a className="px-20 py-4 text-center mb-4 shadow-sm block text-white bg-lime-500">
                ادامه مطلب
              </a>
            </button>
          </Link>
        </figure>
      </section>
    </Warpper>
  );
};

export default Home;
