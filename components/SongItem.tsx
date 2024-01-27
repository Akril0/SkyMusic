"use client";

import {Song} from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "@/components/PlayButton";

interface SongItemProps {
    data: Song,
    onClick: (id: string) => void;
}

const SongItem:React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={()=>onClick(data.id)}
            className='
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-blue-500/30
                cursor-pointer
                hover:bg-blue-500/20
                transition
                p-3
            '
        >
            <div
                className='
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                '
            >
                <Image src={imagePath || '/image/liked.png'}
                       className='object-cover'
                       fill
                       alt="Image"
                />
            </div>
            <div className='flex flex-col items-start w-full pt-4 gap-y-1'>
                <p className='font-semibold truncate w-full'>
                    {data.title}
                </p>
                <p className='
                    text-neutral-900
                    text-sm
                    pb-4
                    w-full
                    truncate
                '>
                    By {data.author}
                </p>
            </div>
            <div
                className='
                    absolute
                    bottom-24
                    right-5
                '
            >
                <PlayButton/>
            </div>
        </div>
    );
};

export default SongItem;
