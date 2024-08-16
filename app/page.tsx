import AuditForm from "@/components/AuditForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const AuditPage = () => {
  return (
    <div className="bg-black min-h-screen  w-full text-white flex flex-col justify-between bg-[url('/bg.jpg')] bg-no-repeat bg-cover">
      <div>
        <Navbar />
      </div>
      <main className="mt-20 p-6    ">
        <div className="flex flex-col items-center justify-center w-full">
          <AuditForm />
        </div>
      </main>
      <div className="h-20 ">
        <Footer />
      </div>
    </div>
  );
};

export default AuditPage;
