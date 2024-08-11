import { spinner } from '@/components/ai-chatbot/spinner';

export default function loading() {
  return (
    <div className="flex container mx-auto w-full mt-4 md:max-w-5xl animate-pulse items-center justify-center">
      {spinner}
    </div>
  );
}
