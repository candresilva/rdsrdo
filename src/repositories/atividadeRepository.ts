import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class AtividadeRepository extends BaseRepository<typeof prisma.atividade> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.atividade);  // Passando o modelo correto para o BaseRepository
  }
}

