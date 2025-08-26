import React, { useMemo } from 'react';
import { Steps, Card, Layout } from 'antd';
import { useLanguage } from '@/i18n';
import PersonalInfoStep from './components/PersonalInfoStep';
import FamilyFinancialStep from './components/FamilyFinancialStep';
import SituationDescriptionStep from './components/SituationDescriptionStep';
import ReviewStep from './components/ReviewStep';
import { useFormSteps, STEP_INDICES } from './hooks/useFormSteps';
import type { FamilyFinancialFormData, PersonalInfoFormData, SituationDescriptionFormData } from './schemas';

const { Content } = Layout;

const InitiateApplication: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updatePersonalInfo,
    updateFamilyFinancial,
    updateSituationDescription,
  } = useFormSteps();

  const steps = useMemo(() => [
    {
      title: t('stepPersonalInfo'),
      description: t('stepPersonalInfoDesc'),
    },
    {
      title: t('stepFamilyFinancial'),
      description: t('stepFamilyFinancialDesc'),
    },
    {
      title: t('stepSituationDescription'),
      description: t('stepSituationDescriptionDesc'),
    },
    {
      title: t('stepReview'),
      description: t('stepReviewDesc'),
    },
  ], [t]);

  const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
    updatePersonalInfo(data);
    nextStep();
  };

  const handleFamilyFinancialSubmit = (data: FamilyFinancialFormData) => {
    updateFamilyFinancial(data);
    nextStep();
  };

  const handleSituationDescriptionSubmit = (data: SituationDescriptionFormData) => {
    updateSituationDescription(data);
    nextStep();
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep) {
      goToStep(step);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEP_INDICES.PERSONAL_INFO:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
          />
        );
      
      case STEP_INDICES.FAMILY_FINANCIAL:
        return (
          <FamilyFinancialStep
            data={formData.familyFinancial}
            onSubmit={handleFamilyFinancialSubmit}
            onBack={prevStep}
          />
        );
      
      case STEP_INDICES.SITUATION_DESCRIPTION:
        return (
          <SituationDescriptionStep
            data={formData.situationDescription}
            onSubmit={handleSituationDescriptionSubmit}
            onBack={prevStep}
            familyData={formData.familyFinancial}
          />
        );
      
      case STEP_INDICES.REVIEW:
        return (
          <ReviewStep
            formData={formData}
            onBack={prevStep}
            onEdit={goToStep}
          />
        );
      
      default:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onSubmit={handlePersonalInfoSubmit}
          />
        );
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50 pt-20">
      <Content className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {t('applicationTitle')}
            </h1>
            <p className="text-gray-600">{t('applicationSubtitle')}</p>
          </div>

          <Card className="mb-6 shadow-lg rounded-lg">
            <Steps
              current={currentStep}
              direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
              className={`${isRTL ? 'rtl' : 'ltr'}`}
              items={steps}
              onChange={handleStepClick}
            />
          </Card>

          <div className="bg-white rounded-lg shadow-lg">
            {renderCurrentStep()}
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default InitiateApplication;
