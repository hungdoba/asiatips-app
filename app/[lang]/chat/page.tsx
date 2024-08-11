import { AI } from './actions';
import { Chat } from '@/components/ai-chatbot/chat';

export const metadata = {
  title: 'Asiatips AI Chatbot',
};

export default async function IndexPage() {
  return (
    <div className="fixed top-28 left-0 w-full h-[calc(100vh-96px)] bg-white dark:bg-slate-800">
      <AI>
        <Chat />;
      </AI>
    </div>
  );
}
