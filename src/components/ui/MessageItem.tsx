import React from 'react';
import { ClientMessage } from '@/types/types';
import Skeleton from './Skeleton';

export interface MessageItemProps {
    message: ClientMessage;
    isFirst: boolean;
    isLoading: boolean;
    isLastAssistantMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isFirst, isLoading, isLastAssistantMessage }) => {
    const formattedTime = message?.date?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    const role = message.role === "user" ? "Me" : process.env.NEXT_PUBLIC_ASSISTANT_NAME;
    
    return (
        <div className={`flex ${isFirst ? "pb-2" : "py-2"} ${message.role === "user" ? "justify-end" : "justify-start"} items-end`}>
            <div className={`flex flex-col w-[100%] rounded-2xl p-2 ${message.role === "user" ? "bg-blue-600 text-white dark:bg-white/15 dark:text-foreground" : "bg-gray-700/5 text-gray-700 dark:bg-white/5 dark:text-gray-200"} backdrop-blur-md markdown-body`}>
                <div className='font-antique'>
                    {isLoading && isLastAssistantMessage && message.role === 'assistant' ? (
                        <Skeleton />
                    ) : (
                        message.display
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