import type { CompleteApplicationFormData } from "./schemas";

export const initialFormData: CompleteApplicationFormData = {
    personalInfo: {
        name: '',
        nationalId: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: '',
    },
    familyFinancial: {
        maritalStatus: '',
        dependents: undefined,
        employmentStatus: '',
        monthlyIncome: undefined,
        housingStatus: '',
    },
    situationDescription: {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
    },
};

export const STORAGE_KEY = 'applicationFormData';