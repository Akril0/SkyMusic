import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {IoMdClose} from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onChange,
                                         title,
                                         description,
                                         children,
                                     }) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="
          bg-gray-900/90
          backdrop-blur-sm
          fixed
          inset-0
        "
                />
                <Dialog.Content
                    className="
            fixed
            drop-shadow-md
            border-neutral-900
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            md:h-auto
            md:max-h-[85vh]
            w-full
            md:w-[90vw]
            md:max-w-[450px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            bg-blue-300
            p-[25px]
            focus:outline-none
          "
                >
                    <Dialog.Title className="text-xl text-center font-bold mb-4">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                        className="
              mb-5
              text-sm
              leading-normal
              text-center
            "
                    >
                        {description}
                    </Dialog.Description>
                    <div>{children}</div>
                    <Dialog.Close asChild>
                        <button
                            className="
                text-neutral-900
                hover:text-black
                absolute
                top-[10px]
                right-[10px]
                inlne-flex
                h-[25px]
                w-[25px]
                appearence-none
                items-center
                justify-center
                rounded-full
                focus:outline-none
              "
                        >
                            <IoMdClose/>
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
