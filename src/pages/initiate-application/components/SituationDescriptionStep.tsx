import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../../i18n/hooks/useLanguage';
import { situationDescriptionSchema } from '../schemas';
import type { SituationDescriptionFormData } from '../schemas';

const { TextArea } = Input;

const MAXIMAM_CHARACTERS = 1000;

interface SituationDescriptionStepProps {
  data: SituationDescriptionFormData;
  updateData: (data: Partial<SituationDescriptionFormData>) => void;
}

const SituationDescriptionStep: React.FC<SituationDescriptionStepProps> = ({
  data,
  updateData,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<SituationDescriptionFormData>({
    resolver: zodResolver(situationDescriptionSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const onSubmit = (formData: SituationDescriptionFormData) => {
    updateData(formData);
    navigate('/initiate-application/review');
  };

  const handleBack = () => {
    navigate('/initiate-application/family-financial');
  };

  const getErrorMessage = (fieldError?: FieldError) => {
    if (!fieldError?.message) return '';
    return t(fieldError.message) || fieldError.message;
  };

  const getCharacterCount = (text: string) => (text ? text.length : 0);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepSituationDescription')}
        </h2>
        <p className="text-gray-600">{t('stepSituationDescriptionDesc')}</p>
      </div>

      <Form
        layout="vertical"
        className="space-y-6"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label={
            <div className="flex items-center gap-2">
              <FileTextOutlined />
              {t('currentFinancialSituation')}
            </div>
          }
          validateStatus={errors.currentFinancialSituation ? 'error' : ''}
          help={getErrorMessage(errors.currentFinancialSituation)}
          required
        >
          <Controller
            name="currentFinancialSituation"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  {...field}
                  placeholder={t('describeFinancialSituation')}
                  rows={4}
                  className="rounded-lg"
                  showCount
                  maxLength={MAXIMAM_CHARACTERS}
                  onBlur={() => {
                    field.onBlur();
                    trigger('currentFinancialSituation');
                  }}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {t('minCharacters', { count: 20 })} •{' '}
                  {getCharacterCount(field.value)}/{MAXIMAM_CHARACTERS}
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center gap-2">
              <InfoCircleOutlined />
              {t('employmentCircumstances')}
            </div>
          }
          validateStatus={errors.employmentCircumstances ? 'error' : ''}
          help={getErrorMessage(errors.employmentCircumstances)}
          required
        >
          <Controller
            name="employmentCircumstances"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  {...field}
                  placeholder={t('describeEmploymentCircumstances')}
                  rows={4}
                  className="rounded-lg"
                  showCount
                  maxLength={MAXIMAM_CHARACTERS}
                  onBlur={() => {
                    field.onBlur();
                    trigger('employmentCircumstances');
                  }}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {t('minCharacters', { count: 20 })} •{' '}
                  {getCharacterCount(field.value)}/{MAXIMAM_CHARACTERS}
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          label={
            <div className="flex items-center gap-2">
              <FileTextOutlined />
              {t('reasonForApplying')}
            </div>
          }
          validateStatus={errors.reasonForApplying ? 'error' : ''}
          help={getErrorMessage(errors.reasonForApplying)}
          required
        >
          <Controller
            name="reasonForApplying"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  {...field}
                  placeholder={t('describeReasonForApplying')}
                  rows={4}
                  className="rounded-lg"
                  showCount
                  maxLength={MAXIMAM_CHARACTERS}
                  onBlur={() => {
                    field.onBlur();
                    trigger('reasonForApplying');
                  }}
                />
                <div className="text-sm text-gray-500 mt-1">
                  {t('minCharacters', { count: 20 })} •{' '}
                  {getCharacterCount(field.value)}/{MAXIMAM_CHARACTERS}
                </div>
              </div>
            )}
          />
        </Form.Item>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <InfoCircleOutlined className="text-blue-600 text-lg mt-1" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">
                {t('helpfulTips')}
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• {t('tip1')}</li>
                <li>• {t('tip2')}</li>
                <li>• {t('tip3')}</li>
                <li>• {t('tip4')}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button size="large" onClick={handleBack} className="px-8 rounded-lg">
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

export default SituationDescriptionStep;
