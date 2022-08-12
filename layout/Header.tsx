import React, { useState } from 'react';
import { MenuIcon } from "@heroicons/react/outline";
import Link from 'next/link';
import { useRouter } from 'next/router';


const menuItems = [
  { href: '/', name: 'خانه' },
  { href:'/products', name:'محصولات'},
  { href: '/aboutUs', name: 'درباره ما' },
  { href: '/contactUs', name: 'تماس با ما' },
]

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuHandelr = () => { setMenuOpen(!menuOpen) };

  const pathName = router.pathname;

  return (
    <header className='px-4 py-2'>
      <div className='flex flex-1 justify-between'>

        <button className='w-8' onClick={menuHandelr}>
          <MenuIcon />
        </button>

        <div className='text-center text-lime-500'>
          <h1 className='text-2xl font-bold'>گروه</h1>
          <h1 className='text-6xl font-bold'>دنا نوا</h1>
        </div>
        <div className='w-8' />
      </div>


      <ul className={`${menuOpen ? "max-h-72" : "max-h-0"} overflow-hidden  transition-all delay-500 flex flex-col  mt-6`}
        dir='rtl'
        onClick={menuHandelr}
      >
        {
          menuItems.map((item) => (
            <li key={item.href} className="flex flex-col justify-center bg-lime-300 py-4 px-3 mb-1 text-center">
              <Link href={item.href}>
                <a className={`${item.href === pathName ? "font-bold" : "text-stone-400"} text-xl hover:bg-lime-300 `} style={{WebkitTapHighlightColor:'transparent'}}>
                  {item.name}
                </a>
              </Link>
            </li>))
        }

      </ul>
    </header>
  )
}

export default Header