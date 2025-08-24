import React, { useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, Card, Row, Col } from 'antd';
import { UserOutlined, IdcardOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../../i18n/hooks/useLanguage';
import { personalInfoSchema } from '../schemas';
import type { PersonalInfoFormData } from '../schemas';
import dayjs from 'dayjs';

const { Option } = Select;

interface PersonalInfoStepProps {
  data: PersonalInfoFormData;
  updateData: (data: Partial<PersonalInfoFormData>) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, updateData }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  console.log("PersonalInfoStep");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
    mode: 'onBlur',
  });


  // const watchedValues = watch();

  // Update parent data when form values change
  // useEffect(() => {
  //   updateData(watchedValues);
  // }, [watchedValues, updateData]);

  const onSubmit = (formData: PersonalInfoFormData) => {
    updateData(formData);
    navigate('/initiate-application/family-financial');
  };

  const getErrorMessage = (fieldError: any) => {
    if (!fieldError) return '';
    return t(fieldError.message) || fieldError.message;
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
        layout="vertical"
        className="space-y-4"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('fullName')}
              validateStatus={errors.name ? 'error' : ''}
              help={getErrorMessage(errors.name)}
              required
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<UserOutlined />}
                    placeholder={t('enterFullName')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('name');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('nationalId')}
              validateStatus={errors.nationalId ? 'error' : ''}
              help={getErrorMessage(errors.nationalId)}
              required
            >
              <Controller
                name="nationalId"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<IdcardOutlined />}
                    placeholder={t('enterNationalId')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('nationalId');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('dateOfBirth')}
              validateStatus={errors.dateOfBirth ? 'error' : ''}
              help={getErrorMessage(errors.dateOfBirth)}
              required
            >
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    placeholder={t('selectDateOfBirth')}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date ? date.format('YYYY-MM-DD') : '');
                      trigger('dateOfBirth');
                    }}
                    size="large"
                    className="w-full rounded-lg"
                    disabledDate={(current) => current && current > dayjs().endOf('day')}
                  />
                )}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('gender')}
              validateStatus={errors.gender ? 'error' : ''}
              help={getErrorMessage(errors.gender)}
              required
            >
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectGender')}
                    size="large"
                    className="w-full"
                    onChange={(value) => {
                      field.onChange(value);
                      trigger('gender');
                    }}
                  >
                    <Option value="male">{t('male')}</Option>
                    <Option value="female">{t('female')}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item 
          label={t('address')}
          validateStatus={errors.address ? 'error' : ''}
          help={getErrorMessage(errors.address)}
          required
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder={t('enterAddress')}
                rows={3}
                className="rounded-lg"
                onBlur={() => {
                  field.onBlur();
                  trigger('address');
                }}
              />
            )}
          />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('city')}
              validateStatus={errors.city ? 'error' : ''}
              help={getErrorMessage(errors.city)}
              required
            >
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t('enterCity')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('city');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('state')}
              validateStatus={errors.state ? 'error' : ''}
              help={getErrorMessage(errors.state)}
              required
            >
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t('enterState')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('state');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={8}>
            <Form.Item 
              label={t('country')}
              validateStatus={errors.country ? 'error' : ''}
              help={getErrorMessage(errors.country)}
              required
            >
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectCountry')}
                    size="large"
                    className="w-full"
                    onChange={(value) => {
                      field.onChange(value);
                      trigger('country');
                    }}
                  >
                    <Option value="UAE">{t('uae')}</Option>
                    <Option value="Saudi Arabia">{t('saudiArabia')}</Option>
                    <Option value="Kuwait">{t('kuwait')}</Option>
                    <Option value="Qatar">{t('qatar')}</Option>
                    <Option value="Bahrain">{t('bahrain')}</Option>
                    <Option value="Oman">{t('oman')}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('phone')}
              validateStatus={errors.phone ? 'error' : ''}
              help={getErrorMessage(errors.phone)}
              required
            >
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<PhoneOutlined />}
                    placeholder={t('enterPhone')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('phone');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
          
          <Col xs={24} md={12}>
            <Form.Item 
              label={t('email')}
              validateStatus={errors.email ? 'error' : ''}
              help={getErrorMessage(errors.email)}
              required
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={<MailOutlined />}
                    placeholder={t('enterEmail')}
                    size="large"
                    className="rounded-lg"
                    onBlur={() => {
                      field.onBlur();
                      trigger('email');
                    }}
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={!isValid}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 px-8 rounded-lg"
          >
            {t('continue')}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default PersonalInfoStep; 