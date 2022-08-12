import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TableCompany from "../../components/tableCompany";

const Post:NextPage =() => {
    return(
        <AdminWrapper>
            <TableCompany />
        </AdminWrapper>
    );
};

export default Post;