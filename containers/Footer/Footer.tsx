import {NAV_ITEMS} from "@/constants/navigation";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className='flex items-center justify-between flex-wrap bg-teal-500 p-8'>
            <div className="block">
                <div className='text-xl text-white font-bold'>logo</div>
            </div>

            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow px-4">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.path} href={item.path} className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>{item.name}</Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}