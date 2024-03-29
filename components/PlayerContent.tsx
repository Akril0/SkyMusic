'use client';
import {Song} from "@/types";
import React, {useEffect, useState} from "react";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import {BsPauseFill, BsPlayFill} from "react-icons/bs";
import {AiFillStepBackward, AiFillStepForward} from "react-icons/ai";
import {HiSpeakerWave, HiSpeakerXMark} from "react-icons/hi2";
import Slider from "@/components/Slider";
import usePlayer from "@/hooks/usePlayer";
// @ts-ignore
import useSound from "use-sound";
import useDebounce from "@/hooks/useDebounce";

interface PlayerContentProps {
    song: Song,
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({song, songUrl}) => {

    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
    const [currTime, setCurrTime] = useState({
        min: '00',
        sec: '00',
    });

    const [seconds, setSeconds] = useState();


    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        return player.setId(nextSong);
    };

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        return player.setId(previousSong);
    };

    const [play, {pause, duration ,sound}] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
    });

    useEffect(() => {
        sound?.play();
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60).toString().padStart(2, '0');
                const sec = Math.floor(sound.seek([]) % 60).toString().padStart(2, '0');
                setCurrTime({
                    min,
                    sec,
                });
            }
        }, 1000);


        return () => {
            sound?.unload();
            clearInterval(interval);
        };
    }, [sound]);
    

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = ()=>{
        if(volume===0){
            setVolume(1)
        }else {
            setVolume(0)
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div
                className="
                    flex
                    w-full
                    justify-start
                "
            >
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song}/>
                    <LikeButton songId={song.id}/>
                </div>
            </div>
            <div className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
            ">
                <div
                    onClick={handlePlay}
                    className="
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    p-1
                    cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>
            <div className='
                    hidden
                    md:flex
                    flex-col
                    w-full
                    justify-center
                    items-center
                '>
                <div
                    className="

                md:flex
                justify-center
                items-center
                w-full
                max-w-[722px]
                gap-x-6
            ">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={28}
                        className="
                         text-gray-200
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                    />
                    <div
                        onClick={handlePlay}
                        className="
                    flex
                    items-center
                    justify-center
                    h-8
                    w-8
                    rounded-full
                    bg-neutral-200
                    p-1
                    cursor-pointer
                ">
                        <Icon size={28} className="text-black"/>
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={28}
                        className="
                        text-gray-200
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                    />
                </div>
                <div
                    className='
                        w-full
                        flex
                        justify-center
                        items-center
                        gap-x-2
                        text-white
                    '>
                    <Slider value={seconds} onChange={(value)=>sound.seek([value])} max={duration / 1000} step={1}/>
                    <div className='
                        text-sm
                    '>
                        {currTime.min}:{currTime.sec}
                    </div>
                </div>
            </div>


            <div className="
                hidden
                md:flex
                w-full
                justify-end
                pr-2
            ">
                <div
                    className="flex items-center gap-x-2 w-[120px]"
                >
                    <VolumeIcon
                        onClick={toggleMute}
                        size={34}
                        className="cursor-pointer text-white"
                    />
                    <Slider
                        value={volume}
                        onChange={(value)=> setVolume(value)}
                    />
                </div>
            </div>

        </div>
    );
};

export default PlayerContent;
