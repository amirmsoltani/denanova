import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Pic from "../components/pic";

const menuItems = [
  { href: "/", name: "خانه" },
  { href: "/products", name: "محصولات" },
  { href: "/agencies", name: "نمایندگی ها" },
  { href: "/servicesUs", name: "خدمات ما" },
  { href: "/contactUs", name: "تماس با ما" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuHandelr = () => {
    setMenuOpen(!menuOpen);
  };

  const pathName = router.pathname;

  return (
    <header className="px-4 py-2 w-full">
      <div className="lg:hidden">
        <div className="flex flex-1 justify-between h-32 ">
          <button className="w-8 mt-3" onClick={menuHandelr}>
            <Bars3Icon />
          </button>

          <div className="w-full h-full text-center " dir="rtl">
            <div className="flex justify-center">
              <Link href="/">
                <a className="flex">
                  <Pic srcPic="/logoFarsi.png" classPic="h-20" altPic="" />
                </a>
              </Link>
            </div>
            <Link href="/">
              <a className="md:self-center">
                <p className="lg:w-full text-3xl mt-2 font-semibold tracking-wide">
                  شرکت سهامی خاص دنا نوا آزما
                </p>
              </a>
            </Link>
          </div>
        </div>

        <ul
          className={`${
            menuOpen ? "max-h-96" : "max-h-0"
          } overflow-hidden  transition-all delay-500 flex flex-col  mt-6`}
          dir="rtl"
          onClick={menuHandelr}
        >
          {menuItems.map((item) => (
            <li
              key={item.href}
              className="flex flex-col justify-center bg-lime-300 py-4 px-3 mb-1 text-center"
            >
              <Link href={item.href}>
                <a
                  className={`${
                    item.href === pathName ? "font-bold" : "text-stone-400"
                  } text-xl hover:bg-lime-300 `}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* menu for lg and xl */}

      <div className="lg:block w-full h-40 hidden mb-5" dir="rtl">
        <div className="">
          <div className="w-full h-full text-center " dir="rtl">
            <div className="flex justify-center">
              <Link href="/">
                <a className="flex">
                  <Pic srcPic="/logoFarsi.png" classPic="h-20" altPic="" />
                </a>
              </Link>
            </div>
            <Link href="/">
              <a className="self-center">
                <p className="w-full text-3xl mt-2 font-semibold tracking-wide">
                  شرکت سهامی خاص دنا نوا آزما
                </p>
              </a>
            </Link>
          </div>
        </div>
        <div className="mt-5 w-full flex justify-center my-2">
          <ul className="flex self-end pb-2" dir="rtl" onClick={menuHandelr}>
            {menuItems.map((item) => (
              <li key={item.href} className="mr-10">
                <Link href={item.href}>
                  <a
                    className={`${
                      item.href === pathName ? "font-bold" : "text-stone-400"
                    } text-xl`}
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
