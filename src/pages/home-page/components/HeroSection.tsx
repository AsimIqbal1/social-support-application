import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLanguage } from '@/i18n';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const { t, isRTL } = useLanguage();

  const handleStartApplication = () => {
    navigate('/initiate-application');
  };
  
  return (
    <div className="bg-gradient-to-r from-gov-primary to-gov-secondary text-white p-10 text-center">
      <Title level={1} className="!text-white text-4xl !font-bold !mb-4">
        {t('heroTitle')}
      </Title>
      <Title level={3} className="!text-white/90 !font-normal !mb-6">
        {t('heroSubtitle')}
      </Title>
      <Paragraph className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
        {t('heroDescription')}
      </Paragraph>
      <Button
        type="primary"
        size="large"
        icon={isRTL ? <LeftOutlined /> : <RightOutlined />}
        className="bg-gov-success border-gov-success h-12 text-lg px-10 rounded-lg shadow-button"
        onClick={handleStartApplication}
      >
        {t('startApplication')}
      </Button>
    </div>
  );
};

export default HeroSection;
