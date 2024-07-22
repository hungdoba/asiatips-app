'use client';

import { useState } from 'react';

import Answer from './Answer';
import Explain from '../Explain';
import { jlpt_question } from '@prisma/client';
import Question from './Question';

interface Props {
  question: jlpt_question;
  session: any;
}

export default function QAE({ question, session }: Props) {
  const [hintShowed, setShowHint] = useState(false);
  const [showExplain, setShowExplain] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  function handleSelectOption(value: number): void {
    if (value == selectedOption) {
      setSelectedOption(0);
      return;
    }
    setSelectedOption(value);
  }

  return (
    <div>
      <Question
        question={question}
        hintShowed={hintShowed}
        showHint={() => setShowHint(!hintShowed)}
      />
      <Answer
        question={question}
        hintShowed={hintShowed}
        showExplain={() => setShowExplain(!showExplain)}
        selectOption={(value: number) => handleSelectOption(value)}
        selectedOption={selectedOption}
      />
      {showExplain && (
        <Explain
          question_id={question.id}
          content={question.explanation}
          session={session}
        />
      )}
    </div>
  );
}
