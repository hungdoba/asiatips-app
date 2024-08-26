'use client';
import { updateMondaiContent, updateMondaiNote } from '@/actions/no-cache/jlpt';
import { jlpt_mondai } from '@prisma/client';
import { useState } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';

interface Props {
  session: any;
  mondai: jlpt_mondai;
}

export default function MondaiContent({ session, mondai }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(mondai.mondai_content);
  const [transalte, setTranslate] = useState(mondai.note ?? '');
  const [contentUpdated, setContentUpdated] = useState<true | false | null>(
    null
  );
  const [noteUpdated, setNoteUpdated] = useState<true | false | null>(null);
  const [showHint, setShowHint] = useState(false);

  const handleSubmitChangeContent = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', String(mondai.id));
    formData.append('mondai_content', content);

    const result = await updateMondaiContent(formData);
    setContentUpdated(result);
    setEditMode(!result);
  };

  const handleSubmitChangeNote = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setNoteUpdated(null);
    const formData = new FormData();
    formData.append('id', String(mondai.id));
    formData.append('note', transalte);
    const result = await updateMondaiNote(formData);
    setNoteUpdated(result);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2>
          {mondai.mondai_number > 80 && `（${mondai.mondai_number % 10}）`}
        </h2>
        <FaRegLightbulb
          onClick={() => setShowHint(!showHint)}
          className={`w-4 h-4 ml-2 cursor-pointer ${
            showHint ? 'text-yellow-600' : ''
          }`}
        />
      </div>
      <form onSubmit={handleSubmitChangeContent}>
        {session && editMode ? (
          <textarea
            className="w-full min-h-72 p-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <h2
            className="my-4 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
        <div className="flex flex-row items-center">
          {session && (
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
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
          {contentUpdated != null &&
            (contentUpdated ? (
              <p className="text-green-500">Success</p>
            ) : (
              <p className="text-red-500">Fail</p>
            ))}
        </div>
      </form>

      {showHint && (
        <form onSubmit={handleSubmitChangeNote}>
          {session ? (
            <>
              <textarea
                className="w-full min-h-72 p-4"
                value={transalte}
                onChange={(e) => setTranslate(e.target.value)}
              />
              <div className="flex flex-row items-center">
                <button
                  type="submit"
                  className="mb-4 mr-4 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Save
                </button>
                {noteUpdated != null &&
                  (noteUpdated ? (
                    <p className="text-green-500">Success</p>
                  ) : (
                    <p className="text-red-500">Fail</p>
                  ))}
              </div>
            </>
          ) : (
            <p
              className="rounded border p-4 my-4 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: transalte,
              }}
            />
          )}
        </form>
      )}
    </div>
  );
}
