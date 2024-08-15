export interface Token {
    sourceCode?: string;
    details?: TokenDetails;
    creatorDetails?: TokenCreatorDetails

}

export interface TokenCreatorDetails {
    contractAddress: string
    contractCreator: string
    txHash: string
}

export interface TokenDetails {
    bitcointalk: string;
    blog: string;
    blueCheckmark: boolean;
    contractAddress: string;
    description: string;
    discord: string;
    divisor: string;
    email: string;
    facebook: string;
    github: string;
    linkedin: string;
    reddit: string;
    slack: string;
    symbol: string;
    telegram: string;
    tokenName: string;
    tokenPriceUSD: string;
    twitter: string;
    website: string;
    wechat: string;
    whitepaper: string;
}

export interface PDFData {
    svc: SwcData[],
    codeQualityOfContractCode: string,
    securityPractices: string,
    fraudAnalysis: FraudAnalysisData[],
    overallAssessment: string[],
    suggestionsForImprovement: string
}

export interface SwcData {
    description?: string;
    name?: string;
    analysis?: string;
    risk?: string
}

export interface CodeQualityOfContractCodeData {
    structure?: string;
    readability?: string;
    comments?: string
}

export interface SecurityPracticesData {
    observance?: string;
    readability?: string;
}

export interface FraudAnalysisData {
    key?: string;
    value?: string;
}

