import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";

const File: NextPage = () => {
  return (
    <AdminWrapper>
      <div className="columns-3">
        <div className="w-full h-96">
          <img className="w-52 h-52" src="../../public/crusel.jpg" alt="" />
          sss
        </div>
      </div>
    </AdminWrapper>
  );
};

export default File;
