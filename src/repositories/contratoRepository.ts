import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class ContratoRepository extends BaseRepository<typeof prisma.contrato> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.contrato);  // Passando o modelo correto para o BaseRepository
  }

  async findByEmpresa(empresaId: string) {
    console.log("Filtrando contratos por empresaId:", empresaId);
    return prisma.contrato.findMany({
      where: { empresaId: { equals: empresaId } }
    });
  }
  
}

