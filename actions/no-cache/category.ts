'use server';
import prisma from '@/lib/prisma';

export async function getCategories() {
  try {
    const categories = await prisma.post_category.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        active: true,
      },
    });
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return [];
  }
}
