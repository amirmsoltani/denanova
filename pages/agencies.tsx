import type { NextPage } from "next";
import { Warpper } from "../layout";
import Link from "next/link";

// export async function getStaticPaths(){
//   return {
//     paths: [],
//     fallback: true, // can also be true or 'blocking'
//   }
// }

const Company: NextPage = () => {
  return (
    <Warpper>
      <div className="columns-1 my-10 px-4" dir="rtl">

        <p className="text-lg">
          نمایندگی های شرکت دانش بنیان دنا نوا به شرح زیر می باشد :
        </p>
        <ul className="list-decimal mr-5 mt-2">
          <li className="mt-3">
            <Link href="#">
              <a className="hover:text-gray-600">شرکت 1</a>
            </Link>
          </li>
          <li className="mt-3">
            <Link href="#">
              <a className="hover:text-gray-600">شرکت 2</a>
            </Link>
          </li>
          <li className="mt-3" >
            <Link href="#">
              <a className="hover:text-gray-600">شرکت 3</a>
            </Link>
          </li>
        </ul>
      </div>
    </Warpper>
  );
};

export default Company;
