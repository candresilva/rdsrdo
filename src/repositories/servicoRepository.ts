import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';

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

async findByServico(servicoId: string) {
  return prisma.servico_Atividade.findMany({
    where: {
        servicoId      }
  });

}

async findAssociations() {
  return prisma.servico_Atividade.findMany();
}

async getAssociationsComNome(id: string) {
  const data = await prisma.servico_Atividade.findMany({
    where: {
      ativo: true,
      servicoId: id  // Filtra apenas as associações onde ativo é true
    },
    include: {
      servico: { select: { id: true, nome: true } },  // Inclui dados do serviço relacionado
      atividade: { select: { id: true, nome: true } }  // Inclui apenas o id e nome da atividade
    }
  });

  // Agrupa as atividades por servicoId
  const result = data.reduce((acc, item) => {
    // Verifica se já existe um serviço no acumulador
    if (!acc[item.servicoId]) {
      acc[item.servicoId] = {
        servicoId: item.servicoId,
        nome: item.servico.nome,  // Nome do serviço
        atividades: [],
      };
    }

    // Adiciona a atividade ao serviço correspondente
    acc[item.servicoId].atividades.push({
      atividadeId: item.atividadeId,
      nome: item.atividade.nome
    });

    return acc;
  }, {} as Record<string, { servicoId: string; nome: string; atividades: { atividadeId: string, nome: string, inicio?: string | null, fim?: string | null }[] }>);

  // Converte o objeto de serviços para um array
  return Object.values(result);
}

async getAllAssociationsComNome() {
  const data = await prisma.servico_Atividade.findMany({
    where: {
      ativo: true,  // Filtra apenas as associações onde ativo é true
    },
    include: {
      servico: { select: { id: true, nome: true } },  // Inclui dados do serviço relacionado
      atividade: { select: { id: true, nome: true } }  // Inclui apenas o id e nome da atividade
    }
  });

  // Agrupa as atividades por servicoId
  const result = data.reduce((acc, item) => {
    // Verifica se já existe um serviço no acumulador
    if (!acc[item.servicoId]) {
      acc[item.servicoId] = {
        servicoId: item.servicoId,
        nome: item.servico.nome,  // Nome do serviço
        atividades: [],
      };
    }

    // Adiciona a atividade ao serviço correspondente
    acc[item.servicoId].atividades.push({
      atividadeId: item.atividadeId,
      nome: item.atividade.nome
    });

    return acc;
  }, {} as Record<string, { servicoId: string; nome: string; atividades: { atividadeId: string, nome: string, inicio?: string | null, fim?: string | null }[] }>);

  // Converte o objeto de serviços para um array
  return Object.values(result);
}


}

