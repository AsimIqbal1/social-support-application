import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title, Text } = Typography;

const ProfessionalHeader: React.FC = () => {
  // const { t, switchLanguage } = useLanguage();

  return (
    <Header className="fixed top-0 w-full z-50 p-0 bg-white shadow-header h-auto">
      {/* Main Header */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Title level={4} className="!m-0 !text-uae-brown !font-semibold">
                UNITED ARAB EMIRATES |
              </Title>
              <Text className="text-uae-brown text-sm">
                MINISTRY OF COMMUNITY EMPOWERMENT
              </Text>
            </div>
          </div>

        </div>
      </div>
    </Header>
  );
};

export default ProfessionalHeader;
