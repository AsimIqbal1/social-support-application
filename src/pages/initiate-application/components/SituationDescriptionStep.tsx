import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { FileTextOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/i18n';
import { situationDescriptionSchema } from '../schemas';
import type {
  FamilyFinancialFormData,
  SituationDescriptionFormData,
} from '../schemas';
import { WriteWithAI } from '@/components';
import { ROUTES } from '@/constants';

const { TextArea } = Input;
const formRoutes = ROUTES.INITIATE_APPLICATION.children;
const MAXIMAM_CHARACTERS = 1000;


interface SituationDescriptionStepProps {
  data: SituationDescriptionFormData;
  updateData: (data: Partial<SituationDescriptionFormData>) => void;
  familyData?: FamilyFinancialFormData;
}

const SituationDescriptionStep: React.FC<SituationDescriptionStepProps> = ({
  data,
  updateData,
  familyData,
}) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<SituationDescriptionFormData>({
    resolver: zodResolver(situationDescriptionSchema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const watchedValues = watch();

  const onSubmit = (formData: SituationDescriptionFormData) => {
    updateData(formData);
    navigate(formRoutes.REVIEW.path);
  };

  const handleBack = () => {
    navigate(formRoutes.FAMILY_FINANCIAL.path);
  };

  const getErrorMessage = (fieldError?: FieldError) => {
    if (!fieldError?.message) return '';
    return t(fieldError.message) || fieldError.message;
  };

  const getCharacterCount = (text: string) => (text ? text.length : 0);

  const handleAIAccept = (
    fieldName: keyof SituationDescriptionFormData,
    content: string
  ) => {
    setValue(fieldName, content);
    trigger(fieldName);
  };

  const renderFieldLabel = (
    icon: React.ReactNode,
    label: string,
    fieldName: keyof SituationDescriptionFormData,
    currentValue: string
  ) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
      <WriteWithAI
        fieldName={fieldName}
        fieldLabel={label}
        currentValue={currentValue}
        onAccept={content => handleAIAccept(fieldName, content)}
        maxLength={MAXIMAM_CHARACTERS}
        context={{
          maritalStatus: familyData?.maritalStatus,
          dependents: familyData?.dependents,
          monthlyIncome: familyData?.monthlyIncome,
          housingStatus: familyData?.housingStatus,
          employmentStatus: familyData?.employmentStatus,
        }}
      />
    </div>
  );

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
          label={renderFieldLabel(
            <FileTextOutlined />,
            t('currentFinancialSituation'),
            'currentFinancialSituation',
            watchedValues.currentFinancialSituation || ''
          )}
          validateStatus={errors.currentFinancialSituation ? 'error' : ''}
          help={getErrorMessage(errors.currentFinancialSituation)}
          required
          className=""
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
                  {t('minCharacters', { count: 20 })}
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          label={renderFieldLabel(
            <InfoCircleOutlined />,
            t('employmentCircumstances'),
            'employmentCircumstances',
            watchedValues.employmentCircumstances || ''
          )}
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
                  {t('minCharacters', { count: 20 })}
                </div>
              </div>
            )}
          />
        </Form.Item>

        <Form.Item
          label={renderFieldLabel(
            <FileTextOutlined />,
            t('reasonForApplying'),
            'reasonForApplying',
            watchedValues.reasonForApplying || ''
          )}
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
                  {t('minCharacters', { count: 20 })}
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
