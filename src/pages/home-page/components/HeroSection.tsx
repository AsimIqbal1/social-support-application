import React from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useLanguage } from '@/i18n/hooks/useLanguage';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-gov-primary to-gov-secondary text-white p-6 px-10 text-center">
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
      >
        {t('startApplication')}
      </Button>
    </div>
  );
};

export default HeroSection;
