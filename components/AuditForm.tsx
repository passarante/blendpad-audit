"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import axios from "axios";
import { PDFData, Token, TokenCreatorDetails, TokenDetails } from "@/types";
import { getOpenAIPrompt } from "@/actions/aopenai-actions";
import markdownToTxt from "markdown-to-txt";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getPDFData } from "@/lib/pdf-util";
import PDFDataPage from "./pdf-data";

const formSchema = z.object({
  url: z.string().url(),
});

const AuditForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [token, setToken] = useState<Token>({} as Token);
  const [markdown, setMarkdown] = useState("");
  const [pdfData, setPdfData] = useState<PDFData>({} as PDFData);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let contractAddress = values.url.split("/")[4];

    let url = `https://api.bscscan.com/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_BSC_SCAN_APIKEY}`;

    //console.log(url);
    const response = await axios.get(url);
    let sourceCode = response.data.result[0].SourceCode;
    setLoading(true);
    let tokenDetailsUrl = `https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_BSC_SCAN_APIKEY}`;
    const details = await axios.get(tokenDetailsUrl);

    let tokenCreatorsUrl = `https://api.bscscan.com/api?module=contract&action=getcontractcreation&contractaddresses=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_BSC_SCAN_APIKEY}`;

    let tokenCreators = await axios.get(tokenCreatorsUrl);

    setToken((prev) => ({
      ...prev,
      sourceCode: sourceCode,
      details: details.data.result[0] as TokenDetails,
      creatorDetails: tokenCreators.data.result[0] as TokenCreatorDetails,
    }));

    let prompt = `Analyze the given smart contract exactly according to the following format:

SWC-100: "Analyze the contract according to SWC-100 (Function Default Visibility), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-101: "Analyze the contract according to SWC-101 (Integer Overflow and Underflow), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-102: "Analyze the contract according to SWC-102 (Outdated Compiler Version), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-103: "Analyze the contract according to SWC-103 (Floating Pragma), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-104: "Analyze the contract according to SWC-104 (Unchecked Call Return Value), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-105: "Analyze the contract according to SWC-105 (Unprotected Ether Withdrawal), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-106: "Analyze the contract according to SWC-106 (Unprotected SELFDESTRUCT Instruction), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-107: "Analyze the contract according to SWC-107 (Reentrancy), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-108: "Analyze the contract according to SWC-108 (State Variable Default Visibility), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-109: "Analyze the contract according to SWC-109 (Uninitialized Storage Pointer), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-110: "Analyze the contract according to SWC-110 (Assert Violation), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-111: "Analyze the contract according to SWC-111 (Use of Deprecated Solidity Functions), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-112: "Analyze the contract according to SWC-112 (Delegatecall to Untrusted Callee), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-113: "Analyze the contract according to SWC-113 (DoS with Failed Call), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-114: "Analyze the contract according to SWC-114 (Transaction Order Dependence), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-115: "Analyze the contract according to SWC-115 (Authorization through tx.origin), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-116: "Analyze the contract according to SWC-116 (Block values as a proxy for time), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-117: "Analyze the contract according to SWC-117 (Signature Malleability), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-118: "Analyze the contract according to SWC-118 (Incorrect Constructor Name), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-119: "Analyze the contract according to SWC-119 (Shadowing State Variables), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-120: "Analyze the contract according to SWC-120 (Weak Sources of Randomness from Chain Attributes), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-121: "Analyze the contract according to SWC-121 (Missing Protection against Signature Replay Attacks), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-122: "Analyze the contract according to SWC-122 (Lack of Proper Signature Verification), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-123: "Analyze the contract according to SWC-123 (Requirement Violation), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-124: "Analyze the contract according to SWC-124 (Write to Arbitrary Storage Location), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-125: "Analyze the contract according to SWC-125 (Incorrect Inheritance Order), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-126: "Analyze the contract according to SWC-126 (Insufficient Gas Griefing), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-127: "Analyze the contract according to SWC-127 (Arbitrary Jump with Function Type Variable), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-128: "Analyze the contract according to SWC-128 (DoS With Block Gas Limit), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-129: "Analyze the contract according to SWC-129 (Typographical Error), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-130: "Analyze the contract according to SWC-130 (Right-To-Left-Override control character (U+202E)), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-131: "Analyze the contract according to SWC-131 (Presence of unused variables), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-132: "Analyze the contract according to SWC-132 (Unexpected Ether balance), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-133: "Analyze the contract according to SWC-133 (Hash Collisions With Multiple Variable Length Arguments), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-134: "Analyze the contract according to SWC-134 (Message call with hardcoded gas amount), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-135: "Analyze the contract according to SWC-135 (Code With No Effects), determine risk as No Risk, LOW, MEDIUM, or HIGH",
SWC-136: "Analyze the contract according to SWC-136 (Unencrypted Private Data On-Chain), determine risk as No Risk, LOW, MEDIUM, or HIGH",


"Code Quality of the contract code": "Is the code well-structured or not?  How is readibility and comments? (Exactly 5 sentences)",
" Security Practices": "is good security practices observed ?, is there any additional measures recommended for high-risk areas? (Exactly 3 sentences)",
"Fraud Analysis": "1) Fee Scam Risk (No Risk, Low, Medium, or High?,2) Buy Redirectors: Any redirection observed ?, 3) Transaction Fee Scam: is Potential for fee increases?, 4) Non-Verify: is Verified on BscScan? 4) Changeable Fee: are initial fees reasonable?. 5) Imitation Token: Ensure no similar named tokens. 6) Emergency Withdraw Fee: is it specified?. 7) Unlimited Minting: is fixed supply?. 8) Admin Functions: do Necessary functions present?. 9) Transfer Freeze: is Potential risk? 10) Blacklisting: Could be abused? 11) Ownership Transfer: is Trustworthy initial owner? 12) High Slippage: is there any high slippage manipulation? 13) Self-Destruct: Solidity version? 14) Whitelisting: Could be misused? 15) Transaction Limit Restrictions: is there any unreasonable restrictions?",
"Overall Assessment": "Satisfactory or not Satisfactory? (Passed or Failed?) List High Security issues if there are",
"Key areas of concern and general security posture": "is the general security posture bad, good, or excellent? dont write anyting else (Exactly 8 sentences)"

Smart Contract:
    ${sourceCode} .

Please provide the results in the following array  format for easy front - end display :

    [
{
       swcData:[
       {
       "name": "SWC-100 Function Default Visibility :",
       "analysis": "Analyse result",
       "risk": "No Risk, LOW, MEDIUM, or HIGH",
       "score":1 to 100
       },
       {
       "name": "SWC-101 Integer Overflow and Underflow:",
       "analysis": "Analyse result",
       "risk": "No Risk, LOW, MEDIUM, or HIGH",
       "score":1 to 100
       },

       ],

       "codeQualityOfContractCode": "value",
       "fraudAnalysis": [
        {
            "key": "Key",
            "value": "Value"
        },
        "overallAssessment":"value",
        "securityPractises":"value",
        "suggestionsForImprovement":"value"
  }
   
    ]


    `;

    try {
      const completion = await getOpenAIPrompt(prompt);

      //setMarkdown(completion?.choices[0].message.content!!);

      // const analysisData = getPDFData(
      //   markdownToTxt(completion?.choices[0].message.content!!)
      // );

      console.log("Completion", completion?.choices[0].message.content!!);
      const responseText = JSON.parse(
        markdownToTxt(completion?.choices[0].message.content!!)
      );

      const analysisData = getPDFData(responseText);

      setPdfData(analysisData);

      setShowPdf(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col  justify-center items-center h-screen -mt-20">
        <div className="bg-black/40 rounded-2xl h-36 flex items-center flex-col w-80 p-6 animate-pulse">
          <Image
            src={"/logo-full-web.webp"}
            width={250}
            height={50}
            alt={"logo"}
          />
          <p>Loading please wait....</p>
        </div>
      </div>
    );
  }

  const res2 = `[
  {
  "svcData":[
    {"name":"SWC-136 Unencrypted Private Data On-Chain:","analysis":"No private data stored on-chain.","risk":"No Risk","score":100}
            ]
  }
]`;

  const result = `[
  {
    "swcData":[
        {
            "name": "SWC-100 Function Default Visibility :",
            "analysis": "All functions in the contract have explicit visibility declarations.",
            "risk": "No Risk",
            "score": 100
        },
        {
            "name": "SWC-101 Integer Overflow and Underflow:",
            "analysis": "The contract uses Solidity 0.8.11, which has built-in overflow and underflow checks.",
            "risk": "No Risk",
            score: 100
        },
        {
            name: "SWC-102 Outdated Compiler Version:",
            analysis: "The contract specifies pragma solidity 0.8.11 which is relatively up-to-date.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-103 Floating Pragma:",
            analysis: "The contract uses a fixed pragma (0.8.11).",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-104 Unchecked Call Return Value:",
            analysis: "There are no raw low-level calls in the contract.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-105 Unprotected Ether Withdrawal:",
            analysis: "The contract does not have any Ether withdrawal functions.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-106 Unprotected SELFDESTRUCT Instruction:",
            analysis: "There are no selfdestruct calls in the contract.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-107 Reentrancy:",
            analysis: "No external calls made before state changes, reducing reentrancy risks.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-108 State Variable Default Visibility:",
            analysis: "State variables have explicit visibility declarations.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-109 Uninitialized Storage Pointer:",
            analysis: "No uninitialized storage pointer usage found.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-110 Assert Violation:",
            analysis: "No assert statements found.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-111 Use of Deprecated Solidity Functions:",
            analysis: "No deprecated functions used.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-112 Delegatecall to Untrusted Callee:",
            analysis: "No usage of delegatecall.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-113 DoS with Failed Call:",
            analysis: "No patterns found that could result in DoS with failed call.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-114 Transaction Order Dependence:",
            analysis: "No logic dependent on transaction order detected.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-115 Authorization through tx.origin:",
            analysis: "No usage of tx.origin for authorization.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-116 Block values as a proxy for time:",
            analysis: "No usage of block values for time.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-117 Signature Malleability:",
            analysis: "Proper ECDSA signature checks are in place.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-118 Incorrect Constructor Name:",
            analysis: "The constructor is correctly named using the constructor keyword.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-119 Shadowing State Variables:",
            analysis: "No state variables shadowing other state variables.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-120 Weak Sources of Randomness from Chain Attributes:",
            analysis: "The contract does not generate randomness.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-121 Missing Protection against Signature Replay Attacks:",
            analysis: "Nonces are used to prevent signature replay attacks.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-122 Lack of Proper Signature Verification:",
            analysis: "ECDSA signatures are properly verified.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-123 Requirement Violation:",
            analysis: "All require statements have appropriate messages.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-124 Write to Arbitrary Storage Location:",
            analysis: "No arbitrary storage writes detected.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-125 Incorrect Inheritance Order:",
            analysis: "Cardinality in inheritance order is correctly followed.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-126 Insufficient Gas Griefing:",
            analysis: "No gas griefing vulnerabilities detected.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-127 Arbitrary Jump with Function Type Variable:",
            analysis: "No function type variable found that could cause arbitrary jumps.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-128 DoS With Block Gas Limit:",
            analysis: "No logic that relies heavily on block gas limit.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-129 Typographical Error:",
            analysis: "No typographical errors detected.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-130 Right-To-Left-Override control character (U+202E):",
            analysis: "No usage of U+202E control character found in the contract.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-131 Presence of unused variables:",
            analysis: "No unused variables present in the contract.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-132 Unexpected Ether balance:",
            analysis: "No handling of Ether balances. The contract only deals with ERC20 tokens.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-133 Hash Collisions With Multiple Variable Length Arguments:",
            analysis: "No use of hash functions with multiple variable-length arguments.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-134 Message call with hardcoded gas amount:",
            analysis: "No hardcoded gas amount in message calls.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-135 Code With No Effects:",
            analysis: "Every line of code has an observable effect.",
            risk: "No Risk",
            score: 100
        },
        {
            name: "SWC-136 Unencrypted Private Data On-Chain:",
            analysis: "No private data stored on-chain.",
            risk: "No Risk",
            score: 100
        }
    
]}]`;

  return (
    <>
      {showPdf ? (
        <div>
          <PDFDataPage data={pdfData} token={token} />
        </div>
      ) : (
        <div className="w-1/2 ">
          <Card>
            <CardHeader>
              <CardTitle>Audit Form</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormField
                    name="url"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smart Contract Address</FormLabel>
                        <Input
                          {...field}
                          placeholder="eg:https://bscscan.com"
                        />
                        <FormDescription>
                          Enter the address of the smart contract you want to
                          audit
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Check</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AuditForm;
