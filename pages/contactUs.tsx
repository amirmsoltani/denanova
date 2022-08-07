import type { NextPage } from "next";
import { Warpper } from "../layout";
import { PhoneIcon } from "@heroicons/react/solid";
import {MailIcon} from "@heroicons/react/outline";

const Home: NextPage = () => {
  return (
    <Warpper>
      <div className="w-full columns-1 p-4  " dir="rtl">
        <form action="">
          <label className="w-full" htmlFor="">
            <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600 text-lg">
              نام شما
            </span>
            <input
              className="w-full p-2 my-2 mb-5 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="text"
            />
          </label>

          <label className="w-full my-10" htmlFor="">
            <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600 text-lg">
              ایمیل شما
            </span>
            <input
              className="w-full peer p-2 mt-2 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="email"
            />
            <p className=" mt-1 invisible peer-invalid:visible text-red-500 text-sm ">
              ایمیل را درست وارد کنید!
            </p>
          </label>

          <label className="w-full my-10" htmlFor="">
            <span className="mr-1">موضوع</span>
            <input
              className="w-full  p-2 my-2 mb-5 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="text"
            />
          </label>

          <label className="block" htmlFor="">
            <span className="mr-1 ">پیام شما</span>
            <textarea
              className="w-full mt-2 h-44 p-1 bg-gray-50 border border-gray-500 rounded text-gray-500 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              name=""
              id=""
            ></textarea>
          </label>

          <input
            className="border border-gray-400 mt-3 text-lg py-3 px-7 bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-600 "
            value="ارسال"
            type="submit"
          />
        </form>
        <div className="w-full my-6">
          <p className="text-xl my-8">
            <span className="border-b-2 py-2 border-yellow-500">اطلاعات</span> تماس با
            گروه دنا نوا
          </p>
          <address>
            <span>آدرس: </span>تهران، محله آرارات، بزرگراه حجت الاسلام هاشمی
            رفسنجانی، قبل از خروجی کردستان، مجتمع شهرک فجر، ساختمان نواب صفوی
          </address>
          <span className="my-5 flex items-center">
            <label> تلفن: </label>
            <a className=" mr-1" href="tel:+985138822456">
              985138822456+ 
            </a>
            <PhoneIcon className="w-4 inline  mr-2" />
          </span>
          <span className="flex items-center">
            <label>ایمیل: </label>
            <a className=" mr-1" href="mailto:info@denanova.com">info@denanova.com</a>
            <MailIcon className="w-4 inline mr-2" />
          </span>
        </div>
      </div>
    </Warpper>
  );
};

export default Home;
