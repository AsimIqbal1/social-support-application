import { z } from 'zod';

// Personal Information Schema
export const personalInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'nameMinLength')
    .max(100, 'nameTooLong')
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, 'invalidNameFormat'),
  nationalId: z
    .string()
    .min(8, 'invalidNationalId')
    .max(15, 'invalidNationalId')
    .regex(/^[0-9]+$/, 'nationalIdNumbersOnly'),
  dateOfBirth: z
    .string()
    .min(1, 'fieldRequired')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 && age <= 120;
    }, 'invalidAge'),
  gender: z.string().min(1, 'fieldRequired').refine(
    (value) => ['male', 'female'].includes(value),
    { message: 'invalidGender' }
  ),
  address: z
    .string()
    .min(10, 'addressTooShort')
    .max(200, 'addressTooLong'),
  city: z
    .string()
    .min(2, 'cityTooShort')
    .max(50, 'cityTooLong'),
  state: z
    .string()
    .min(2, 'stateTooShort')
    .max(50, 'stateTooLong'),
  country: z
    .string()
    .min(1, 'fieldRequired'),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{7,14}$/, 'invalidPhone'),
  email: z
    .string()
    .email('invalidEmail')
    .max(100, 'emailTooLong'),
});

// Family & Financial Information Schema
export const familyFinancialSchema = z.object({
  maritalStatus: z.string().min(1, 'fieldRequired').refine(
    (value) => ['single', 'married', 'divorced', 'widowed'].includes(value),
    { message: 'invalidMaritalStatus' }
  ),
  dependents: z
    .number()
    .int('invalidNumber')
    .min(0, 'invalidDependentsRange')
    .max(20, 'invalidDependentsRange')
    .optional()
    .refine(val => val !== undefined, 'fieldRequired'),
  employmentStatus: z.string().min(1, 'fieldRequired').refine(
    (value) => ['employed', 'unemployed', 'self-employed', 'retired', 'student', 'disabled'].includes(value),
    { message: 'invalidEmploymentStatus' }
  ),
  monthlyIncome: z
    .number()
    .min(0, 'invalidIncomeRange')
    .max(1000000, 'invalidIncomeRange')
    .optional()
    .refine(val => val !== undefined, 'fieldRequired'),
  housingStatus: z.string().min(1, 'fieldRequired').refine(
    (value) => ['owned', 'rented', 'gov-housing', 'family-housing', 'temporary'].includes(value),
    { message: 'invalidHousingStatus' }
  ),
});

// Situation Description Schema
export const situationDescriptionSchema = z.object({
  currentFinancialSituation: z
    .string()
    .min(20, 'minDescriptionLength')
    .max(1000, 'maxDescriptionLength')
    .refine((val) => val.trim().length >= 20, 'minDescriptionLength'),
  employmentCircumstances: z
    .string()
    .min(20, 'minDescriptionLength')
    .max(1000, 'maxDescriptionLength')
    .refine((val) => val.trim().length >= 20, 'minDescriptionLength'),
  reasonForApplying: z
    .string()
    .min(20, 'minDescriptionLength')
    .max(1000, 'maxDescriptionLength')
    .refine((val) => val.trim().length >= 20, 'minDescriptionLength'),
});

// Combined schema for all steps (for final validation)
export const completeApplicationSchema = z.object({
  personalInfo: personalInfoSchema,
  familyFinancial: familyFinancialSchema,
  situationDescription: situationDescriptionSchema,
});

// Type exports for TypeScript
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type FamilyFinancialFormData = z.infer<typeof familyFinancialSchema>;
export type SituationDescriptionFormData = z.infer<typeof situationDescriptionSchema>;
export type CompleteApplicationFormData = z.infer<typeof completeApplicationSchema>; 