'use server';

import prisma from '@/lib/prisma';

// Has cache function
export async function getJLPTTimes() {
  const times = await prisma.jlpt_mondai.findMany({
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
    select: {
      year: true,
      month: true,
    },
  });

  const data = Array.from(
    new Set(times.map((time) => `${time.year}-${time.month}`))
  ).map((uniqueTime) => {
    const [year, month] = uniqueTime.split('-').map(Number);
    return { year, month };
  });
  return data;
}

// Has cache function
export async function getJLPTListenDetail(
  year: string,
  month: string,
  mondai: string
) {
  const datas = await prisma.jlpt_chokai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      mondai_number: parseInt(mondai),
    },
  });
  return datas;
}

// Has cache function
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

// For admin update jlpt explain
export async function updateQuestionExplain(formData: FormData): Promise<any> {
  const id = formData.get('id') as string;
  const explanation = formData.get('explanation') as string;

  try {
    await prisma.jlpt_question.update({
      where: {
        id: Number(id),
      },
      data: {
        explanation: explanation,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
}
