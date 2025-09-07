import React from "react";
import { PropertyProps } from "@/interfaces";
import { PROPERTYLISTINGSAMPLE } from "@/constants";
import image1 from "@/public/Images/one.png"
import Image from "next/image";
const Header: React.FC = ()=>{
    return(
        <div>
            <nav>
               <ul>
                <li>Rooms</li>
                <li>Mansion</li>
                <li>Countryside</li>
                <li>Villa</li>
                <li>Tropical</li>
               </ul>
            </nav>
            <div>
            </div>
           <div className="grid grid-cols-3 gap-5">
  {PROPERTYLISTINGSAMPLE.map((data: PropertyProps, index) => (
    <div key={index} className="flex flex-col items-center border p-4 rounded">
        <Image src={data.image} alt="Description of image" width={400} height={300} />
      <h1 className="text-lg font-semibold">{data.name}</h1>
    </div>
  ))}
</div>

           
        </div>
    )
}
export default Header;