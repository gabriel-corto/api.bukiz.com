import { PrismaClient } from '@prisma/client';
import { ulid } from 'ulidx';
import { booksMock } from '../mocks/books';

const prisma = new PrismaClient();

async function main() {
  console.log('[1] - Limpando a base de dados da Bukiz...');

  await prisma.book.deleteMany();

  console.log('[2] - Cadastrando livros...');

  for (const item of booksMock) {
    const id = ulid();
    const createdAt = new Date();

    await prisma.book.create({
      data: {
        id,
        createdAt,
        title: item.title,
        author: item.author,
        category: item.category,
        price: item.price,
        stock: item.stock,
        cover: item.cover,
      },
    });
  }

  console.log(
    `[3] - Missão cumprida! ${booksMock.length} livros prontos na prateleira.`,
  );
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
