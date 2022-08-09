import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";

const File: NextPage = () => {
  return (
    <AdminWrapper>
      <div className="columns-3">
        <div className="w-full h-52">
          <img className="w-full" src="../../../public/company.jpg" alt="" />
          sss
        </div>
      </div>
    </AdminWrapper>
  );
};

export default File;
