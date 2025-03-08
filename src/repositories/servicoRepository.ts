import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class ServicoRepository extends BaseRepository<typeof prisma.servico> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.servico);  // Passando o modelo correto para o BaseRepository
  }
}

