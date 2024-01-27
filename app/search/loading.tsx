"use client"

import Box from "@/components/Box";
import {BounceLoader} from "react-spinners";

const Loading = () => {
    return (
        <Box className='h-full flex items-center justify-center'>
            <BounceLoader color='rgb(59,130,236)' size={40}/>
        </Box>
    );
};

export default Loading;
