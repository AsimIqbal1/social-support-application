import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import {
  IdcardOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/i18n';

const { Title, Text } = Typography;

const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="px-10 pb-10">
      <Title level={4} className="mb-6 text-gray-800">
        {t('howItWorksTitle')}
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            className="text-center bg-gray-50 rounded-card h-full"
          >
            <Avatar
              size={60}
              className="bg-blue-100 text-gov-primary mb-4"
              icon={<IdcardOutlined className="text-3xl" />}
            />
            <Title level={5} className="text-gray-800 mb-2">
              {t('step1Title')}
            </Title>
            <Text className="text-gray-500 text-sm">{t('step1Desc')}</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            variant="outlined"
            className="text-center bg-gray-50 rounded-card h-full"
          >
            <Avatar
              size={60}
              className="bg-green-100 text-gov-success mb-4"
              icon={<TeamOutlined className="text-3xl" />}
            />
            <Title level={5} className="text-gray-800 mb-2">
              {t('step2Title')}
            </Title>
            <Text className="text-gray-500 text-sm">{t('step2Desc')}</Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card
            variant="outlined"
            className="text-center bg-gray-50 rounded-card h-full"
          >
            <Avatar
              size={60}
              className="bg-red-100 text-red-500 mb-4"
              icon={<FileProtectOutlined className="text-3xl" />}
            />
            <Title level={5} className="text-gray-800 mb-2">
              {t('step3Title')}
            </Title>
            <Text className="text-gray-500 text-sm">{t('step3Desc')}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HowItWorks;
