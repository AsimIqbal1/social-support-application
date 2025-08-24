import React from 'react';
import { Typography, Row, Col } from 'antd';
import {
  DollarOutlined,
  HomeOutlined,
  StarOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Title, Text } = Typography;

const BenefitsGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="px-10 pb-10">
      <Title level={4} className="mb-6 text-gray-800">
        {t('benefitsTitle')}
      </Title>
      <Row gutter={[24, 24]} className="mb-10">
        <Col xs={12} md={6}>
          <div className="text-center">
            <DollarOutlined className="text-3xl text-gov-success mb-3" />
            <Text strong className="block text-sm text-gray-800">
              {t('benefitMonthly')}
            </Text>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="text-center">
            <HomeOutlined className="text-3xl text-gov-primary mb-3" />
            <Text strong className="block text-sm text-gray-800">
              {t('benefitHousing')}
            </Text>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="text-center">
            <StarOutlined className="text-3xl text-yellow-500 mb-3" />
            <Text strong className="block text-sm text-gray-800">
              {t('benefitAcademic')}
            </Text>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="text-center">
            <CheckCircleOutlined className="text-3xl text-purple-600 mb-3" />
            <Text strong className="block text-sm text-gray-800">
              {t('benefitComplementary')}
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BenefitsGrid;
