import { InferGetServerSidePropsType, NextPage } from "next";
import { AdminWarpper } from "../../layout";
import TableMessage from "../../components/tableMessage";
import Modal from "../../components/modal";
import { useState } from "react";
import { prisma, withAuthSsr } from "../../lib";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));
  const search = (query.search as string) || "";

  const messages = await prisma.contantUs.findMany({
    where: { subject: { contains: search } },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: {
      id: true,
      subject: true,
      createAt: true,
      fullName: true,
      email: true,
      Content: true,
      read: true,
    },
  });

  const counts = await prisma.contantUs.count({
    where: { subject: { contains: search } },
  });

  const lastPage = Math.ceil(counts / pageSize);

  return {
    props: {
      content: messages.map((message) => ({
        ...message,
        createAt: message.createAt.toISOString(),
      })),
      pagination: { pageSize, page, counts, lastPage },
    },
  };
});

type PropsType = InferGetServerSidePropsType<typeof getServerSideProps>;

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  
  console.log(content, pagination);

  const [modalOpen, setModalOpen] = useState(false);
  const modalHandler = () => {
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
            کلید ارتباط موثر با جهان سخن گفتن به زبان جهانیان است. خدمات ترجمه
            تخصصی ما که در کلاس جهانی ارائه می‌شود به شما کمک می‌کند بازارهای
            جدیدی بیابید و خود را به خوبی به شرکای بین المللی معرفی کنید.
            همچنین، طیف گسترده مترجم‌های ما، شما را قادر می‌سازد تخصصی‌ترین متون
            آکادمیک را بر اساس استانداردهای پذیرش معتبرترین ژورنال‌ها ترجمه
            کنید.
          </p>
          <p className="text-start mt-2 text-md text-blue-900" dir="ltr">
            a@a.com
          </p>
        </div>
      </Modal>
      <AdminWarpper>
        <TableMessage showModal={modalHandler} />
      </AdminWarpper>
    </>
  );
};

export default Post;
