import React, { useState } from 'react';
import { Form, Input, Button, Select, Card, Space, Row, Col, InputNumber } from 'antd';
import { TeamOutlined, DollarOutlined, BankOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Option } = Select;

interface FamilyFinancialData {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
}

interface FamilyFinancialStepProps {
  data: FamilyFinancialData;
  updateData: (data: Partial<FamilyFinancialData>) => void;
}

const FamilyFinancialStep: React.FC<FamilyFinancialStepProps> = ({ data, updateData }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: keyof FamilyFinancialData, value: string) => {
    updateData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field: keyof FamilyFinancialData, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = t('fieldRequired');
    } else {
      switch (field) {
        case 'dependents':
          const numDependents = parseInt(value, 10);
          if (isNaN(numDependents) || numDependents < 0) {
            error = t('invalidNumber');
          }
          break;
        case 'monthlyIncome':
          const income = parseFloat(value);
          if (isNaN(income) || income < 0) {
            error = t('invalidAmount');
          }
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = (): boolean => {
    const requiredFields: (keyof FamilyFinancialData)[] = [
      'maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'
    ];
    
    return requiredFields.every(field => {
      const value = data[field];
      return value && value.trim() && !errors[field];
    });
  };

  const handleContinue = () => {
    if (isFormValid()) {
      navigate('/initiate-application/situation-description');
    }
  };

  const handleBack = () => {
    navigate('/initiate-application/personal-info');
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepFamilyFinancial')}
        </h2>
        <p className="text-gray-600">
          {t('stepFamilyFinancialDesc')}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        className="space-y-4"
        autoComplete="off"
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('maritalStatus')}
              required
            >
              <Select
                placeholder={t('selectMaritalStatus')}
                value={data.maritalStatus || undefined}
                onChange={(value) => handleFieldChange('maritalStatus', value)}
                size="large"
                className="w-full"
              >
                <Option value="single">{t('single')}</Option>
                <Option value="married">{t('married')}</Option>
                <Option value="divorced">{t('divorced')}</Option>
                <Option value="widowed">{t('widowed')}</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('dependents')}
              validateStatus={errors.dependents ? 'error' : ''}
              help={errors.dependents}
              required
            >
              <InputNumber
                placeholder={t('enterDependents')}
                value={data.dependents ? parseInt(data.dependents, 10) : undefined}
                onChange={(value) => handleFieldChange('dependents', value ? value.toString() : '')}
                onBlur={(e) => handleFieldBlur('dependents', e.target.value)}
                min={0}
                max={20}
                size="large"
                className="w-full rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('employmentStatus')}
              required
            >
              <Select
                placeholder={t('selectEmploymentStatus')}
                value={data.employmentStatus || undefined}
                onChange={(value) => handleFieldChange('employmentStatus', value)}
                size="large"
                className="w-full"
              >
                <Option value="employed">{t('employed')}</Option>
                <Option value="unemployed">{t('unemployed')}</Option>
                <Option value="self-employed">{t('selfEmployed')}</Option>
                <Option value="retired">{t('retired')}</Option>
                <Option value="student">{t('student')}</Option>
                <Option value="disabled">{t('disabled')}</Option>
              </Select>
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('monthlyIncome')}
              validateStatus={errors.monthlyIncome ? 'error' : ''}
              help={errors.monthlyIncome}
              required
            >
              <InputNumber
                prefix={<DollarOutlined />}
                placeholder={t('enterMonthlyIncome')}
                value={data.monthlyIncome ? parseFloat(data.monthlyIncome) : undefined}
                onChange={(value) => handleFieldChange('monthlyIncome', value ? value.toString() : '')}
                onBlur={(e) => handleFieldBlur('monthlyIncome', e.target.value)}
                min={0}
                max={1000000}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                size="large"
                className="w-full rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label={t('housingStatus')}
          required
        >
          <Select
            placeholder={t('selectHousingStatus')}
            value={data.housingStatus || undefined}
            onChange={(value) => handleFieldChange('housingStatus', value)}
            size="large"
            className="w-full"
          >
            <Option value="owned">{t('owned')}</Option>
            <Option value="rented">{t('rented')}</Option>
            <Option value="gov-housing">{t('govHousing')}</Option>
            <Option value="family-housing">{t('familyHousing')}</Option>
            <Option value="temporary">{t('temporaryHousing')}</Option>
          </Select>
        </Form.Item>
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

export default FamilyFinancialStep; 