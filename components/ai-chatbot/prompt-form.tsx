'use client';

import * as React from 'react';
import { useActions, useUIState } from 'ai/rsc';

import { nanoid } from 'nanoid';
import { type AI } from '../../app/[lang]/chat/actions';
import { UserMessage } from '@/components/ai-chatbot/message';

export function PromptForm({
  input,
  setInput,
}: {
  input: string;
  setInput: (value: string) => void;
}) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const { submitUserMessage } = useActions();
  const [_, setMessages] = useUIState<typeof AI>();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      className="flex flex-row items-center max-w-3xl mx-auto"
      onSubmit={async (e: any) => {
        e.preventDefault();

        const value = input.trim();
        setInput('');
        if (!value) return;

        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>,
          },
        ]);

        const responseMessage = await submitUserMessage(value);
        setMessages((currentMessages) => [...currentMessages, responseMessage]);
      }}
    >
      <input
        id="chat"
        className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your message..."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
      />
      <button
        type="submit"
        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
      >
        <svg
          className="w-5 h-5 rotate-90 rtl:-rotate-90"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
        <span className="sr-only">Send message</span>
      </button>
    </form>
  );
}
