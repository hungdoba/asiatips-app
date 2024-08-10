'use client';

import { useState } from 'react';
import { ClientMessage } from './action';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';

interface Message {
  id: string;
  spinner: React.ReactNode;
  display: React.ReactNode;
  attachments: React.ReactNode;
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl h-full flex flex-col">
      <div className="flex-1 w-full mb-24 overflow-x-hidden overflow-y-auto px-4">
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role == 'user' ? (
              <div className="text-blue-800 dark:text-blue-400">
                {message.display}
              </div>
            ) : (
              <div className="mb-2">{message.display}</div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0  mx-auto w-full">
        <form
          className="max-w-5xl mx-auto"
          onSubmit={async (e) => {
            e.preventDefault();
            setInput('');
            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              { id: nanoid(), role: 'user', display: input },
            ]);

            const message = await continueConversation(input);

            setConversation((currentConversation: ClientMessage[]) => [
              ...currentConversation,
              message,
            ]);
          }}
        >
          <div className="flex items-center px-3 py-2">
            <input
              id="chat"
              className="block mr-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
              onChange={(event) => {
                setInput(event.target.value);
              }}
              value={input}
              defaultValue={''}
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
          </div>
        </form>
      </div>
    </div>
  );
}
