'use server';
import prisma from '@/lib/prisma';

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
