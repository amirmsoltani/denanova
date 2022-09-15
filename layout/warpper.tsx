import React, { FC, ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import { PhoneIcon } from "@heroicons/react/24/solid";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Pic from "../components/pic";

type PropsType = { children: ReactNode };

const warpper: FC<PropsType> = ({ children }) => {
  return (
    <div className={"w-full"}>
      <Head>
        <title>شرکت دنا نوا آزما</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Header />
      <hr className="border-t-2 mb-6" />
      <main className="flex justify-center">
        <div className="container">{children}</div>
      </main>
      <hr className="border-t-2 mt-7" />
      <footer className=" text-md flex justify-center" dir="rtl">
        <div className="container">
          <div className="md:flex">
            <div className="w-full mt-10 px-4">
              <p className="text-xl font-semibold text-slate-700 mb-8">
                <span className="border-b-2 py-2 border-lime-400">
                  اطلاعات تماس
                </span>
                &nbsp;با شرکت صنایع زیستی دنا نوا آزما
              </p>
              <address className="">
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
              <span className="my-5 flex items-start">
                <span>
                  ایمیل :
                  <a className=" mr-1" href="mailto:Denanovaazma@hotmail.com">
                    Denanovaazma@hotmail.com
                  </a>
                </span>
                <EnvelopeIcon className="w-5 inline mr-2" />
              </span>

              <span className="my-5 block">شبکه های اجتماعی ما : </span>

              <div className="flex">
                <Link href="http://www.instagram.com/denanovaazma">
                  <a>
                    <div className="w-7 mr-2">
                      <Pic
                        srcPic="/instagram.svg"
                        classPic="h-full w-full"
                        altPic=""
                      />
                    </div>
                  </a>
                </Link>
                <Link href="https://api.whatsapp.com/send?phone=989155995924">
                  <a>
                    <div className="w-7 mr-3">
                      <Pic
                        srcPic="/whatsapp.svg"
                        classPic="h-full w-full"
                        altPic=""
                      />
                    </div>
                  </a>
                </Link>
              </div>
            </div>
            <div className="w-full px-4 h-96  md:mt-10  mt-6 md:ml-4 lg:px-4 lg:w-3/4 xl:w-2/4 2xl:px-16 2xl:w-2/4 ">
              <div className="w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10814.28711752185!2d59.52864255284617!3d36.309716970112255!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xce58408e73db183f!2zMzbCsDE4JzMzLjciTiA1OcKwMzInMTQuOCJF!5e0!3m2!1sen!2s!4v1663226248654!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <p className="my-8 text-gray-600  opacity-70" dir="rtl">
              تمامی حقوق مادی و معنوی سایت برای گروه دنا نوا محفوظ میباشد.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default warpper;
