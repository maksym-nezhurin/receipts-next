'use client'
import Link from "next/link";
import {NAV_ITEMS} from "@/constants/navigation";
import {useState} from "react";

export const Navigation = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-8">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
            </div>
            <div className="block lg:hidden">
                <button
                    onClick={() => setOpen((prevState) => !prevState)}
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                    </svg>
                </button>
            </div>
            <div className={`${open ? 'none' : 'block' } w-full flex-grow lg:flex lg:items-center lg:w-auto`}>
                <div className="text-sm lg:flex-grow">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.path} href={item.path} className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>{item.name}</Link>
                    ))}
                </div>
                <div>
                    <a href="#"
                       className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>

                    <Link href={'/signin'} className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white ml-4'>Sign In</Link>
                </div>
            </div>
        </nav>
)
    ;
}