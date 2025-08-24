import React, { useState } from 'react';
import { Form, Input, Button, Card, Space, Row, Col } from 'antd';
import { FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { TextArea } = Input;

interface SituationDescriptionData {
  currentFinancialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

interface SituationDescriptionStepProps {
  data: SituationDescriptionData;
  updateData: (data: Partial<SituationDescriptionData>) => void;
}

const SituationDescriptionStep: React.FC<SituationDescriptionStepProps> = ({ data, updateData }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: keyof SituationDescriptionData, value: string) => {
    updateData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field: keyof SituationDescriptionData, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = t('fieldRequired');
    } else if (value.trim().length < 20) {
      error = t('minDescriptionLength');
    } else if (value.trim().length > 1000) {
      error = t('maxDescriptionLength');
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = (): boolean => {
    const requiredFields: (keyof SituationDescriptionData)[] = [
      'currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'
    ];
    
    return requiredFields.every(field => {
      const value = data[field];
      return value && value.trim() && value.trim().length >= 20 && !errors[field];
    });
  };

  const handleContinue = () => {
    if (isFormValid()) {
      navigate('/initiate-application/review');
    }
  };

  const handleBack = () => {
    navigate('/initiate-application/family-financial');
  };

  const getCharacterCount = (text: string) => text ? text.length : 0;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepSituationDescription')}
        </h2>
        <p className="text-gray-600">
          {t('stepSituationDescriptionDesc')}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="space-y-6"
        autoComplete="off"
      >
        <Form.Item 
          label={
            <div className="flex items-center gap-2">
              <FileTextOutlined />
              {t('currentFinancialSituation')}
            </div>
          }
          validateStatus={errors.currentFinancialSituation ? 'error' : ''}
          help={errors.currentFinancialSituation}
          required
        >
          <TextArea
            placeholder={t('describeFinancialSituation')}
            value={data.currentFinancialSituation}
            onChange={(e) => handleFieldChange('currentFinancialSituation', e.target.value)}
            onBlur={(e) => handleFieldBlur('currentFinancialSituation', e.target.value)}
            rows={4}
            className="rounded-lg"
            showCount
            maxLength={1000}
          />
          <div className="text-sm text-gray-500 mt-1">
            {t('minCharacters', { count: 20 })} • {getCharacterCount(data.currentFinancialSituation)}/1000
          </div>
        </Form.Item>

        <Form.Item 
          label={
            <div className="flex items-center gap-2">
              <InfoCircleOutlined />
              {t('employmentCircumstances')}
            </div>
          }
          validateStatus={errors.employmentCircumstances ? 'error' : ''}
          help={errors.employmentCircumstances}
          required
        >
          <TextArea
            placeholder={t('describeEmploymentCircumstances')}
            value={data.employmentCircumstances}
            onChange={(e) => handleFieldChange('employmentCircumstances', e.target.value)}
            onBlur={(e) => handleFieldBlur('employmentCircumstances', e.target.value)}
            rows={4}
            className="rounded-lg"
            showCount
            maxLength={1000}
          />
          <div className="text-sm text-gray-500 mt-1">
            {t('minCharacters', { count: 20 })} • {getCharacterCount(data.employmentCircumstances)}/1000
          </div>
        </Form.Item>

        <Form.Item 
          label={
            <div className="flex items-center gap-2">
              <FileTextOutlined />
              {t('reasonForApplying')}
            </div>
          }
          validateStatus={errors.reasonForApplying ? 'error' : ''}
          help={errors.reasonForApplying}
          required
        >
          <TextArea
            placeholder={t('describeReasonForApplying')}
            value={data.reasonForApplying}
            onChange={(e) => handleFieldChange('reasonForApplying', e.target.value)}
            onBlur={(e) => handleFieldBlur('reasonForApplying', e.target.value)}
            rows={4}
            className="rounded-lg"
            showCount
            maxLength={1000}
          />
          <div className="text-sm text-gray-500 mt-1">
            {t('minCharacters', { count: 20 })} • {getCharacterCount(data.reasonForApplying)}/1000
          </div>
        </Form.Item>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <InfoCircleOutlined className="text-blue-600 text-lg mt-1" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">{t('helpfulTips')}</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {t('tip1')}</li>
                <li>• {t('tip2')}</li>
                <li>• {t('tip3')}</li>
                <li>• {t('tip4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </Form>

      <div className="flex justify-between mt-8">
        <Button
          size="large"
          onClick={handleBack}
          className="px-8 rounded-lg"
        >
          {t('back')}
        </Button>
        
        <Button
          type="primary"
          size="large"
          onClick={handleContinue}
          disabled={!isFormValid()}
          className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-lg"
        >
          {t('continue')}
        </Button>
      </div>
    </Card>
  );
};

export default SituationDescriptionStep; 