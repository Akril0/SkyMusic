import * as RadixSlider from '@radix-ui/react-slider';
import useDebounce from "@/hooks/useDebounce";
import {useEffect} from "react";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
    max?: number,
    step?: number,
}

const Slider: React.FC<SliderProps> = ({value = 1, onChange,max=1, step=0.01}) => {


    const handleChange = async (newValue: number[]) => {
        onChange?.(newValue[0]);
    };


    return (
        <RadixSlider.Root
            className="
            group
            relative
            flex
            items-center
            select-none
            touch-none
            w-full
            h-8
        "
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={max}
            step={step}
            aria-label="Volume"
        >
            <RadixSlider.Track
                className="
                    bg-blue-500
                    relative
                    grow
                    rounded-full
                    h-[3px]
                "
            >
                <RadixSlider.Range
                    className="
                        absolute
                        bg-white
                        rounded-full
                        h-full
                    "

                />
            </RadixSlider.Track>
            <RadixSlider.Thumb
                className=" opacity-0 block w-2 h-2 bg-white rounded-full focus:outline-none group-hover:opacity-100 transition"
            />
        </RadixSlider.Root>
    );
};

export default Slider;
