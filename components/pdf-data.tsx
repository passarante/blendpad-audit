"use client";
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BiCheck } from "react-icons/bi";
import {
  BsBook,
  BsDiscord,
  BsGithub,
  BsGlobe,
  BsLinkedin,
  BsSlack,
  BsTelegram,
  BsTwitch,
  BsTwitterX,
} from "react-icons/bs";

import { RiMailFill } from "react-icons/ri";

import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PDFData, Token } from "@/types";

type PDFDataPageProps = {
  data: PDFData;
  token: Token;
};

const PDFDataPage = ({ data, token }: PDFDataPageProps) => {
  const pdfRef = useRef(null);

  console.log("Data", data);
  const downloadPDF = () => {
    const element = pdfRef.current;
    if (element) {
      html2canvas(element).then((canvas) => {
        // const imgData = canvas.toDataURL("image/png");
        // const pdf = new jsPDF("l", "mm", "a4", true);
        // const pdfWidth = pdf.internal.pageSize.getWidth();
        // const pdfHeight = pdf.internal.pageSize.getHeight();
        // const imgWidth = canvas.width;
        // const imgHeight = canvas.height;
        // const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        // const imgX = (pdfWidth - imgWidth * ratio) / 2;
        // const imgY = 30;
        // pdf.addImage(
        //   imgData,
        //   "PNG",
        //   imgX,
        //   imgY,
        //   imgWidth * ratio,
        //   imgHeight * ratio
        // );

        // pdf.save("download.pdf");

        const imgWidth = 297;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF("l", "mm");
        doc.addImage(
          canvas,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            canvas,
            "PNG",
            0,
            position,
            imgWidth,
            imgHeight,
            "",
            "FAST"
          );
          heightLeft -= pageHeight;
        }
        doc.save("download.pdf");
      });
    }
  };
  return (
    <div className="w-full h-full bg-black">
      <div
        className="flex flex-col w-full min-h-screen text-white  "
        ref={pdfRef}
      >
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6  p-6">
          <div className="bg-black/90 opacity-90 w-full flex flex-col  items-center justify-between  ">
            <div className="w-full  border border-slate-500 rounded-md p-5 h-40">
              <Image
                src="/logo-full-web.webp"
                width={250}
                height={100}
                alt="logo"
              />
            </div>
            <div className="text-center mt-40 flex flex-col space-y-10">
              <h1 className="text-5xl text-blue-300 font-bold">
                Smart Contract Audit Report by Blendpad AI Audit Dapp
              </h1>
              <p className="text-3xl">{new Date().toLocaleDateString()}</p>
              <p className="text-3xl flex items-center justify-center">
                SATISFACTORY (PASSED){" "}
                <BiCheck className="text-green-500" size={40} />{" "}
              </p>
            </div>
            <div className="w-full p-5 border border-slate-500 rounded-md text-center mt-40 h-40">
              <span>Contract Address:</span>{" "}
              <span> {token.creatorDetails?.contractAddress} </span>
            </div>
            <div className="w-full p-5 border border-slate-500 rounded-md flex items-center justify-between mt-40 h-40 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center  justify-center">
                  <BsGlobe size={24} color="darkblue" />
                </div>
                <span> https://blendpad.com</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center  justify-center">
                  <BsTwitterX size={24} color="darkblue" />
                </div>
                <span> https://x.com/blendpad</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center  justify-center">
                  <BsTelegram size={24} color="darkblue" />
                </div>
                <span> https://t.me/BlendPadCom</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center  justify-center">
                  <RiMailFill size={24} color="darkblue" />
                </div>
                <span> business@blendpad.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6 h-full p-6  ">
          <div className="bg-black/90 opacity-90 w-full flex flex-col  items-center justify-between ">
            <div className="w-full p-5 border border-slate-500 rounded-md flex items-center justify-center">
              <h2 className="text-4xl font-bold text-blue-300">
                Contract Details
              </h2>
            </div>
            <div className="w-full  p-5 border border-slate-500 rounded-md grid grid-cols-2 gap-10 mt-20 h-[800px] ">
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Files</h2>
                <p>first.sol,second.sol</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Creation TX Hash:</h2>
                <p>{token.creatorDetails?.txHash}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Adress:</h2>
                <p>{token.creatorDetails?.contractAddress}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Decimal:</h2>
                <p>{token.details?.divisor}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Name: </h2>
                <p>{token.details?.tokenName}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Type:</h2>
                <p>{token.details?.tokenType}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Symbol:</h2>
                <p>{token.details?.symbol}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Total Supply:</h2>
                <p>{token.details?.tokenPriceUSD}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Creator Wallet:</h2>
                <p>{token.creatorDetails?.contractCreator}</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Having Blue Check Mark?:</h2>
                <p className="capitalize">{token.details?.blueCheckmark}</p>
              </div>
            </div>
            <div className="p-5 w-full border border-slate-500 rounded-md mt-10 h-40 text-2xl flex items-center">
              Project Description: {token.details?.description}
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6 h-full p-6 ">
          <div className="bg-black/90 opacity-90 w-full my-60">
            <div className="w-full p-5 border border-slate-500 rounded-md flex flex-col space-y-10 items-center justify-center">
              <h2 className="text-5xl font-bold text-white">Pages</h2>
              <div className="w-full p-5 rounded-md grid grid-cols-3 gap-y-40 gap-x-20 mt-20">
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsGlobe size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.website}>
                        {token.details?.website}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsGithub size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.github}>
                        {token.details?.github}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsBook size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.blog}>{token.details?.blog}</a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsTwitterX size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.twitter}>
                        {token.details?.twitter}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsDiscord size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.discord}>
                        {token.details?.discord}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsTelegram size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href={token.details?.telegram}>
                        {token.details?.telegram}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <MdEmail size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href="">{token.details?.email}</a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsSlack size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href="">{token.details?.slack}</a>
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsLinkedin size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href="">{token.details?.linkedin}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6 h-full p-6 ">
          <div className="bg-black/50 p-4 rounded-xl my-10">
            <h2 className="text-4xl font-bold">SWC Categories Analysis</h2>
          </div>
          <div className="w-full gap-x-40 gap-y-16 grid grid-cols-2  ">
            {data.swc.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60"
              >
                <ul className="text-black text-2xl">
                  <li className="font-bold">{item.name}</li>
                  <li>
                    <span className="font-bold">Risk Level:</span> {item.risk}
                  </li>
                  <li>
                    <span className="font-bold">Analysis:</span> {item.analysis}
                  </li>
                </ul>
              </div>
            ))}
            {/* <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-101:</span> Integer Overflow
                  and Underflow
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>The contract does
                  not perform arithmetic operations on integers that could
                  result in overflow or underflow errors.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-102:</span> Outdated Compiler
                  Version
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> LOW
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> The contract uses
                  Solidity ^0.6.0 which is outdated. It&apos;s recommended to
                  use a more recent version to leverage updates and fixes
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-103:</span> Floating Pragma
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> MEDIUM
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>The pragma
                  directive (`^0.6.0`) is floating, which means the contract
                  could be compiled with any compiler version compatible with
                  0.6.0. Locking the compiler version eliminates some security
                  risks.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-104:</span> Unchecked Call
                  Return Value
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> LOW
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> : There are
                  explicit checks for certain calls (for example in
                  `constructor` of `UpgradeableProxy` and
                  `TransparentUpgradeableProxy`), ensuring the delegate calls
                  succeed.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-105:</span> Unprotected Ether
                  Withdrawal
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> LOW
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>The contract
                  contains `payable` fallback and receive functions, but there
                  are no specific withdrawal functions defined in the provided
                  contract code.
                </li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6 h-full p-6 ">
          <div className="bg-black/50 p-4 rounded-xl mt-40">
            <h2 className="text-4xl font-bold">SWC Categories Analysis</h2>
          </div>
          <div className="w-full gap-x-40 gap-y-10 grid grid-cols-2  pb-40 ">
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-106:</span> Unprotected
                  SELFDESTRUCT Instruction
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>There are no
                  `selfdestruct` calls in the contract.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-107:</span> Reentrancy
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> MEDIUM
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> Function calls
                  like `_delegate` in proxy contracts could be susceptible to
                  reentrancy attacks if not handled properly in the underlying
                  implementation contracts.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-108:</span> State Variable
                  Default Visibility
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>All state
                  variables have proper visibility specified.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-109:</span> Uninitialized
                  Storage Pointer
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> There are no
                  uninitialized storage pointers in the contract.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-110:</span> Assert Violation
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> : No use of the
                  `assert` function in the provided code.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-111:</span> Use of Deprecated
                  Solidity Functions
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> No Risk
                </li>
                <li>
                  <span className="font-bold">Analysis:</span>There are no
                  deprecated functions used in the provided Solidity version
                  (0.6).
                </li>
              </ul>
            </div>
          </div>
        </div> */}
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full space-y-6 h-full p-6">
          <div className="bg-black/50 p-4 rounded-xl">
            <h1 className="text-5xl font-bold text-white w-2/3 flex flex-col  mt-40 mb-40">
              Code Quality of the Contract Code
              <p className="text-white text-2xl mt-4">
                {data.codeQualityOfContractCode}
              </p>
              <p className="text-white text-2xl mt-4">
                {/* Readability: {data.codeQualityOfContractCode[0].readability} */}
              </p>
              <p className="text-white text-2xl mt-4">
                {/* Comments: {data.codeQualityOfContractCode[0].comments} */}
              </p>
            </h1>
            <h1 className="text-5xl font-bold text-white w-full flex flex-col items-end mt-80 mb-80">
              Security Practices
              <p className="text-white text-2xl mt-4 w-3/4">
                {data.securityPractices}
              </p>
              <p className="text-white text-2xl mt-4 w-3/4">
                Suggestions Fro Improvement:{data.suggestionsForImprovement}
              </p>
            </h1>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full space-y-6 h-full p-6">
          <div className="bg-black/50 p-4 rounded-xl mt-20">
            <div className="flex w-full items-center justify-center">
              <h1 className="text-5xl font-bold text-blue-300">
                Fraud Analysis
              </h1>
            </div>
            <div>
              <ul className="bg-black/50 rounded-lg shadow-xl mt-20  p-6 border border-slate-100 space-y-8 text-lg">
                {data.fraudAnalysis.map((item, index) => (
                  <li key={index}>
                    <span>{`5.${index + 1} `}</span>
                    <span>{item.key}:</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full space-y-6 h-full p-6">
          <div className="bg-black/50 p-4 rounded-xl mt-20 pb-80">
            <div className="w-full flex flex-col space-y-10 items-center justify-center">
              <h1 className="text-7xl font-bold text-white">
                Suggestion For Improvement
              </h1>
              <h4 className="font-bold text-3xl mt-20">
                {data.suggestionsForImprovement}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full flex items-center justify-center bg-black pb-10">
        <Button onClick={downloadPDF}>Save</Button>
      </div>
    </div>
  );
};

export default PDFDataPage;
