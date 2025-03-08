import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class MaoDeObraRepository extends BaseRepository<typeof prisma.maoDeObra> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.maoDeObra);  // Passando o modelo correto para o BaseRepository
  }
}

