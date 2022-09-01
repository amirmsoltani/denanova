import { withAuthSsr } from "../../lib";

export const getServerSideProps = withAuthSsr(async () => {
  return { redirect: { destination: "/admin/messages", permanent: true } };
});

export default () => null;
