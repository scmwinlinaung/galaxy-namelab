export interface Package {
  _id: string;
  categoryCode: string;
  categoryName: string;
  path: {
    code: string;
    name: string;
    description: string;
  };
  plan: {
    code: string;
    name: string;
    isPopular: boolean;
  };
  price: {
    amount: number;
    currency: string;
  };
  deliverables: {
    generatedNames: number;
  };
  submissionPolicy: {
    totalSubmissions: number | string;
    maxNamesPerSubmission: number | string;
    submissionFormat: string;
    submissionWindowDays?: number;
  };
  expectedOutcome: string;
  description: string;
  displayOrder: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export enum PackageCategory {
  BUSINESS_NAMING_SOLUTIONS = 'Business Naming Solutions',
  PERSONAL_NICKNAME_SOLUTIONS = 'Personal & Nickname Solutions'
}

export type PackagePath = 'The Signature Series' | 'The Cosmic Validator Series' | '';