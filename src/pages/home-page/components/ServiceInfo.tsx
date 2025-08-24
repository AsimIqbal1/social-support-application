import React from 'react';
import { Typography, Tag, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Title, Paragraph } = Typography;

const ServiceInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-10">
      <Row gutter={[24, 16]} className="mb-10">
        <Col xs={24} sm={8}>
          <Tag color="green" className="text-sm py-2 px-4 rounded-full">
            {t('serviceFee')}
          </Tag>
        </Col>
        <Col xs={24} sm={8}>
          <Tag color="blue" className="text-sm py-2 px-4 rounded-full">
            <ClockCircleOutlined className="mr-2" />
            {t('serviceTime')}
          </Tag>
        </Col>
        <Col xs={24} sm={8}>
          <Tag color="orange" className="text-sm py-2 px-4 rounded-full">
            {t('serviceSLA')}
          </Tag>
        </Col>
      </Row>

      <Title level={3} className="mb-5 text-gray-800">
        {t('programTitle')}
      </Title>
      <Paragraph className="text-base leading-7 text-gray-600 mb-10">
        {t('programDescription')}
      </Paragraph>
    </div>
  );
};

export default ServiceInfo;
