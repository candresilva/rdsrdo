import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

export class EncarregadoRepository extends BaseRepository<typeof prisma.encarregado> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.encarregado);  // Passando o modelo correto para o BaseRepository
  }

  // Encarregados - Listagem --------------------------------------------
  
  async findListagem(id: string) {
    return prisma.encarregado.findUnique({
        where: { id: id },
        select: {
            id: true,
            nome:true
        }
    });
  }

  async findListagemGeral() {
    return prisma.encarregado.findMany({
      select: {
        id: true,
        nome:true
    }
    });
  }
}

