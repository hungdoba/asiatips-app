import 'server-only';
import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  createStreamableValue,
} from 'ai/rsc';

import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { nanoid } from '@/lib/utils';
import { BotMessage, SpinnerMessage } from '@/components/ai-chatbot/message';
import { AIState, Message, UIState } from '@/types/ai-chatbot';

async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`,
      },
    ],
  });

  const history = aiState.get().messages.map((message: Message) => ({
    role: message.role,
    content: message.content,
  }));

  const textStream = createStreamableValue('');
  const spinnerStream = createStreamableUI(<SpinnerMessage />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  (async () => {
    try {
      const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        temperature: 0,
        system: `\
        You name is AsiAI and you are Asiatips's AI assistant. You are a frindly assiatant the helps user with answer the question about life in japan, tips to live in japan and help user learn japanese. 
      `,
        messages: [...history],
      });

      let textContent = '';
      spinnerStream.done(null);

      for await (const delta of result.fullStream) {
        const { type } = delta;

        if (type === 'text-delta') {
          const { textDelta } = delta;

          textContent += textDelta;

          messageStream.update(<BotMessage content={textContent} />);

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent,
              },
            ],
          });
        }
      }

      uiStream.done();
      textStream.done();
      messageStream.done();
    } catch (e) {
      console.error(e);

      const error = new Error(
        'The AI got rate limited, please try again later.'
      );
      uiStream.error(error);
      textStream.error(error);
      messageStream.error(error);
      aiState.done(error);
    }
  })();

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value,
  };
}

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage,
  },
  initialUIState: [],
  initialAIState: { chatId: nanoid(), interactions: [], messages: [] },
});
