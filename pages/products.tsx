import type { NextPage } from "next";
import { Warpper } from "../layout";
import Link from "next/link";

const Products: NextPage = () => {
  return (
    <Warpper>
      <section className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1">
        <figure className="h-auto bg-gray-100 m-5 drop-shadow-lg" dir="rtl">
          <img className=" w-full md:h-72 sm:h-96 h-72" src="/imgProduct1.jpg" alt="" />
          <div className="px-2">
            <h3 className="my-4 text-3xl text-zinc-800 font-bold">
              محصول سرم جنین گاوی (FBS)
            </h3>
            <div className="">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                25<span className="text-base">مهر</span>
              </span>
              <span className="mt-2 text-sm opacity-40 mr-2">مهدیه درودی</span>
            </div>

            <p className="mt-4 mb-6 opacity-80 text-justify text-ellipsis overflow-hidden">
              سرم جنین گاوی (FBS): بخش مایع خون لخته شده در جنین گوساله است که
              از سلول ها، فیبرین و فاکتورهای لخته کننده آن گرفته شده، اما حاوی
              تعداد زیادی از مواد مغذی و ماکرومولکول های ضروری برای رشد سلول
              است. آلبومین موجود در سرم گاوی، اصلی ترین ترکیب موجود در FBS است.
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
        <figure className="h-auto bg-gray-100 m-5 drop-shadow-lg" dir="rtl">
          <img className=" w-full md:h-72 sm:h-96 h-72" src="/imgProduct1.jpg" alt="" />
          <div className="px-2">
            <h3 className="my-4 text-3xl text-zinc-800 font-bold">
              محصول سرم جنین گاوی (FBS)
            </h3>
            <div className="">
              <span className="text-xl mt-2 border-x-2 px-2 border-gray-300 opacity-60">
                25<span className="text-base">مهر</span>
              </span>
              <span className="mt-2 text-sm opacity-40 mr-2">مهدیه درودی</span>
            </div>

            <p className="mt-4 mb-6 opacity-80 text-justify text-ellipsis overflow-hidden">
              سرم جنین گاوی (FBS): بخش مایع خون لخته شده در جنین گوساله است که
              از سلول ها، فیبرین و فاکتورهای لخته کننده آن گرفته شده، اما حاوی
              تعداد زیادی از مواد مغذی و ماکرومولکول های ضروری برای رشد سلول
              است. آلبومین موجود در سرم گاوی، اصلی ترین ترکیب موجود در FBS است.
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

export default Products;
