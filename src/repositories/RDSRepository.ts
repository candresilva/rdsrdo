import { RDS } from '@prisma/client';  // Importando o tipo do modelo
import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

class RDSRepository extends BaseRepository<typeof prisma.rDS> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.rDS);  // Passando o modelo correto para o BaseRepository
  }

  async findByDate(date: Date): Promise<RDS[]> {
    return prisma.rDS.findMany({
      where: { data: date }
    });
  }
}

export default new RDSRepository();
