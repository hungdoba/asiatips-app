'use server';

import prisma from '@/lib/prisma';

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
