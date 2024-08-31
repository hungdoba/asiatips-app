import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  session?: any;
  content: string;
  setContent: (content: string) => void;
  handleSubmitChange: (e: React.FormEvent<HTMLFormElement>) => void;
  updated: boolean | null;
}

export default function EditableText({
  session,
  content,
  setContent,
  handleSubmitChange,
  updated,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    [setContent]
  );

  const changeEditMode = useCallback(() => {
    setEditMode((prev) => !prev);
  }, []);

  const adaptTextAreaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (updated) {
      setEditMode(false);
    }
  }, [updated]);

  useEffect(() => {
    adaptTextAreaHeight();
  }, [content, editMode, adaptTextAreaHeight]);

  return (
    <form onSubmit={handleSubmitChange}>
      {session && editMode ? (
        <textarea
          ref={textareaRef}
          style={{ overflow: 'hidden', resize: 'none' }}
          className="w-full p-4"
          value={content}
          onChange={handleInput}
        />
      ) : (
        <h2
          className="my-4 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      <div className="flex flex-row items-center">
        {session && (
          <button
            type="button"
            onClick={changeEditMode}
            className="mb-4 mr-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Edit
          </button>
        )}
        {editMode && (
          <button
            type="submit"
            className="mr-4 mb-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Save
          </button>
        )}
        {updated != null && (
          <p className={updated ? 'text-green-500' : 'text-red-500'}>
            {updated ? 'Success' : 'Fail'}
          </p>
        )}
      </div>
    </form>
  );
}
