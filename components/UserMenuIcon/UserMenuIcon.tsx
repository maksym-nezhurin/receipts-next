'use client'
import profileDefault from '@/assets/images/profile.png';
import { useState} from "react";
import {signOut, signIn} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {ISession} from "@/interfaces/auth";

interface IProps {
    session: ISession | null
}
export const UserMenuIcon = (props: IProps) => {
    const { session } = props;
    const user = session?.user
    const router = useRouter();
    const { name, avatar, accessToken } = user || {};
    console.log('accessToken', accessToken)
    const profileImage = avatar || profileDefault;
    const [isProfileMenuOpen, setProfileMenuOpen] = useState<Boolean>(false);

    const renderMenu = () => {
        return accessToken ? <>
            <button
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-0"
                onClick={() => {
                    setProfileMenuOpen(false);
                    router.push('/profile')
                }}
            >Your Profile
            </button
            >
            <button
                onClick={() => {
                    setProfileMenuOpen(false);
                    signOut();
                }}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
            >Sign Out
            </button>
        </> : <>
            <div className="flex items-center">
                <Link href={'/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F'}>
                    login
                </Link>
            </div>
        </>;
    }
    return (<div className="relative ml-3">
        <div>
            <button
                type="button"
                onClick={() => setProfileMenuOpen(state => !state)}
                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
            >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <Image
                    className="h-8 w-8 rounded-full"
                    width={25}
                    height={25}
                    src={profileImage}
                    alt=""
                />
            </button>
        </div>

        {
            isProfileMenuOpen && (
                <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                >
                    <div className='px-4 py-2 text-sm text-gray-700'>
                        Hello <b>{name}</b>
                    </div>
                    {renderMenu()}
                </div>
            )
        }
    </div>)
}