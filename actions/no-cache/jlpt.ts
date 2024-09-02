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
export async function getJLPTListenFullDetail(year: string, month: string) {
  const datas = await prisma.jlpt_chokai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
    },
  });
  return datas;
}

// Has cache function
export async function getJLPTReadFullDetail(year: string, month: string) {
  const mondais = await prisma.jlpt_mondai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
    },
  });

  const questions = await prisma.jlpt_question.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
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

// For admin update jlpt mondai content
export async function updateMondaiContent(formData: FormData): Promise<any> {
  const id = formData.get('id') as string;
  const mondai_content = formData.get('mondai_content') as string;

  try {
    await prisma.jlpt_mondai.update({
      where: {
        id: Number(id),
      },
      data: {
        mondai_content: mondai_content,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
}

// For admin update jlpt mondai note
export async function updateMondaiNote(formData: FormData): Promise<any> {
  const id = formData.get('id') as string;
  const note = formData.get('note') as string;

  try {
    await prisma.jlpt_mondai.update({
      where: {
        id: Number(id),
      },
      data: {
        note: note,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
}
