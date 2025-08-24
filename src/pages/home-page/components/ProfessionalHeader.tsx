import React from 'react';
import {
  Layout,
  Typography,
  Button,
  Space,
  Input,
} from 'antd';
import {
  BankOutlined,
  HomeOutlined,
  GlobalOutlined,
  AppstoreOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useLanguage } from '../../../i18n/hooks/useLanguage';

const { Header } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const ProfessionalHeader: React.FC = () => {
  const { t, switchLanguage } = useLanguage();

  return (
    <Header className="fixed top-0 w-full z-50 p-0 bg-white shadow-header h-auto">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Text className="text-gray-600">MINISTRY OF COMMUNITY EMPOWERMENT</Text>
          <div className="flex items-center gap-2">
            <StarOutlined className="text-yellow-400" />
            <StarOutlined className="text-yellow-400" />
            <StarOutlined className="text-yellow-400" />
            <Text className="text-gray-600 ml-2">Excellence Rating</Text>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-15 h-15 bg-gov-primary rounded-lg flex items-center justify-center text-white text-2xl">
              <BankOutlined />
            </div>
            <div>
              <Title level={4} className="!m-0 !text-uae-brown !font-semibold">
                UNITED ARAB EMIRATES
              </Title>
              <Text className="text-uae-brown text-sm">
                MINISTRY OF COMMUNITY EMPOWERMENT
              </Text>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Search
              placeholder="Search here"
              className="w-80"
              size="large"
            />
            <Button
              icon={<GlobalOutlined />}
              onClick={() => switchLanguage()}
              size="large"
              className="rounded-lg bg-gray-100 border-gray-300"
            >
              {t('navigationLanguages')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="bg-gov-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Space size="large" className="py-3">
            <Button type="link" className="text-white !p-0">
              <HomeOutlined className="mr-2" />
              {t('navigationHome')}
            </Button>
            <Button type="link" className="text-white !p-0">
              <AppstoreOutlined className="mr-2" />
              {t('navigationServices')}
            </Button>
            <Button type="link" className="text-white !p-0">
              Digital Participation
            </Button>
            <Button type="link" className="text-white !p-0">
              Open Data
            </Button>
            <Button type="link" className="text-white !p-0">
              Media Center
            </Button>
            <Button type="link" className="text-white !p-0">
              {t('navigationAbout')}
            </Button>
            <Button type="link" className="text-white !p-0">
              {t('navigationContact')}
            </Button>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default ProfessionalHeader; 