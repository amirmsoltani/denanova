import { withAuthSsr } from "../../lib";

export const getServerSideProps = withAuthSsr(async () => {
  return { redirect: { destination: "/admin/dashboard", permanent: true } };
});

export default () => null;
