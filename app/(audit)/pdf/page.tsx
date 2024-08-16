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
  BsTelegram,
  BsTwitch,
  BsTwitterX,
} from "react-icons/bs";

import { RiMailFill } from "react-icons/ri";

import { MdEmail } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PdfPage = () => {
  const pdfRef = useRef(null);

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
              <p className="text-3xl">10/07/2024 22.01.05</p>
              <p className="text-3xl flex items-center justify-center">
                SATISFACTORY (PASSED){" "}
                <BiCheck className="text-green-500" size={40} />{" "}
              </p>
            </div>
            <div className="w-full p-5 border border-slate-500 rounded-md text-center mt-40 h-40">
              <span>Contract Address:</span>{" "}
              <span> 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c</span>
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
                <p>
                  0x255d839f68eab998b7d784ed654600614718d32772414055d72
                  54038d6fd25a3
                </p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Adress:</h2>
                <p>0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Decimal:</h2>
                <p>18</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Name: </h2>
                <p>Wrapped BNB</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Type:</h2>
                <p>ERC20 Token</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Token Symbol:</h2>
                <p>WBNB</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Total Supply:</h2>
                <p>1443472.8334577547</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Contract Creator Wallet:</h2>
                <p>0x4e656459ed25bf986eea1196bc1b00665401645d</p>
              </div>
              <div className="p-5 border border-slate-500 rounded-md">
                <h2>Having Blue Check Mark?:</h2>
                <p>True</p>
              </div>
            </div>
            <div className="p-5 w-full border border-slate-500 rounded-md mt-10 h-40 text-2xl flex items-center">
              Project Description: BNB Smart Chain is an innovative solution to
              bring programmability and interoperability to BNB Beacon Chain.
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
                      <a href="https://www.bnbchain.org/">www.bnbchain.org</a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsGithub size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href="https://github.com/bnb-chain">
                        github.com/bnb-chain
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
                      <a href="https://docs.bnbchain.org">docs.bnbchain.org</a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsTwitterX size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href="https://twitter.com/BNBChain">
                        twitter.com/BNBChain
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
                      <a href="https://discord.gg/QRTQvfhADQ">
                        discord.gg/QRTQvfhADQ
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
                      <a href="https://t.me/bnbchain">t.me/bnbchain</a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <MdEmail size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href=""></a>
                    </p>
                  </div>
                </div>
                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsTwitch size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href=""></a>
                    </p>
                  </div>
                </div>

                <div className="p-5 border border-slate-500 rounded-md">
                  <div className="flex items-center justify-center flex-col">
                    <h2 className="text-3xl bg-white h-12 w-12 rounded-full flex items-center justify-center">
                      <BsLinkedin size={24} color="darkblue" />
                    </h2>
                    <p className="mt-4 text-2xl">
                      <a href=""></a>
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
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
              <ul className="text-black text-2xl">
                <li>
                  <span className="font-bold">SWC-100:</span> Function Default
                  Visibility
                </li>
                <li>
                  <span className="font-bold">Risk Level:</span> LOW
                </li>
                <li>
                  <span className="font-bold">Analysis:</span> The contract does
                  not have any functions with default visibility. All the
                  necessary functions have explicit visibility specifiers.
                </li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-lg shadow-xl min-h-60">
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
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full items-center space-y-6 h-full p-6 ">
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
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full space-y-6 h-full p-6">
          <div className="bg-black/50 p-4 rounded-xl">
            <h1 className="text-5xl font-bold text-white w-2/3 flex flex-col  mt-40 mb-40">
              Code Quality of the Contract Code
              <p className="text-white text-2xl mt-4">
                The code is well-structured and follows standard coding
                practices. Readability is good, and the use of comments is
                appropriate, helping understand the purpose and functionality of
                the contract.
              </p>
            </h1>
            <h1 className="text-5xl font-bold text-white w-full flex flex-col items-end mt-80 mb-80">
              Security Practices
              <p className="text-white text-2xl mt-4 w-3/4">
                Additional measures recommended for high-risk areas include:
                Reviewing the delegate call logic to ensure that the callee
                contract is secure. More explicit checks and use of ` safe `
                libraries to handle operations involving external calls.
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
                <li>5.1. Fee Scam Risk: No Risk</li>
                <li>5.2. Buy Redirectors: No redirections observed.</li>
                <li>
                  5.3. Transaction Fee Scam: No potential for fee increases
                  observed.
                </li>
                <li>
                  5.4. Non-Verify: Solidity version indicates likely verified
                  but not explicitly mentioned.
                </li>
                <li>
                  5.5. Changeable Fee: Not applicable in the current context.
                </li>
                <li>5.6. Imitation Token: N/A in this context.</li>
                <li>
                  5.7. Emergency Withdraw Fee: Not specified in the contract.
                </li>
                <li>5.8. Unlimited Minting: Not applicable.</li>
                <li>
                  5.9. Admin Functions: Necessary admin functions to manage
                  upgrading and administration are present.
                </li>
                <li>5.10. Transfer Freeze: No potential risk observed.</li>
                <li>
                  5.11. Blacklisting: Could potentially be abused if
                  implemented.
                </li>
                <li>
                  5.12. Ownership Transfer: Trustworthy initial owner not
                  explicitly assessed; default assumption aligns with standard.
                </li>
                <li>
                  5.13. High Slippage: No high-slippage manipulation observed.{" "}
                </li>
                <li>
                  5.14. Self-Destruct: Solidity version v0.6.0 does not reuse
                  addresses upon self-destruction.
                </li>
                <li>
                  5.15. Whitelisting: No whitelisting functions observed in the
                  contract.
                </li>
                <li>5.16. Transaction Limit Restrictions Not applicable</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[url('/bg.jpg')] bg-no-repeat bg-cover flex flex-col w-full space-y-6 h-full p-6">
          <div className="bg-black/50 p-4 rounded-xl mt-20 pb-80">
            <div className="w-full flex flex-col space-y-10 items-center justify-center">
              <h1 className="text-7xl font-bold text-white">
                Overall Assestments
              </h1>
              <h4 className="font-bold text-3xl mt-20">
                SATISFACTORY : ( PASSED )
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-40 mt-80 pb-[140px] ">
              <div className="border border-slate-100 p-6 rounded-lg text-center bg-black/60">
                <h3 className="text-2xl font-bold">
                  High Security Issues: Delegatecall to Untrusted Callee
                  (SWC-112):
                </h3>
                <p>
                  Ensure thorough review and audits of all implementation
                  contracts used with this proxy contract to mitigate potential
                  risks.
                </p>
              </div>
              <div className="border border-slate-100 p-6 rounded-lg text-center bg-black/60">
                <h3 className="text-2xl font-bold">
                  Key Areas of Concern and General Security Posture: General
                  Security Posture:
                </h3>
                <p>
                  Good The analyzed contract shows a robust initial design while
                  highlighting manageable risks mainly associated with its
                  delegate call mechanisms and administrative features.
                </p>
              </div>
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

export default PdfPage;
