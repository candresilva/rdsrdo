import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class RDOSRepository extends BaseRepository<typeof prisma.rDOS> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.rDOS);  // Passando o modelo correto para o BaseRepository
  }
}

