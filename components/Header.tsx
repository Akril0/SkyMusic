'use client';

import {useRouter} from 'next/navigation';
import {twMerge} from 'tailwind-merge';
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx';
import {HiHome} from 'react-icons/hi';
import {BiSearch} from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModal';
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useUser} from "@/hooks/useUser";
import {FaUserAlt} from "react-icons/fa";
import toast from "react-hot-toast";
import {ViewType} from "@supabase/auth-ui-shared";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({children, className}) => {
    const authModal = useAuthModal();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const {user} = useUser();

    const hahdleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        // TODO: Reset any playing songs
        router.refresh();

        if (error) {
            toast.error(error.message);
        }else{
            toast.success('Logged out!')
        }
    };

    return (
        <div
            className={twMerge(
                `
         h-fit
         bg-gradient-to-b
         from-blue-500
         p-6
      `,
                className,
            )}
        >
            <div
                className="
            w-full
            mb-4
            flex
            items-center
            justify-between
         "
            >
                <div
                    className="
            hidden
            md:flex
            gap-x-2
            items-center
         "
                >
                    <button
                        onClick={router.back}
                        className="
                 rounded-full 
                 bg-white
                 flex
                 items-center
                 justify-center
                 hover:opacity-75
                 transition
               "
                    >
                        <RxCaretLeft className="text-black" size={35}/>
                    </button>
                    <button
                        onClick={router.forward}
                        className="
                 rounded-full 
                 bg-white
                 flex
                 items-center
                 justify-center
                 hover:opacity-75
                 transition
               "
                    >
                        <RxCaretRight className="text-black" size={35}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        onClick={()=>router.push('/')}
                        className="
               rounded-full
               p-2
               bg-white
               flex
               items-center
               justify-center
               hover:opacity-75
               transition
            "
                    >
                        <HiHome className="text-black" size={20}/>
                    </button>
                    <button
                        onClick={()=>router.push('/search')}
                        className="
               rounded-full
               p-2
               bg-white
               flex
               items-center
               justify-center
               hover:opacity-75
               transition
            "
                    >
                        <BiSearch className="text-black" size={20}/>
                    </button>
                </div>
                <div
                    className="
            flex
            justify-between
            items-center
            gap-x-4
         "
                >
                    {user? (
                        <div className='flex gap-x-4 items-center'>
                            <Button
                            onClick={hahdleLogout}
                            className='bg-white text-black px-6 py-2'
                            >
                                Logout
                            </Button>
                            <Button
                            onClick={()=> router.push('/account')}
                            className='bg-white text-black'
                            >
                                <FaUserAlt/>
                            </Button>
                        </div>
                    ):(
                        <>
                            <div>
                                <Button
                                    onClick={()=>authModal.onOpen('sign_up')}
                                    className="
                  bg-transparent
                  text-white
                  font-medium
                "
                                >
                                    Sing up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={()=>authModal.onOpen('sign_in')}
                                    className="
                  bg-white
                  px-6
                  py-2
                "
                                >
                                    Sign in
                                </Button>
                            </div>
                        </>
                    )}

                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
