'use server';

import prisma from '@/lib/prisma';

export async function getJLPTReadDetail(
  year: string,
  month: string,
  mondai: string
) {
  const mondais = await prisma.jlpt_mondai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      mondai_number: parseInt(mondai),
    },
  });

  const questions = await prisma.jlpt_question.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      mondai_number: parseInt(mondai),
    },
    orderBy: {
      question_number: 'asc',
    },
  });
  return { mondais, questions };
}
