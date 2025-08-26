import React from 'react';
import { Form, Button, Select, Card, Row, Col, InputNumber } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import { useForm, Controller, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/i18n';
import { familyFinancialSchema } from '../schemas';
import type { FamilyFinancialFormData } from '../schemas';
const { Option } = Select;

interface FamilyFinancialStepProps {
  data: FamilyFinancialFormData;
  onSubmit: (data: FamilyFinancialFormData) => void;
  onBack: () => void;
}

const FamilyFinancialStep: React.FC<FamilyFinancialStepProps> = ({
  data,
  onSubmit,
  onBack,
}) => {
  const { t } = useLanguage();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FamilyFinancialFormData>({
    resolver: zodResolver(familyFinancialSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const getErrorMessage = (fieldError?: FieldError) => {
    if (!fieldError?.message) return '';
    return t(fieldError.message) || fieldError.message;
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepFamilyFinancial')}
        </h2>
        <p className="text-gray-600">{t('stepFamilyFinancialDesc')}</p>
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
              label={t('maritalStatus')}
              validateStatus={errors.maritalStatus ? 'error' : ''}
              help={getErrorMessage(errors.maritalStatus)}
              required
            >
              <Controller
                name="maritalStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectMaritalStatus')}
                    size="large"
                    className="w-full"
                    onChange={field.onChange}
                  >
                    <Option value="single">{t('single')}</Option>
                    <Option value="married">{t('married')}</Option>
                    <Option value="divorced">{t('divorced')}</Option>
                    <Option value="widowed">{t('widowed')}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('dependents')}
              validateStatus={errors.dependents ? 'error' : ''}
              help={getErrorMessage(errors.dependents)}
              required
            >
              <Controller
                name="dependents"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    placeholder={t('enterDependents')}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    min={0}
                    max={20}
                    size="large"
                    className="w-full rounded-lg"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('employmentStatus')}
              validateStatus={errors.employmentStatus ? 'error' : ''}
              help={getErrorMessage(errors.employmentStatus)}
              required
            >
              <Controller
                name="employmentStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder={t('selectEmploymentStatus')}
                    size="large"
                    className="w-full"
                    onChange={field.onChange}
                  >
                    <Option value="employed">{t('employed')}</Option>
                    <Option value="unemployed">{t('unemployed')}</Option>
                    <Option value="self-employed">{t('selfEmployed')}</Option>
                    <Option value="retired">{t('retired')}</Option>
                    <Option value="student">{t('student')}</Option>
                    <Option value="disabled">{t('disabled')}</Option>
                  </Select>
                )}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('monthlyIncome')}
              validateStatus={errors.monthlyIncome ? 'error' : ''}
              help={getErrorMessage(errors.monthlyIncome)}
              required
            >
              <Controller
                name="monthlyIncome"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    placeholder={t('enterMonthlyIncome')}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    min={0}
                    max={1000000}
                    formatter={value =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                    size="large"
                    className="w-full rounded-lg"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={t('housingStatus')}
          validateStatus={errors.housingStatus ? 'error' : ''}
          help={getErrorMessage(errors.housingStatus)}
          required
        >
          <Controller
            name="housingStatus"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={t('selectHousingStatus')}
                size="large"
                className="w-full"
                onChange={field.onChange}
              >
                <Option value="owned">{t('owned')}</Option>
                <Option value="rented">{t('rented')}</Option>
                <Option value="gov-housing">{t('govHousing')}</Option>
                <Option value="family-housing">{t('familyHousing')}</Option>
                <Option value="temporary">{t('temporaryHousing')}</Option>
              </Select>
            )}
          />
        </Form.Item>

        <div className="flex justify-between mt-8">
          <Button size="large" onClick={onBack} className="px-8 rounded-lg">
            {t('back')}
          </Button>

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

export default FamilyFinancialStep;
