import React, { useState, useEffect } from 'react';
import { Steps, Card, Layout } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/hooks/useLanguage';
import PersonalInfoStep from './components/PersonalInfoStep';
import FamilyFinancialStep from './components/FamilyFinancialStep';
import SituationDescriptionStep from './components/SituationDescriptionStep';
import ReviewStep from './components/ReviewStep';
import type { 
  PersonalInfoFormData, 
  FamilyFinancialFormData, 
  SituationDescriptionFormData,
  CompleteApplicationFormData
} from './schemas';

const { Content } = Layout;

const initialFormData: CompleteApplicationFormData = {
  personalInfo: {
    name: '',
    nationalId: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    email: '',
  },
  familyFinancial: {
    maritalStatus: 'single',
    dependents: '0',
    employmentStatus: 'unemployed',
    monthlyIncome: '0',
    housingStatus: 'rented',
  },
  situationDescription: {
    currentFinancialSituation: '',
    employmentCircumstances: '',
    reasonForApplying: '',
  },
};

const InitiateApplication: React.FC = () => {
  console.log("InitiateApplication");
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CompleteApplicationFormData>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('applicationFormData');
    return saved ? JSON.parse(saved) : initialFormData;
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
  }, [formData]);

  // Update current step based on route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/personal-info')) setCurrentStep(0);
    else if (path.includes('/family-financial')) setCurrentStep(1);
    else if (path.includes('/situation-description')) setCurrentStep(2);
    else if (path.includes('/review')) setCurrentStep(3);
    else {
      // Default to first step
      navigate('/initiate-application/personal-info');
      setCurrentStep(0);
    }
  }, [location.pathname, navigate]);

  const updatePersonalInfo = (data: Partial<PersonalInfoFormData>) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  };

  const updateFamilyFinancial = (data: Partial<FamilyFinancialFormData>) => {
    setFormData(prev => ({
      ...prev,
      familyFinancial: { ...prev.familyFinancial, ...data }
    }));
  };

  const updateSituationDescription = (data: Partial<SituationDescriptionFormData>) => {
    setFormData(prev => ({
      ...prev,
      situationDescription: { ...prev.situationDescription, ...data }
    }));
  };

  const steps = [
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
  ];

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Content className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {t('applicationTitle')}
            </h1>
            <p className="text-gray-600">
              {t('applicationSubtitle')}
            </p>
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

          {/* Step Content */}
          <div className="bg-white rounded-lg shadow-lg">
            <Routes>
              <Route
                path="personal-info"
                element={
                  <PersonalInfoStep
                    data={formData.personalInfo}
                    updateData={updatePersonalInfo}
                  />
                }
              />
              <Route
                path="family-financial"
                element={
                  <FamilyFinancialStep
                    data={formData.familyFinancial}
                    updateData={updateFamilyFinancial}
                  />
                }
              />
              <Route
                path="situation-description"
                element={
                  <SituationDescriptionStep
                    data={formData.situationDescription}
                    updateData={updateSituationDescription}
                  />
                }
              />
              <Route
                path="review"
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