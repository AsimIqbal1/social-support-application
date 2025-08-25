import React from 'react';
import { Typography, Tag } from 'antd';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Title, Paragraph } = Typography;

const ServiceInfo: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6">
      <div className='flex justify-start items-center gap-2'>
        <Tag color="green" className="text-sm py-2 px-4 rounded-full">
          {t('serviceFee')}
        </Tag>
        <Tag color="blue" className="text-sm py-2 px-4 rounded-full">
          {t('serviceTime')}
        </Tag>
        <Tag color="orange" className="text-sm py-2 px-4 rounded-full">
          {t('serviceSLA')}
        </Tag>
      </div>

      <Title level={3} className="my-5 text-gray-800">
        {t('programTitle')}
      </Title>
      <Paragraph className="text-base leading-7 text-gray-600 mb-10">
        {t('programDescription')}
      </Paragraph>
    </div>
  );
};

export default ServiceInfo;
