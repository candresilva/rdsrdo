import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class ContratoRepository extends BaseRepository<typeof prisma.contrato> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.contrato);  // Passando o modelo correto para o BaseRepository
  }

// Contratos - Listagem --------------------------------------------

  async findByEmpresa(empresaId: string) {
    console.log("Filtrando contratos por empresaId:", empresaId);
    return prisma.contrato.findMany({
      where: { empresaId: { equals: empresaId } }
    });
  }
  
  async findListagem(id: string) {
    return prisma.contrato.findUnique({
        where: { id: id },
        select: {
            id: true,
            empresa: {
              select: {nome:true}
            },
            descricao: true,
            numeroDoContrato: true,
        }
    });
  }

  async findListagemGeral() {
    return prisma.contrato.findMany({
      select: {
        id: true,
        empresa: {
          select: {nome:true}
        },
        descricao: true,
        numeroDoContrato: true,
    }
    });
  }

}

