import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class EncarregadoRepository extends BaseRepository<typeof prisma.encarregado> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.encarregado);  // Passando o modelo correto para o BaseRepository
  }
}

