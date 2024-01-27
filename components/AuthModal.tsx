'use client';

import {
    useSessionContext,
    useSupabaseClient,
} from '@supabase/auth-helpers-react';
import {useRouter} from 'next/navigation';
import {Auth} from '@supabase/auth-ui-react';

import Modal from './Modal';
import {ThemeSupa, ViewType} from '@supabase/auth-ui-shared';
import useAuthModal from '@/hooks/useAuthModal';
import React, {useEffect} from 'react';

const viewToMessageMap: { id: ViewType; title: string }[] = [
    {id: 'sign_in', title: 'Sign In'},
    {id: 'sign_up', title: 'Sign Up'},
    {id: 'magic_link', title: 'Magic Link'},
    {id: 'forgotten_password', title: 'Forgotten Password'},
    {id: 'update_password', title: 'Update Password'},
    {id: 'verify_otp', title: 'Verify Otp'},
];

interface AuthLinksProps{
    linkArr:{id:ViewType, title: string}[]
}

const AuthLinks:React.FC<AuthLinksProps>=({linkArr})=>{
    const {setView} = useAuthModal();
    return(
        <>
            {linkArr.map((link, index)=>(
                    <p key={index} className='
                    text-sm
                    text-gray-50
                    hover:text-neutral-500
                    text-center
                    cursor-pointer
                    underline
                    font-sans'
                    onClick={()=>setView(link.id)}
                    >
                        {link.title}
                    </p>)

            )}
        </>
    )
}

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose, isOpen, view} = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }

    };

    return (
        <Modal
            title="Welcome back"
            description={`${viewToMessageMap.find(vw => vw.id === view)?.title} to your account`}
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth

                view={view}
                theme="light"
                providers={['github']}
                supabaseClient={supabaseClient}
                showLinks={false}
                magicLink
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: 'rgb(249 250 251)',
                                brandAccent: 'rgb(59,130,236)',
                                brandButtonText: 'rgb(23,23,23)',
                                defaultButtonText: 'rgb(23,23,23)',
                                inputLabelText: 'rgb(23,23,23)',
                                inputPlaceholder: 'rgb(23,23,23)',
                                inputText: 'rgb(23,23,23)',
                                inputBorderFocus: 'rgb(59,130,236)',
                                inputBorderHover: 'rgb(59,130,236)',
                            },
                        },
                    },
                }}
            />
            <div className='flex flex-col gap-y-2'>
                {view === 'sign_up' && (

                    <AuthLinks linkArr={[
                        {
                            id:"sign_in",
                            title: 'Already have an account? Sign in'
                        }
                    ]}/>

                )}
                {view === 'sign_in' && (
                    <AuthLinks linkArr={[
                        {
                            id:'magic_link',
                            title:'Send a magic link email'
                        },
                        {
                            id:"forgotten_password",
                            title: 'Forgot your password?'
                        },
                        {
                            id:"sign_up",
                            title: 'Don\'t have an account? Sign up'
                        },

                    ]}/>
                )
                }
                {view === 'forgotten_password' && (
                    <AuthLinks linkArr={[
                        {
                            id:"sign_in",
                            title: 'Already have an account? Sign in'
                        }
                    ]}/>
                )
                }
                {view === 'magic_link' && (
                    <AuthLinks linkArr={[
                        {
                            id:"sign_in",
                            title: 'Already have an account? Sign in'
                        }
                    ]}/>
                )
                }
            </div>
        </Modal>
    );
};

export default AuthModal;
