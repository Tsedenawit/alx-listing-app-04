import { StaticImageData } from "next/image";
export interface PropertyProps {
    name:string;
    address:Address;
    rating:number;
    category:string[];
    price:number;
    offers:Offers;
    image:StaticImageData;
    discount:string;
}
export interface Address {
    state:string;
    city:string;
    country:string;
}
export interface Offers{
    bed:string;
    shower:string;
    occupants:string;
}