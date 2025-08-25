import React, { useState } from 'react';
import { Modal, Input, Button, Space, Typography, Divider, Card, message } from 'antd';
import {
    OpenAIOutlined,
    SendOutlined,
    CheckOutlined,
    EditOutlined,
    CloseOutlined,
    RobotOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { useLanguage } from '../../i18n/hooks/useLanguage';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface WriteWithAIProps {
    fieldName: string;
    fieldLabel: string;
    currentValue: string;
    onAccept: (content: string) => void;
    placeholder?: string;
    maxLength?: number;
}

const WriteWithAI: React.FC<WriteWithAIProps> = ({
    fieldName,
    fieldLabel,
    currentValue,
    onAccept,
    placeholder = '',
    maxLength = 1000,
}) => {
    const { t } = useLanguage();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [step, setStep] = useState<'prompt' | 'response' | 'edit'>('prompt');
    const [editableContent, setEditableContent] = useState('');

    const handleOpenModal = () => {
        setIsModalVisible(true);
        resetModal();
    };

    const resetModal = () => {
        setUserPrompt('');
        setAiResponse('');
        setEditableContent('');
        setStep('prompt');
        setIsGenerating(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        resetModal();
    };

    const simulateAIGeneration = async () => {
        setIsGenerating(true);

        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock AI response based on field type and user prompt
        const mockResponses = {
            currentFinancialSituation: `Based on your request, here's a draft for your current financial situation:

I am currently experiencing financial difficulties due to reduced income and increased expenses. My monthly income has decreased by approximately 40% over the past six months, making it challenging to meet basic living expenses including rent, utilities, and groceries. 

The main factors contributing to my financial hardship include [specific reasons based on your situation]. Despite my efforts to manage expenses and seek additional income sources, I require temporary financial assistance to stabilize my situation and get back on track.

I have explored various options including budgeting, reducing non-essential expenses, and seeking part-time work opportunities. However, the gap between my current income and essential expenses remains significant.`,

            employmentCircumstances: `Here's a professional description of your employment circumstances:

Currently, I am facing employment challenges that have significantly impacted my financial stability. [Specific employment situation - unemployed/underemployed/recent job loss]. 

Prior to this situation, I was employed as [previous position] where I gained valuable experience and maintained steady employment for [duration]. However, due to [circumstances - company downsizing/industry changes/personal circumstances], my employment status changed.

I am actively seeking new employment opportunities and have been [specific actions taken - submitting applications, attending interviews, networking, skills training]. I am committed to returning to full-time employment and have been exploring opportunities in [relevant fields/industries].

My goal is to secure stable employment that will allow me to regain financial independence and no longer require assistance.`,

            reasonForApplying: `Here's a compelling reason for your application:

I am applying for social welfare assistance because I am currently facing temporary financial hardship that has made it difficult to meet my basic living needs. Despite my best efforts to manage my finances and seek additional income sources, I find myself in need of support to ensure stability for myself and my family.

This assistance would provide crucial support during this challenging period and help me maintain housing, nutrition, and other essential needs while I work toward regaining financial independence. I view this support as a temporary bridge that will enable me to get back on my feet.

I am committed to using this assistance responsibly and am actively working on improving my situation through [specific steps - job searching, skills development, budgeting]. My goal is to become self-sufficient again as soon as possible.

The support would make a significant difference in maintaining stability and dignity during this difficult time.`
        };

        const response = mockResponses[fieldName as keyof typeof mockResponses] ||
            `Here's a professional response for ${fieldLabel.toLowerCase()}:\n\n${userPrompt}\n\nThis content has been enhanced for clarity and professionalism while maintaining your personal voice and circumstances.`;

        setAiResponse(response);
        setEditableContent(response);
        setStep('response');
        setIsGenerating(false);
    };

    const handleGenerate = () => {
        if (!userPrompt.trim()) {
            message.warning(t('pleaseEnterPrompt'));
            return;
        }
        simulateAIGeneration();
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
        setAiResponse('');
        setEditableContent('');
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
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder={t('aiPromptPlaceholder', { field: fieldLabel.toLowerCase() })}
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
                    onChange={(e) => setEditableContent(e.target.value)}
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
                        <Button onClick={handleCloseModal}>
                            {t('cancel')}
                        </Button>
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
                        <Button onClick={() => setStep('response')}>
                            {t('back')}
                        </Button>
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
                title={t('writeWithAI')}
            >
                Write with AI <OpenAIOutlined />
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
