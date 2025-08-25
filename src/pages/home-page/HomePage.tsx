import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import { useLanguage } from '@/i18n/hooks/useLanguage';

// Import all the extracted components
import HeroSection from './components/HeroSection';
import ServiceInfo from './components/ServiceInfo';
import BenefitsGrid from './components/BenefitsGrid';
import HowItWorks from './components/HowItWorks';
import Sidebar from './components/Sidebar';

const { Content, Footer } = Layout;
const { Paragraph } = Typography;

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <Layout className="min-h-screen bg-uae-cream">
      <Content className="pt-20">
        <div className="bg-uae-cream min-h-screen py-10 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <Row gutter={[40, 40]}>
              <Col xs={24} lg={16}>
                <div className="bg-white rounded-card overflow-hidden shadow-card">
                  <HeroSection />
                  <ServiceInfo />
                  <BenefitsGrid />
                  <HowItWorks />
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <Sidebar />
              </Col>
            </Row>
          </div>
        </div>
      </Content>

      <Footer className="bg-gov-dark text-white py-10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <Paragraph className="text-gray-400 m-0 text-sm">
            {t('footer')}
          </Paragraph>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;
