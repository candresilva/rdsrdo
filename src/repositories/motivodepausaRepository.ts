import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class MotivoDePausaRepository extends BaseRepository<typeof prisma.motivoDePausa> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.motivoDePausa);  // Passando o modelo correto para o BaseRepository
  }
}

