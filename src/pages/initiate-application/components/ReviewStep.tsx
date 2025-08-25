import React, { useState } from 'react';
import { Card, Button, Descriptions, Space, Modal, message, Alert } from 'antd';
import {
  CheckCircleOutlined,
  EditOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/i18n/hooks/useLanguage';
import type { CompleteApplicationFormData } from '../schemas';

interface ReviewStepProps {
  formData: CompleteApplicationFormData;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleBack = () => {
    navigate('/initiate-application/situation-description');
  };

  const handleEdit = (section: string) => {
    switch (section) {
      case 'personal':
        navigate('/initiate-application/personal-info');
        break;
      case 'family':
        navigate('/initiate-application/family-financial');
        break;
      case 'situation':
        navigate('/initiate-application/situation-description');
        break;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      localStorage.removeItem('applicationFormData');

      setIsSubmitting(false);
      setShowConfirmModal(false);
      navigate('/');
    } catch {
      message.error(t('submissionError'));
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  const formatValue = (value: string | number, type?: string) => {
    if (!value) return t('notProvided');

    switch (type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'currency':
        return `${parseFloat(value.toString()).toLocaleString()} AED`;
      default:
        return value;
    }
  };

  const getTranslatedValue = (value: string, category: string) => {
    if (!value) return t('notProvided');

    const translationKey = `${category}_${value}`;
    const translated = t(translationKey);

    if (translated && translated !== translationKey) {
      return translated;
    }

    return value;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('stepReview')}
        </h2>
        <p className="text-gray-600">{t('stepReviewDesc')}</p>
      </div>

      <Alert
        message={t('reviewNotice')}
        description={t('reviewNoticeDesc')}
        type="info"
        showIcon
        className="mb-6"
      />

      {/* Personal Information */}
      <Card
        className="mb-6"
        title={
          <div className="flex justify-between items-center">
            <span>{t('stepPersonalInfo')}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit('personal')}
            >
              {t('edit')}
            </Button>
          </div>
        }
      >
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label={t('fullName')}>
            {formatValue(formData.personalInfo.name)}
          </Descriptions.Item>
          <Descriptions.Item label={t('nationalId')}>
            {formatValue(formData.personalInfo.nationalId)}
          </Descriptions.Item>
          <Descriptions.Item label={t('dateOfBirth')}>
            {formatValue(formData.personalInfo.dateOfBirth, 'date')}
          </Descriptions.Item>
          <Descriptions.Item label={t('gender')}>
            {getTranslatedValue(formData.personalInfo.gender, 'gender')}
          </Descriptions.Item>
          <Descriptions.Item label={t('phone')}>
            {formatValue(formData.personalInfo.phone)}
          </Descriptions.Item>
          <Descriptions.Item label={t('email')}>
            {formatValue(formData.personalInfo.email)}
          </Descriptions.Item>
          <Descriptions.Item label={t('address')} span={2}>
            {formatValue(formData.personalInfo.address)}
          </Descriptions.Item>
          <Descriptions.Item label={t('city')}>
            {formatValue(formData.personalInfo.city)}
          </Descriptions.Item>
          <Descriptions.Item label={t('state')}>
            {formatValue(formData.personalInfo.state)}
          </Descriptions.Item>
          <Descriptions.Item label={t('country')} span={2}>
            {formatValue(formData.personalInfo.country)}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Family & Financial Information */}
      <Card
        className="mb-6"
        title={
          <div className="flex justify-between items-center">
            <span>{t('stepFamilyFinancial')}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit('family')}
            >
              {t('edit')}
            </Button>
          </div>
        }
      >
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label={t('maritalStatus')}>
            {getTranslatedValue(
              formData.familyFinancial.maritalStatus,
              'marital'
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('dependents')}>
            {formatValue(formData.familyFinancial.dependents || 0)}
          </Descriptions.Item>
          <Descriptions.Item label={t('employmentStatus')}>
            {getTranslatedValue(
              formData.familyFinancial.employmentStatus,
              'employment'
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('monthlyIncome')}>
            {formatValue(
              formData.familyFinancial.monthlyIncome || 0,
              'currency'
            )}
          </Descriptions.Item>
          <Descriptions.Item label={t('housingStatus')} span={2}>
            {getTranslatedValue(
              formData.familyFinancial.housingStatus,
              'housing'
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Situation Description */}
      <Card
        className="mb-6"
        title={
          <div className="flex justify-between items-center">
            <span>{t('stepSituationDescription')}</span>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit('situation')}
            >
              {t('edit')}
            </Button>
          </div>
        }
      >
        <Space direction="vertical" size="middle" className="w-full">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {t('currentFinancialSituation')}
            </h4>
            <div className="bg-gray-50 p-3 rounded border">
              {formatValue(
                formData.situationDescription.currentFinancialSituation
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {t('employmentCircumstances')}
            </h4>
            <div className="bg-gray-50 p-3 rounded border">
              {formatValue(
                formData.situationDescription.employmentCircumstances
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              {t('reasonForApplying')}
            </h4>
            <div className="bg-gray-50 p-3 rounded border">
              {formatValue(formData.situationDescription.reasonForApplying)}
            </div>
          </div>
        </Space>
      </Card>

      {/* Submission Notice */}
      <Alert
        message={t('submissionNotice')}
        description={t('submissionNoticeDesc')}
        type="warning"
        showIcon
        className="mb-6"
      />

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button size="large" onClick={handleBack} className="px-8 rounded-lg">
          {t('back')}
        </Button>

        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          onClick={() => setShowConfirmModal(true)}
          className="bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 px-8 rounded-lg"
        >
          {t('submitApplication')}
        </Button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title={t('confirmSubmission')}
        open={showConfirmModal}
        onOk={handleSubmit}
        onCancel={() => setShowConfirmModal(false)}
        okText={t('yesSubmit')}
        cancelText={t('cancel')}
        confirmLoading={isSubmitting}
        okButtonProps={{
          className:
            'bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700',
        }}
      >
        <div className="py-4">
          <p className="mb-4">{t('confirmSubmissionDesc')}</p>
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircleOutlined />
            <span className="font-medium">{t('readyToSubmit')}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewStep;
