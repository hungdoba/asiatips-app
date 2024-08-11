'use client';

import { useState } from 'react';
import { useUIState } from 'ai/rsc';
import { ChatList } from '@/components/ai-chatbot/chat-list';
import { PromptForm } from '@/components/ai-chatbot/prompt-form';

export function Chat() {
  const [input, setInput] = useState('');
  const [messages] = useUIState();
  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl h-full flex flex-col">
      <div className="flex-1 w-full mb-24 overflow-x-hidden overflow-y-auto px-4">
        <ChatList messages={messages} />
      </div>
      <div className="fixed bottom-0 left-0 mx-auto w-full p-2 md:pb-4">
        <PromptForm input={input} setInput={setInput} />
      </div>
    </div>
  );
}
