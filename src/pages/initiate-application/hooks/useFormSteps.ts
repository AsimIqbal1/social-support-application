import { useState, useCallback, useEffect, useMemo } from 'react';
import type {
  CompleteApplicationFormData,
  PersonalInfoFormData,
  FamilyFinancialFormData,
  SituationDescriptionFormData,
} from '../schemas';
import { initialFormData, STORAGE_KEY } from '../constants';

export interface UseFormStepsReturn {
  currentStep: number;
  formData: CompleteApplicationFormData;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfoFormData>) => void;
  updateFamilyFinancial: (data: Partial<FamilyFinancialFormData>) => void;
  updateSituationDescription: (data: Partial<SituationDescriptionFormData>) => void;
  resetForm: () => void;
}

const TOTAL_STEPS = 4;
const STEP_INDICES = {
  PERSONAL_INFO: 0,
  FAMILY_FINANCIAL: 1,
  SITUATION_DESCRIPTION: 2,
  REVIEW: 3,
} as const;

export const useFormSteps = (): UseFormStepsReturn => {
  const [formData, setFormData] = useState<CompleteApplicationFormData>(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialFormData;
  });

  const [currentStep, setCurrentStep] = useState<number>(STEP_INDICES.PERSONAL_INFO);

  const saveData = useMemo(
    () => (data: CompleteApplicationFormData) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, []);

  useEffect(() => {
    saveData(formData);
  }, [formData]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS - 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < TOTAL_STEPS) {
      setCurrentStep(step);
    }
  }, []);

  const updatePersonalInfo = useCallback((data: Partial<PersonalInfoFormData>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  }, []);

  const updateFamilyFinancial = useCallback((data: Partial<FamilyFinancialFormData>) => {
    setFormData(prev => ({
      ...prev,
      familyFinancial: { ...prev.familyFinancial, ...data },
    }));
  }, []);

  const updateSituationDescription = useCallback((
    data: Partial<SituationDescriptionFormData>
  ) => {
    setFormData(prev => ({
      ...prev,
      situationDescription: { ...prev.situationDescription, ...data },
    }));
  }, []);

  const resetForm = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    updatePersonalInfo,
    updateFamilyFinancial,
    updateSituationDescription,
    resetForm,
  };
};

export { STEP_INDICES }; 