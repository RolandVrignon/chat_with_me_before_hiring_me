import React, { useEffect } from 'react';
import { Message } from 'ai';
import Skeleton from './Skeleton';
import { MarkdownInterpretor } from '../ai-components/markdownInterpretor';
import { PdfThumbnail } from '../ai-components/pdfThumbnail';
export interface MessageItemProps {
    message: Message;
    isFirst: boolean;
    isLoading: boolean;
    isLastAssistantMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isFirst, isLoading, isLastAssistantMessage }) => {
    const formattedTime = message?.createdAt?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const role = message.role === "user" ? "Me" : process.env.NEXT_PUBLIC_ASSISTANT_NAME;

    useEffect(() => {
        console.log('message.parts:', JSON.stringify(message.parts, null, 2))
    }, [message])

    const renderPart = (part: any) => {
        if (part.type === 'tool-invocation') {
            if (part.toolInvocation.toolName === 'getResume') {
                return <PdfThumbnail />;
            }
            else if (part.toolInvocation.toolName === 'getContact') {
                return (
                    <div className='w-full my-2'>
                        <div className='bg-red-500 w-full h-20 rounded my-2' />
                    </div>
                );
            }
        }
        else if (part.type === 'text') {
            return <MarkdownInterpretor content={part.text} />;
        }
        return null;
    };

    return (
        <div className={`flex ${isFirst ? "pb-2" : "py-2"} ${message.role === "user" ? "justify-end" : "justify-start"} items-end`}>
            <div className={`flex flex-col w-[100%] rounded-2xl p-2 ${message.role === "user" ? "bg-blue-600 text-white dark:bg-white/15 dark:text-foreground" : "bg-gray-700/5 text-gray-700 dark:bg-white/5 dark:text-gray-200"} backdrop-blur-md markdown-body`}>
                <div className='font-antique'>
                    {isLoading && isLastAssistantMessage && message.role === 'assistant' ? (
                        <Skeleton />
                    ) : (
                        message.parts?.map((part, index) => (
                            <React.Fragment key={index}>
                                {renderPart(part)}
                            </React.Fragment>
                        ))
                    )}
                </div>
                {formattedTime && (
                    <div className="flex w-full justify-end font-doto text-xs mt-2">
                        {role} - {formattedTime}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageItem;