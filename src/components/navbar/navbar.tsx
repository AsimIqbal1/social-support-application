import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useLanguage } from '@/i18n/hooks/useLanguage';

const { Header } = Layout;
const { Title, Text } = Typography;

const Navbar: React.FC = () => {
  const { t, switchLanguage, language } = useLanguage();

  return (
    <Header className="fixed top-0 w-full z-50 p-0 bg-white shadow-header h-auto">
      {/* Main Header */}
      <div className="py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
              <Title level={5} className="!m-0 !text-uae-brown !font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap">
                {t('uae')} |
              </Title>
              <Text className="text-uae-brown text-xs md:text-sm lg:text-base truncate">
                {t('ministryOfCommunityEmpowerment')}
              </Text>
            </div>
          </div>

          <Space className="flex-shrink-0">
            <Button
              type="text"
              icon={<GlobalOutlined className="text-xs md:text-sm" />}
              onClick={() => switchLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-uae-brown hover:text-uae-brown hover:bg-gray-50 text-xs md:text-sm px-2 md:px-3"
              size="small"
            >
              <span className="hidden sm:inline">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
              <span className="sm:hidden">
                {language === 'en' ? 'ع' : 'EN'}
              </span>
            </Button>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default Navbar; 