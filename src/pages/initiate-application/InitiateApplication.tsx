import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Steps, Card, Layout } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import PersonalInfoStep from './components/PersonalInfoStep';
import FamilyFinancialStep from './components/FamilyFinancialStep';
import SituationDescriptionStep from './components/SituationDescriptionStep';
import ReviewStep from './components/ReviewStep';
import type {
  PersonalInfoFormData,
  FamilyFinancialFormData,
  SituationDescriptionFormData,
  CompleteApplicationFormData,
} from './schemas';
import { ROUTES } from '@/constants';
import { initialFormData, STORAGE_KEY } from './constants';

const { Content } = Layout;

const formRoutes = ROUTES.INITIATE_APPLICATION.children;

const InitiateApplication: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CompleteApplicationFormData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes(formRoutes.PERSONAL_INFO.subPath)) setCurrentStep(0);
    else if (path.includes(formRoutes.FAMILY_FINANCIAL.subPath)) setCurrentStep(1);
    else if (path.includes(formRoutes.SITUATION_DESCRIPTION.subPath)) setCurrentStep(2);
    else if (path.includes(formRoutes.REVIEW.subPath)) setCurrentStep(3);
    else {
      navigate(formRoutes.PERSONAL_INFO.path);
      setCurrentStep(0);
    }
  }, [location.pathname]);

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
  ], []);

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

          {/* Progress Steps */}
          <Card className="mb-6 shadow-lg rounded-lg">
            <Steps
              current={currentStep}
              direction={window.innerWidth < 768 ? 'vertical' : 'horizontal'}
              className={`${isRTL ? 'rtl' : 'ltr'}`}
              items={steps}
            />
          </Card>

          <div className="bg-white rounded-lg shadow-lg">
            <Routes>
              <Route
                path={formRoutes.PERSONAL_INFO.subPath}
                element={
                  <PersonalInfoStep
                    data={formData.personalInfo}
                    updateData={updatePersonalInfo}
                  />
                }
              />
              <Route
                path={formRoutes.FAMILY_FINANCIAL.subPath}
                element={
                  <FamilyFinancialStep
                    data={formData.familyFinancial}
                    updateData={updateFamilyFinancial}
                  />
                }
              />
              <Route
                path={formRoutes.SITUATION_DESCRIPTION.subPath}
                element={
                  <SituationDescriptionStep
                    data={formData.situationDescription}
                    updateData={updateSituationDescription}
                    familyData={formData.familyFinancial}
                  />
                }
              />
              <Route
                path={formRoutes.REVIEW.subPath}
                element={<ReviewStep formData={formData} />}
              />
            </Routes>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default InitiateApplication;
