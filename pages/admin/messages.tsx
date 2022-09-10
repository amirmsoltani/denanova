import { InferGetServerSidePropsType, NextPage } from "next";
import { AdminWarpper } from "../../layout";
import TableMessage from "../../components/tableMessage";
import Modal from "../../components/modal";
import { useState } from "react";
import { prisma, withAuthSsr } from "../../lib";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";

export const getServerSideProps = withAuthSsr(async ({ query }) => {
  const pageSize = Math.abs(+(query.pageSize || 10));
  const page = Math.abs(+(query.page || 1));
  const search = (query.search as string) || "";

  const messages = await prisma.contactUs.findMany({
    where: { subject: { contains: search } },
    take: pageSize,
    skip: pageSize * (page - 1),
    select: {
      id: true,
      subject: true,
      createAt: true,
      fullName: true,
      email: true,
      content: true,
      read: true,
    },
  });

  const counts = await prisma.contactUs.count({
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

type messageType ={
  content:string;
  createAt:string;
  email:string;
  fullName:string;
  subject:string;
  id:number;
  read:boolean;
}

const Post: NextPage<PropsType> = ({ content, pagination }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [msgState, setMsgState] = useState<messageType | undefined>()
  
  //modalHandler & set state
  const modalHandler = (dataMessage?:messageType) => {
    dataMessage&&setMsgState(dataMessage);
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Modal width="w-7/12" visible={modalOpen} onClose={() => modalHandler()}>
        <div className="text-center" dir="rtl">
          <div className="text-xl">
            <span>موضوع : </span>
            <span>{msgState?.subject}</span>
          </div>
          <div className="flex justify-around text-md text-gray-600 py-2 border-b border-gray-600">
            <p>نام : {msgState?.fullName}</p>
            <p className="">تاریخ : {dayjs().calendar('jalali').format('hh:mm - YYYY/MM/DD')}</p>
          </div>
          <p className="text-justify mt-2 text-lg">{msgState?.content}</p>
          <p className="text-start mt-2 text-md text-blue-900" dir="ltr">{msgState?.email}</p>
        </div>
      </Modal>
      <AdminWarpper>
        <TableMessage dataPagination={pagination}>
          {content.map((item, index) => {
            return (
              <tr key={index} className={`${index%2===0 ? "bg-gray-50" :"bg-gray-200"} text-center  border-b border-gray-300`}>
                <td className="border-l border-gray-500">{++index}</td>
                <td className="border-l border-gray-500">{item.subject}</td>
                <td className="border-l border-gray-500">{item.email}</td>
                <td className="border-l border-gray-500">{item.fullName}</td>
                <td className="border-l border-gray-500 text-sm">{dayjs().calendar('jalali').format('hh:mm - YYYY/MM/DD')}</td>

                <td className="py-1">
                  <EnvelopeIcon
                    onClick={() => modalHandler(item)}
                    className="w-5 mt-1 inline text-cyan-700 hover:cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </TableMessage>
      </AdminWarpper>
    </>
  );
};

export default Post;
