import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class MotivoDePausaRepository extends BaseRepository<typeof prisma.motivoDePausa> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.motivoDePausa);  // Passando o modelo correto para o BaseRepository
  }
}

