import { NextPage } from "next";
import { AdminWarpper } from "../../layout";
import TableMessage from "../../components/tableMessage";
import Modal from "../../components/modal";
import { useState } from "react";

const Post: NextPage = () => {

  const [modalOpen , setModalOpen] = useState(false);
  const modalHandler = ()=>{
    setModalOpen(!modalOpen);
  };


  return (
    <>
      <Modal width="w-7/12" visible={modalOpen} onClose={modalHandler}>
        <div className="text-center" dir="rtl">
          <div className="text-xl">
            <span>موضوع : </span>
            <span>برقراری ارتباط با شما</span>
          </div>
          <div className="flex justify-around text-md text-gray-600 py-2 border-b border-gray-600">
            <p>جعفر جعفر زاده جعفر آبادی</p>
            <p className="">1401/5/21</p>
          </div>
          <p className="text-justify mt-2 text-lg">
          کلید ارتباط موثر با جهان سخن گفتن به زبان جهانیان است. خدمات ترجمه تخصصی ما که در کلاس جهانی ارائه می‌شود به شما کمک می‌کند بازارهای جدیدی بیابید و خود را به خوبی به شرکای بین المللی معرفی کنید. همچنین، طیف گسترده مترجم‌های ما، شما را قادر می‌سازد تخصصی‌ترین متون آکادمیک را بر اساس استانداردهای پذیرش معتبرترین ژورنال‌ها ترجمه کنید.


          </p>
          <p className="text-start mt-2 text-md text-blue-900" dir="ltr">a@a.com</p>
        </div>
      </Modal>
      <AdminWarpper>
        <TableMessage showModal={modalHandler}/>
      </AdminWarpper>
    </>
  );
};

export default Post;
