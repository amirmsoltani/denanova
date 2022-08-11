import { NextPage } from "next";
import { AdminWarpper } from "../../layout";
import TableMessage from "../../components/tableMessage";

const Post: NextPage = () => {
  return (
    <AdminWarpper>
      <TableMessage/>
    </AdminWarpper>
  );
};

export default Post;
