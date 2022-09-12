import type { NextPage } from "next";
import { useState } from "react";
import { Warpper } from "../layout";
import Router from "next/router";
import Modal from "../components/modal";
import Image from "next/image";

const ContactUs: NextPage = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const submit = async (event: any) => {
    event.preventDefault();
    setShowLoading(true);
    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const description = event.target["description"].value;
    const message = event.target["message"].value;

    const response = await fetch("/api/contact-us", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        fullName: name,
        email: email,
        subject: description,
        content: message,
      }),
    });

    if (response.status === 200) {
      const router = Router;
      router.reload();
    } else {
      setModalOpen(true);
    }
    setShowLoading(false);
  };

  const modalHandler = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Modal width="w-96" visible={modalOpen} onClose={() => modalHandler()}>
        <div className="text-center">
          <p className="py-2 border-b text-red-600 text-lg">
            ! پیام شما ارسال نشد
          </p>
          <p className="py-1 mt-1 ">ایمیل خود را بررسی کنید</p>
          <p className="py-1 text-gray-600">
            نام و نام خانوادگی خود را پس وارد کردن بررسی کنید
          </p>
          <p className="py-1 ">
            تعداد حروف موضوع پیام باید بین ۶ تا ۱۰۰ حرف باشد.
          </p>
          <p className="py-1 text-gray-600">
            تعداد حروف پیام ارسالی باید بین ۱۰ تا ۱۵۰۰ حرف باشد
          </p>
        </div>
      </Modal>
      <Warpper>
        <div className="w-full columns-1 p-4  " dir="rtl">
          <form onSubmit={submit}>
            <label className="w-full" htmlFor="name">
              <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600 text-lg">
                نام شما
              </span>
            </label>

            <input
              className="w-full p-2 my-2 mb-5 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="text"
              name="name"
              id="name"
            />

            <label className="w-full my-10" htmlFor="email">
              <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600 text-lg">
                ایمیل شما
              </span>
            </label>
            <input
              className="w-full peer p-2 mt-2 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="email"
              name="email"
              id="email"
            />
            <p className=" mt-1 invisible peer-invalid:visible text-red-500 text-sm ">
              ایمیل را درست وارد کنید!
            </p>

            <label className="w-full my-10" htmlFor="description">
              <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600">
                موضوع
              </span>
            </label>
            <input
              className="w-full  p-2 my-2 mb-5 border border-gray-500 rounded bg-gray-50 text-gray-500 h-12 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              type="text"
              name="description"
              id="description"
            />

            <label className="block" htmlFor="message">
              <span className="mr-1 after:content-['*'] after:mr-1 after:text-sm after:text-red-600">
                پیام شما
              </span>
            </label>
            <textarea
              className="w-full mt-2 h-44 p-1 bg-gray-50 border border-gray-500 rounded text-gray-500 focus:text-lg delay-300 transition-all focus:outline-gray-400"
              name="message"
              id="message"
            ></textarea>

            <button
              className="border border-gray-400 mt-3 text-lg py-3 px-7 bg-slate-600 text-white hover:bg-slate-200 hover:text-slate-600 flex items-center"
              type="submit"
            >
              <span className="mx-1">ارسال</span>
              <div
                className={`${showLoading ? "inline" : "hidden"} w-6 inline`}
              >
                <Image
                  src="/loading.webp"
                  width="100%"
                  height="100%"
                  layout="responsive"
                  alt=""
                />
              </div>
            </button>
          </form>
        </div>
      </Warpper>
    </>
  );
};

export default ContactUs;
