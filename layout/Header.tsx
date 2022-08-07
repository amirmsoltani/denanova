import React, { useState } from 'react';
import { MenuIcon } from "@heroicons/react/outline";
import Link from 'next/link';
import { useRouter } from 'next/router';


const menuItems = [
  { href: '/', name: 'خانه' },
  { href: '/about-us', name: 'درباره ما' },
  { href: '/contact-us', name: 'تماس با ما' },
]

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const menuHandelr = () => { setMenuOpen(!menuOpen) };

  const pathName = router.pathname;

  return (
    <header className='px-4 pt-1'>
      <div className='flex flex-1 justify-between'>

        <button className='w-8' onClick={menuHandelr}>
          <MenuIcon />
        </button>

        <div className='text-center'>
          <h1 className='text-2xl font-bold'>گروه</h1>
          <h1 className='text-6xl font-bold'>دنا نوا</h1>
        </div>
        <div className='w-8' />
      </div>


      <ul className={`${menuOpen ? "max-h-56" : "max-h-0"} overflow-hidden transition-all delay-500 flex flex-col divide-y divide-gray-400`}
        dir='rtl'
        onClick={menuHandelr}
      >
        {
          menuItems.map((item) => (
            <li key={item.href} className="flex flex-col justify-center py-4">
              <Link href={item.href}>
                <a className={`${item.href === pathName ? "font-bold" : "text-stone-400"} text-xl`}>
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