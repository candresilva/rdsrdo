import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class EquipamentoRepository extends BaseRepository<typeof prisma.equipamento> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.equipamento);  // Passando o modelo correto para o BaseRepository
  }
}

