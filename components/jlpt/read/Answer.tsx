'use client';

import { useEffect, useState } from 'react';
import AnswerOption from '../AnswerOption';
import { jlpt_question } from '@prisma/client';

interface Props {
  question: jlpt_question;
  selectedOption: number;
  selectOption: (value: number) => void;
  hintShowed: boolean;
  showExplain: () => void;
}

// Utility function to get the option text safely
const getOptionText = (
  question: jlpt_question,
  optionNumber: number
): string | null => {
  switch (optionNumber) {
    case 1:
      return question.option_1;
    case 2:
      return question.option_2;
    case 3:
      return question.option_3;
    case 4:
      return question.option_4;
    default:
      return null;
  }
};

const getMaxTextLength = (question: jlpt_question): number => {
  const lengths = [
    question.option_1,
    question.option_2,
    question.option_3,
    question.option_4,
  ].map((text) => text?.length ?? 0);
  return Math.max(...lengths);
};

export default function Answer({
  question,
  hintShowed,
  selectOption,
  selectedOption,
  showExplain,
}: Props) {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const maxTextLength = getMaxTextLength(question);

    const handleResize = () => {
      const screenWidth = window.innerWidth;

      let cols;
      if (screenWidth <= 768) {
        cols = maxTextLength > 6 ? 1 : 2;
      } else {
        if (maxTextLength < 10) {
          cols = 4;
        } else if (maxTextLength < 25) {
          cols = 2;
        } else {
          cols = 1;
        }
      }
      setColumns(cols);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [question]);

  return (
    <div className={`mb-4 ml-4 grid grid-flow-row grid-cols-${columns}`}>
      {[1, 2, 3, 4].map((optionNumber) => (
        <AnswerOption
          key={optionNumber}
          optionNumber={optionNumber}
          optionText={getOptionText(question, optionNumber)}
          isCorrectAnswer={question.answer === optionNumber}
          showHint={hintShowed}
          showExplain={showExplain}
          selected={selectedOption === optionNumber}
          select={() => selectOption(optionNumber)}
        />
      ))}
    </div>
  );
}
