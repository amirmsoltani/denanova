import React, { FC, ReactNode } from "react";
import { XIcon } from "@heroicons/react/solid";

type PropsType = { children: ReactNode; visible: boolean; onClose: () => void };

const Modal: FC<PropsType> = ({ children, visible, onClose }) => {
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } absolute z-50 w-full h-screen bg-black/75 justify-center`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-96 bg-white p-2  ">
          <XIcon
            onClick={onClose}
            className="absolute w-6 text-red-600 hover:text-red-400"
          />

          <div className="my-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
