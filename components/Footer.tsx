import React from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full border-t border-slate-700 h-20 flex items-center bg-black/80">
      <div className=" flex w-full items-center justify-between px-4">
        <p className="text-2xl font-extrabold tracking-[20px] text-transparent bg-clip-text bg-gradient-to-tr from-green-500 via-blue-200 to-blue-800">
          BLENDPAD
        </p>
        <p>© 2024. All rights reserved. v0.1.08</p>
      </div>
    </div>
  );
};

export default Footer;
