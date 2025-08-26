import React, { useMemo, useState } from 'react';
import { Steps, Card, Layout, Button, Modal } from 'antd';
import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { ROUTES } from '@/constants';
import PersonalInfoStep from './components/PersonalInfoStep';
import FamilyFinancialStep from './components/FamilyFinancialStep';
import SituationDescriptionStep from './components/SituationDescriptionStep';
import ReviewStep from './components/ReviewStep';
import { useFormSteps, STEP_INDICES } from './hooks/useFormSteps';
import type { FamilyFinancialFormData, PersonalInfoFormData, SituationDescriptionFormData } from './schemas';

const { Content } = Layout;

const InitiateApplication: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const [showExitModal, setShowExitModal] = useState(false);
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    goToStep,
    updatePersonalInfo,
    updateFamilyFinancial,
    updateSituationDescription,
    resetForm,
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

  const handleExitApplication = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    resetForm();
    setShowExitModal(false);
    navigate(ROUTES.HOME.path);
  };

  const cancelExit = () => {
    setShowExitModal(false);
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

          {/* Exit Application Button */}
          <div className="mt-6">
            <Button
              type="text"
              danger
              icon={<LogoutOutlined />}
              onClick={handleExitApplication}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-200"
              size="large"
              aria-label={t('exitApplicationAriaLabel')}
            >
              {t('exitApplication')}
            </Button>
          </div>
        </div>

        {/* Exit Confirmation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <ExclamationCircleOutlined className="text-orange-500" />
              {t('confirmExitTitle')}
            </div>
          }
          open={showExitModal}
          onOk={confirmExit}
          onCancel={cancelExit}
          okText={t('yesExit')}
          cancelText={t('cancel')}
          okButtonProps={{
            danger: true,
            className: 'bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700',
          }}
          cancelButtonProps={{
            className: 'border-gray-300 hover:border-gray-400',
          }}
          aria-labelledby="exit-modal-title"
          aria-describedby="exit-modal-content"
        >
          <div id="exit-modal-content" className="py-4">
            <p className="mb-4 text-gray-700">
              {t('confirmExitMessage')}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <ExclamationCircleOutlined className="text-yellow-600 text-lg mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium text-sm">
                    {t('exitWarningTitle')}
                  </p>
                  <p className="text-yellow-700 text-sm mt-1">
                    {t('exitWarningMessage')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default InitiateApplication;
