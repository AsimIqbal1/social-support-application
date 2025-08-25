import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  IdcardOutlined,
  FieldTimeOutlined,
  DollarOutlined,
  BankOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Text } = Typography;

const Sidebar: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleStartApplication = () => {
    navigate('/initiate-application');
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      {/* Action Button */}
      <Card className="rounded-card shadow-card border-none">
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            block
            icon={isRTL ? <LeftOutlined /> : <RightOutlined />}
            className="bg-uae-brown border-uae-brown h-15 text-xl font-semibold rounded-lg mb-4"
            onClick={handleStartApplication}
          >
            {t('startApplication')}
          </Button>
          <div className="flex gap-3 justify-center">
            <FieldTimeOutlined />
            <Text>Estimated time: 10 minutes</Text>
          </div>
        </div>
      </Card>

      {/* Required Documents */}
      <Card
        title={t('whatYouNeed')}
        className="rounded-card shadow-card border-none"
      >
        <Space direction="vertical" size="small" className="w-full">
          <div className="flex items-center gap-3">
            <IdcardOutlined className="text-gov-primary text-base" />
            <Text className="text-sm">{t('requirementId')}</Text>
          </div>
          <div className="flex items-center gap-3">
            <DollarOutlined className="text-gov-success text-base" />
            <Text className="text-sm">{t('requirementIncome')}</Text>
          </div>
          <div className="flex items-center gap-3">
            <BankOutlined className="text-purple-600 text-base" />
            <Text className="text-sm">{t('requirementBank')}</Text>
          </div>
          <div className="flex items-center gap-3">
            <TeamOutlined className="text-orange-500 text-base" />
            <Text className="text-sm">{t('requirementHousehold')}</Text>
          </div>
        </Space>
      </Card>

      {/* Contact Info */}
      <Card
        title={t('needHelpTitle')}
        className="rounded-card shadow-card border-none"
      >
        <Space direction="vertical" size="middle" className="w-full">
          <div className="flex items-center gap-3">
            <PhoneOutlined className="text-gov-success text-base" />
            <Text className="text-sm">{t('contactPhone')}</Text>
          </div>
          <div className="flex items-center gap-3">
            <MailOutlined className="text-gov-primary text-base" />
            <Text className="text-sm">{t('contactEmail')}</Text>
          </div>
          <div className="flex items-center gap-3">
            <ClockCircleOutlined className="text-orange-500 text-base" />
            <Text className="text-sm">{t('contactHours')}</Text>
          </div>
        </Space>
      </Card>
    </Space>
  );
};

export default Sidebar;
