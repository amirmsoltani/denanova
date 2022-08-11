import type { NextPage } from "next";
import AdminWrapper from "../../layout/adminWrapper";
import TablePost from "../../components/tablePost";

const Post:NextPage =() => {
    return(
        <AdminWrapper>
            <TablePost />
        </AdminWrapper>
    );
};

export default Post;