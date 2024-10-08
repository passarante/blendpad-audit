import { CodeQualityOfContractCodeData, FraudAnalysisData, PDFData, SecurityPracticesData, SwcData } from "@/types";

export const getPDFData = (completion: any): PDFData => {

    console.log("Completion", completion);
    let result: PDFData = {
        swc: [],
        codeQualityOfContractCode: "",
        securityPractices: "",
        fraudAnalysis: [],
        overallAssessment: [],
        suggestionsForImprovement: ""
    };

    result.swc = completion[0].swcData;
    result.codeQualityOfContractCode = completion[0].codeQualityOfContractCode;
    result.fraudAnalysis = completion[0].fraudAnalysis;
    result.securityPractices = completion[0].securityPractices;
    result.suggestionsForImprovement = completion[0].suggestionsForImprovement;

    // let swcArr = [
    //     "SWC-101:",
    //     "SWC-102:",
    //     "SWC-103:",
    //     "SWC-104:",
    //     "SWC-105:",
    //     "SWC-107:",
    //     "SWC-108:",
    //     "SWC-109:",
    //     "SWC-110:",
    //     "SWC-111:",
    //     "SWC-112:",
    //     "SWC-113:",
    //     "SWC-114:",
    //     "SWC-116:",
    //     "SWC-117:",
    //     "SWC-118:",
    //     "SWC-119:",
    //     "SWC-120:",
    //     "SWC-121:",
    //     "SWC-122:",
    //     "SWC-123:",
    //     "SWC-124:",
    //     "SWC-125:",
    //     "SWC-126:",
    //     "SWC-127:",
    //     "SWC-128:",
    //     "SWC-129:",
    //     "SWC-130:",
    //     "SWC-131:",
    //     "SWC-132:",
    //     "SWC-133:",
    //     "SWC-134:",
    //     "SWC-135:",
    //     "SWC-136:",
    // ];




    // for (let index = 0; index < swcArr.length; index++) {
    //     if (index == swcArr.length - 1) {
    //         getSwcData(swcArr[index], completion, result);
    //     } else {
    //         getSwcData(swcArr[index], completion, result, swcArr[index + 1]);
    //     }
    // }

    // let codeQualityOfContractCodeText: string | string[] = "";

    // if (completion.includes("Code Quality of the Contract Code")) {
    //     codeQualityOfContractCodeText = completion
    //         .split("Code Quality of the Contract Code")[1]
    //         .split("Security Practices")[0]
    //         .split("\n");
    // } else {
    //     codeQualityOfContractCodeText = completion
    //         .split("Code Quality")[1]
    //         .split("Security Practices")[0]
    //         .split("\n");
    // }

    // const securityPractices = completion
    //     .split("Security Practices")[1]
    //     .split("Fraud Analysis")[0]
    //     .split("\n");

    // const fraudAnalysis = completion
    //     .split("Fraud Analysis")[1]
    //     .split("Overall Assessment")[0]
    //     .split("\n");

    // const overallAssessment = completion.split("Overall Assessment")[1].split("\n");

    // let codeQualityOfContractCodeData: CodeQualityOfContractCodeData = {};

    // for (let index = 0; index < codeQualityOfContractCodeText.length; index++) {
    //     const item = codeQualityOfContractCodeText[index];
    //     if (item.includes("Structure:")) {
    //         codeQualityOfContractCodeData.structure = item.split("Structure:")[1];
    //     } else if (item.includes("Readability:")) {
    //         codeQualityOfContractCodeData.readability = item.split("Readability:")[1];
    //     } else if (item.includes("Comments:")) {
    //         codeQualityOfContractCodeData.comments = item.split("Comments:")[1];
    //     }
    // }
    // result.codeQualityOfContractCode.push(codeQualityOfContractCodeData);

    // let securityPracticesData: SecurityPracticesData = {};
    // for (let index = 0; index < securityPractices.length; index++) {
    //     const item = securityPractices[index];
    //     if (item.includes("Observance:")) {
    //         securityPracticesData.observance = item.split("Observance:")[1];
    //     } else if (item.includes("Additional Measures:")) {
    //         securityPracticesData.readability = item.split("Additional Measures:")[1];
    //     }
    // }
    // result.securityPractices.push(securityPracticesData);

    // for (let index = 0; index < fraudAnalysis.length; index++) {
    //     const item = fraudAnalysis[index];
    //     if (item.includes(":")) {
    //         let data: FraudAnalysisData = {};
    //         data.key = item.split(":")[0];
    //         data.value = item.split(":")[1];
    //         result.fraudAnalysis.push(data);
    //     }
    // }

    // result.overallAssessment = overallAssessment.filter((d) => d != "");

    return result;

}