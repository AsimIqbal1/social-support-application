import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, Space, Row, Col } from 'antd';
import { UserOutlined, IdcardOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n/hooks/useLanguage';
import dayjs from 'dayjs';

const { Option } = Select;

interface PersonalInfoData {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfoData;
  updateData: (data: Partial<PersonalInfoData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[1-9][\d]{7,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateNationalId = (id: string): boolean => {
    return id.length >= 8 && id.length <= 15;
  };

  const handleFieldChange = (field: keyof PersonalInfoData, value: string) => {
    updateData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFieldBlur = (field: keyof PersonalInfoData, value: string) => {
    let error = '';
    
    if (!value.trim()) {
      error = t('fieldRequired');
    } else {
      switch (field) {
        case 'email':
          if (!validateEmail(value)) error = t('invalidEmail');
          break;
        case 'phone':
          if (!validatePhone(value)) error = t('invalidPhone');
          break;
        case 'nationalId':
          if (!validateNationalId(value)) error = t('invalidNationalId');
          break;
        case 'name':
          if (value.trim().length < 2) error = t('nameMinLength');
          break;
      }
    }
    
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = (): boolean => {
    const requiredFields: (keyof PersonalInfoData)[] = [
      'name', 'nationalId', 'dateOfBirth', 'gender', 'address', 
      'city', 'state', 'country', 'phone', 'email'
    ];
    
    return requiredFields.every(field => {
      const value = data[field];
      return value && value.trim() && !errors[field];
    });
  };

  const handleContinue = () => {
    if (isFormValid()) {
      navigate('/initiate-application/family-financial');
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepPersonalInfo')}
        </h2>
        <p className="text-gray-600">
          {t('stepPersonalInfoDesc')}
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
              label={t('fullName')}
              validateStatus={errors.name ? 'error' : ''}
              help={errors.name}
              required
            >
              <Input
                prefix={<UserOutlined />}
                placeholder={t('enterFullName')}
                value={data.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={(e) => handleFieldBlur('name', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('nationalId')}
              validateStatus={errors.nationalId ? 'error' : ''}
              help={errors.nationalId}
              required
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder={t('enterNationalId')}
                value={data.nationalId}
                onChange={(e) => handleFieldChange('nationalId', e.target.value)}
                onBlur={(e) => handleFieldBlur('nationalId', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('dateOfBirth')}
              required
            >
              <DatePicker
                placeholder={t('selectDateOfBirth')}
                value={data.dateOfBirth ? dayjs(data.dateOfBirth) : null}
                onChange={(date) => handleFieldChange('dateOfBirth', date ? date.format('YYYY-MM-DD') : '')}
                size="large"
                className="w-full rounded-lg"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('gender')}
              required
            >
              <Select
                placeholder={t('selectGender')}
                value={data.gender || undefined}
                onChange={(value) => handleFieldChange('gender', value)}
                size="large"
                className="w-full"
              >
                <Option value="male">{t('male')}</Option>
                <Option value="female">{t('female')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label={t('address')}
          validateStatus={errors.address ? 'error' : ''}
          help={errors.address}
          required
        >
          <Input.TextArea
            placeholder={t('enterAddress')}
            value={data.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
            onBlur={(e) => handleFieldBlur('address', e.target.value)}
            rows={3}
            className="rounded-lg"
          />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('city')}
              validateStatus={errors.city ? 'error' : ''}
              help={errors.city}
              required
            >
              <Input
                placeholder={t('enterCity')}
                value={data.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                onBlur={(e) => handleFieldBlur('city', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('state')}
              validateStatus={errors.state ? 'error' : ''}
              help={errors.state}
              required
            >
              <Input
                placeholder={t('enterState')}
                value={data.state}
                onChange={(e) => handleFieldChange('state', e.target.value)}
                onBlur={(e) => handleFieldBlur('state', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('country')}
              validateStatus={errors.country ? 'error' : ''}
              help={errors.country}
              required
            >
              <Select
                placeholder={t('selectCountry')}
                value={data.country || undefined}
                onChange={(value) => handleFieldChange('country', value)}
                size="large"
                className="w-full"
              >
                <Option value="UAE">{t('uae')}</Option>
                <Option value="Saudi Arabia">{t('saudiArabia')}</Option>
                <Option value="Kuwait">{t('kuwait')}</Option>
                <Option value="Qatar">{t('qatar')}</Option>
                <Option value="Bahrain">{t('bahrain')}</Option>
                <Option value="Oman">{t('oman')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('phone')}
              validateStatus={errors.phone ? 'error' : ''}
              help={errors.phone}
              required
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder={t('enterPhone')}
                value={data.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('email')}
              validateStatus={errors.email ? 'error' : ''}
              help={errors.email}
              required
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={t('enterEmail')}
                value={data.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={(e) => handleFieldBlur('email', e.target.value)}
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="flex justify-end mt-8">
        <Space>
          <Button
            type="primary"
            size="large"
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-lg"
          >
            {t('continue')}
          </Button>
        </Space>
      </div>
    </Card>
  );
};

export default PersonalInfoStep; 