export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  path: string;
  isPopular: boolean;
  deliverables: string;
  submissionLimit: number;
  submissionDurationDays: number;
  expectedOutcome: string;
}

export enum PackageCategory {
  BUSINESS_NAMING_SOLUTIONS = 'Business Naming Solutions',
  PERSONAL_NICKNAME_SOLUTIONS = 'Personal & Nickname Solutions'
}

export type PackagePath = 'The Signature Series' | 'The Cosmic Validator Series' | '';