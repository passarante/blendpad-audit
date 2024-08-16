import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-black/90 border-b border-slate-700 shadow-md h-28 p-6 fixed top-0 w-full flex items-center justify-between">
      <Image src={"/logo-full-web.webp"} width={250} height={50} alt={"logo"} />
      <span>
        <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-500 via-blue-200 to-blue-800">
          Smart Contract Audit with AI
        </h4>
      </span>
    </div>
  );
};

export default Navbar;
