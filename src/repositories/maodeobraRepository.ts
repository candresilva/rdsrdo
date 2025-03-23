import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class MaoDeObraRepository extends BaseRepository<typeof prisma.maoDeObra> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.maoDeObra);  // Passando o modelo correto para o BaseRepository
  }
}

