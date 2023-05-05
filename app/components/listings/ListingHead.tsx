'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import Heartbutton from "../Heartbutton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({ id, imageSrc, locationValue, title, currentUser }) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue)
    return (
        <>
            <Heading title={title} subtitle={`${location?.region},${location?.label}`} />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image alt="Image" src={imageSrc ? imageSrc : 'https://picsum.photos/270?random=1'} fill className="object-cover w-full" />
                <div className="absolute top-5 right-5">
                    <Heartbutton listingId={id} currentUser={currentUser} />
                </div>
            </div>
        </>
    )
}

export default ListingHead