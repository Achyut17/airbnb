'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavourite from "../hooks/useFavourite";

interface HeartbuttonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const Heartbutton: React.FC<HeartbuttonProps> = ({ listingId, currentUser }) => {
    const { hasFavourited, toggleFavourite } = useFavourite({ listingId, currentUser })
    return (
        <div className="relative hover:opacity-80 transition cursor-pointer" onClick={toggleFavourite}>
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
            <AiFillHeart size={24} className={hasFavourited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
        </div>
    )
}

export default Heartbutton