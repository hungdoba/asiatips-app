'use server';
import prisma from '@/lib/prisma';

export async function subscribe(formData: FormData) {
  const email = formData.get('email') as string;
  try {
    await prisma.subscribe.create({
      data: {
        email: email,
      },
    });
    return true;
  } catch {
    return false;
  }
}
