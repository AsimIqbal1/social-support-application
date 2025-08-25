import React, { useState } from 'react';
import { Modal, Input, Button, Space, Typography, Card, message } from 'antd';
import {
  OpenAIOutlined,
  SendOutlined,
  CheckOutlined,
  EditOutlined,
  CloseOutlined,
  RobotOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/i18n';
import { useAIGeneration } from '@/services/api/ai/hooks';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface WriteWithAIProps {
  fieldName: string;
  fieldLabel: string;
  currentValue: string;
  onAccept: (content: string) => void;
  maxLength?: number;
  context?: Record<string, any>;
}

const WriteWithAI: React.FC<WriteWithAIProps> = ({
  fieldName,
  fieldLabel,
  currentValue,
  onAccept,
  maxLength = 1000,
  context = {},
}) => {
  const { t, language } = useLanguage();

  const {
    data: aiResponseData,
    isLoading: isGenerating,
    error: aiError,
    isError,
    generateContent,
    reset: resetAI,
  } = useAIGeneration();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const [step, setStep] = useState<'prompt' | 'response' | 'edit'>('prompt');
  const [editableContent, setEditableContent] = useState('');

  const aiResponse = aiResponseData?.content || '';

  const handleOpenModal = () => {
    setIsModalVisible(true);
    resetModal();
  };

  const resetModal = () => {
    setUserPrompt('');
    setEditableContent('');
    setStep('prompt');
    resetAI();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    resetModal();
  };

  const callAIGeneration = async () => {
    try {
      const result = await generateContent(
        userPrompt,
        fieldName,
        language,
        context
      );

      if (result?.content) {
        setEditableContent(result.content);
        setStep('response');
      }
    } catch (error) {
      console.error('AI generation failed:', error);
    }
  };

  const handleGenerate = () => {
    if (!userPrompt.trim()) {
      message.warning(t('pleaseEnterPrompt'));
      return;
    }
    callAIGeneration();
  };

  const handleAcceptContent = () => {
    const finalContent = step === 'edit' ? editableContent : aiResponse;
    onAccept(finalContent);
    setIsModalVisible(false);
    message.success(t('contentAccepted'));
    resetModal();
  };

  const handleEditContent = () => {
    setStep('edit');
  };

  const handleDiscardContent = () => {
    setStep('prompt');
    setEditableContent('');
    resetAI();
  };

  const renderPromptStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <RobotOutlined className="text-4xl text-blue-500 mb-2" />
        <Title level={4}>{t('aiWritingAssistant')}</Title>
        <Text type="secondary">{t('aiAssistantDescription')}</Text>
      </div>

      <div>
        <Text strong>{t('describeWhatYouWant')}</Text>
        <TextArea
          value={userPrompt}
          onChange={e => setUserPrompt(e.target.value)}
          placeholder={t('aiPromptPlaceholder', {
            field: fieldLabel.toLowerCase(),
          })}
          rows={4}
          maxLength={maxLength}
          showCount
          className="mt-2"
        />
      </div>

      {currentValue && (
        <div>
          <Text strong>{t('currentContent')}</Text>
          <div className="bg-gray-50 p-3 rounded border mt-2 max-h-60 overflow-y-auto">
            <Text className="text-sm">{currentValue}</Text>
          </div>
        </div>
      )}
    </div>
  );

  const renderResponseStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <CheckOutlined className="text-4xl text-green-500 mb-2" />
        <Title level={4}>{t('aiGeneratedContent')}</Title>
        <Text type="secondary">{t('reviewAndChooseAction')}</Text>
      </div>

      <div>
        <Text strong>{t('generatedContent')}</Text>
        <Card className="mt-2" size="small">
          <div className="max-h-60 overflow-y-auto">
            <Text className="whitespace-pre-wrap">{aiResponse}</Text>
          </div>
          <div className="text-right mt-2">
            <Text type="secondary" className="text-sm">
              {aiResponse.length}/{maxLength} {t('characters')}
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderEditStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <EditOutlined className="text-4xl text-orange-500 mb-2" />
        <Title level={4}>{t('editContent')}</Title>
        <Text type="secondary">{t('makeChangesAsNeeded')}</Text>
      </div>

      <div>
        <Text strong>{t('editableContent')}</Text>
        <TextArea
          value={editableContent}
          onChange={e => setEditableContent(e.target.value)}
          rows={10}
          maxLength={maxLength}
          showCount
          className="mt-2"
        />
      </div>
    </div>
  );

  const renderModalContent = () => {
    if (isGenerating) {
      return (
        <div className="text-center py-8">
          <LoadingOutlined className="text-4xl text-blue-500 mb-4" />
          <Title level={4}>{t('aiGenerating')}</Title>
          <Text type="secondary">{t('pleaseWait')}</Text>
        </div>
      );
    }

    if (isError && aiError && step === 'prompt') {
      return (
        <div className="text-center py-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <Title level={4} type="danger">
            Generation Failed
          </Title>
          <Text type="secondary">
            {aiError.message || 'Something went wrong. Please try again.'}
          </Text>
          <div className="mt-4">
            <Button onClick={() => resetAI()}>Try Again</Button>
          </div>
        </div>
      );
    }

    switch (step) {
      case 'prompt':
        return renderPromptStep();
      case 'response':
        return renderResponseStep();
      case 'edit':
        return renderEditStep();
      default:
        return renderPromptStep();
    }
  };

  const renderModalFooter = () => {
    if (isGenerating) {
      return null;
    }

    switch (step) {
      case 'prompt':
        return (
          <Space>
            <Button onClick={handleCloseModal}>{t('cancel')}</Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleGenerate}
              disabled={!userPrompt.trim()}
            >
              {t('generateContent')}
            </Button>
          </Space>
        );
      case 'response':
        return (
          <Space>
            <Button icon={<CloseOutlined />} onClick={handleDiscardContent}>
              {t('discard')}
            </Button>
            <Button icon={<EditOutlined />} onClick={handleEditContent}>
              {t('edit')}
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleAcceptContent}
            >
              {t('accept')}
            </Button>
          </Space>
        );
      case 'edit':
        return (
          <Space>
            <Button onClick={() => setStep('response')}>{t('back')}</Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleAcceptContent}
            >
              {t('acceptChanges')}
            </Button>
          </Space>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button
        type="text"
        onClick={handleOpenModal}
        className="text-blue-500 hover:text-blue-700 p-1"
      >
        <OpenAIOutlined /> {t('writeWithAI')}
      </Button>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <OpenAIOutlined className="text-blue-500" />
            {t('writeWithAI')} - {fieldLabel}
          </div>
        }
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={renderModalFooter()}
        width={600}
        destroyOnHidden
        maskClosable={false}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default WriteWithAI;
