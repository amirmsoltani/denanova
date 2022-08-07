import React, { FC, ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

type PropsType = { children: ReactNode };

const warpper: FC<PropsType> = ({ children }) => {
  return (
    <div className={"w-full"}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="container">
        {children}
      </main>
      <footer className="mt-8 text-center text-md">
        <hr className="border-t-2 " />
        <p className="my-8 text-gray-600 opacity-70" dir="rtl">
          تمامی حقوق مادی و معنوی سایت برای گروه دنا نوا محفوظ میباشد.
        </p>
      </footer>
    </div>
  );
};

export default warpper;
