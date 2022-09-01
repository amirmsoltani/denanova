import type { NextPage } from "next";
import { Warpper } from "../layout";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { DevicePhoneMobileIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const ContactUs: NextPage = () => {
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
              required
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
            <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600">موضوع</span>
            <input
              className="w-full  p-2 my-2 mb-5 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="text"
              required
            />
          </label>

          <label className="block" htmlFor="">
            <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600">پیام شما</span>
            <textarea
              className="w-full mt-2 h-44 p-1 bg-gray-50 border border-gray-500 rounded text-gray-500 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              name=""
              id=""
              required
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
            <span className="border-b-2 py-2 border-yellow-500">
              اطلاعات تماس
            </span>
            &nbsp;با شرکت صنایع زیستی دنا نوا آزما
          </p>
          <address>
            <span>آدرس: </span>
            <br />
            مشهد، میدان آزادی، دانشگاه فردوسی، مرکز رشد شماره ۴، واحد 419
          </address>
          <p className="my-5">
            <span className="mt-2">کدپستی :</span>9177943338
          </p>
          <span className="my-5 flex items-center">
            <label> تلفن : </label>
            <a className=" mr-1" href="tel:+985138769383">
              985138769383+
            </a>
            <PhoneIcon className="w-4 inline  mr-2" />
          </span>
          <span className="my-5 flex items-start">
            <label>شماره همراه :</label>
            <a className=" mr-1" href="tel:+989155995924">
              989155995924+
            </a>
            <DevicePhoneMobileIcon className="w-5 inline  mr-2" />
          </span>
          <span className="flex items-start">
            <span>
              ایمیل :
              <a className=" mr-1" href="mailto:Denanovaazma@hotmail.com">
                Denanovaazma@hotmail.com
              </a>
            </span>
            <EnvelopeIcon className="w-5 inline mr-2" />
          </span>
        </div>
      </div>
    </Warpper>
  );
};

export default ContactUs;
