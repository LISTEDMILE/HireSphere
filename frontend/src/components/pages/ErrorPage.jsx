import React from "react";
import NavHome from "../compo/NavHome";
import Footer from "../compo/Footer";

export default function ErrorPage() {
 
  return (
    <div className=" flex flex-col bg-black text-white items-center ">
      <NavHome />
      <h1 className="text-3xl font-bold my-6 text-center">Oo Saale</h1>
          <div className=" w-full flex flex-col justify-center gap-6 items-center">
              <h1 className="text-xl">Sharam na aari galat url dalke mje lera</h1>
              <p>Chal nikal doosre page p</p>
              <img src="/ErrorImage.png" alt="Error Image" className="h-[300px]"/>
              
    </div>
      <Footer />
    </div>
  );
}
