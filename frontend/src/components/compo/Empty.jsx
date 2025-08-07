import { RocketFlames } from "./anima";
import React from "react";

export default function Empty() {
    return (
        <div className=" flex flex-col gap-12">
        <div className="rotate-90">
        <img
                    src="/Rocket.png"
                    alt="Rocket"
                    className=" h-[300px] w-auto object-cover opacity-100 filter drop-shadow-[0_-50px_15px_yellow]"
                  />
            <RocketFlames />
            
        </div>
            <p className="text-white text-2xl"> Haven't Uploaded anything ...</p>
            </div>
       
    )
}