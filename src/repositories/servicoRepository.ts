import prisma from '../database/prismaClient';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository';

export class ServicoRepository extends BaseRepository<typeof prisma.servico> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.servico);  // Passando o modelo correto para o BaseRepository
  }

async buscarAssociacao(servicoId: string, atividadeId: string) {
    return await prisma.servico_Atividade.findUnique({
        where: {
            servicoId_atividadeId: {
                servicoId,
                atividadeId,
            },
        },
    });
};

async criarAssociacao(servicoId: string, atividadeId: string) {
    return await prisma.servico_Atividade.create({
        data: {
            servicoId,
            atividadeId,
            ativo:true,
        },
    });
};
async findByServicoAndAtividade(servicoId: string, atividadeId: string) {
  return prisma.servico_Atividade.findUnique({
    where: {
      servicoId_atividadeId: {
        servicoId,
        atividadeId
      }
    }
  });
}

async updateStatus(servicoId: string, atividadeId: string, novoStatus: boolean) {
  return prisma.servico_Atividade.update({
    where: {
      servicoId_atividadeId: {
        servicoId,
        atividadeId
      }
    },
    data: {
      ativo: novoStatus
    }
  });
}
}

