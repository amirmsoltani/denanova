import React, { FC, ReactNode } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";

type PropsType = { width: string ; children: ReactNode; visible: boolean; onClose: () => void };

const Modal: FC<PropsType> = ({ width ,children, visible, onClose }) => {
  return (
    <div
      className={`${
        visible ? "block" : "hidden"
      } fixed z-50 w-full h-screen bg-black/75 justify-center`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className={`${width} h-auto bg-white p-2  `}>
          <XCircleIcon
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
