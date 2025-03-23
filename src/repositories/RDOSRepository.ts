import prisma from '../database/prismaClient.js';  // Certifique-se de importar o prisma corretamente
import { BaseRepository } from '../database/BaseRepository.js';


export class RDOSRepository extends BaseRepository<typeof prisma.rDOS> {  // Usando o tipo correto aqui
  constructor() {
    super(prisma.rDOS);  // Passando o modelo correto para o BaseRepository
  }

// RDOS_Servico --------------------------------------------


async criarAssociacao(rdosId: string, servicoId: string) {
    return await prisma.rDOS_Servico.create({
        data: { rdosId, servicoId }
    });
}

async excluirAssociacao(rdosId: string, servicoId: string) {
  return await prisma.rDOS_Servico.delete({
      where: {rdosId_servicoId: { rdosId, servicoId }}
  });
}

async findByRDOSAndServico(rdosId: string, servicoId: string) {
  return prisma.rDOS_Servico.findUnique({
    where: {
      rdosId_servicoId: {
        rdosId,
        servicoId
      }
    }
  });
}

// Potencial para implementar: busca por serviço. Está sem rota 
async findByServico(servicoId: string) {
    return prisma.rDOS_Servico.findMany({
      where: {
          servicoId      }
    });
}

async findByRDOS(rdosId: string) {
    return prisma.rDOS_Servico.findMany({
      where: {
          rdosId      }
    });
}
  
async findAssociations() {
  return prisma.rDOS_Servico.findMany();
}
      

// RDOS_Atividade --------------------------------------------
async criarAssociacaoAtividade(rdosId: string, atividadeId: string) {
  return await prisma.rDOS_Atividade.create({
      data: { rdosId, atividadeId }
  });
}

async excluirAssociacaoAtividade(rdosId: string, atividadeId: string) {
return await prisma.rDOS_Atividade.delete({
    where: {rdosId_atividadeId: { rdosId, atividadeId }}
});
}

async findByRDOSAndAtividade(rdosId: string, atividadeId: string) {
return prisma.rDOS_Atividade.findUnique({
  where: {
    rdosId_atividadeId: {
      rdosId,
      atividadeId
    }
  }
});
}

// Potencial para implementar: busca por atividade. Está sem rota 
async findByAtividade(atividadeId: string) {
  return prisma.rDOS_Atividade.findMany({
    where: {
        atividadeId      }
  });
}

async findAtividadeByRDOS(rdosId: string) {
  return prisma.rDOS_Atividade.findMany({
    where: {
        rdosId      }
  });
}

async findAssociationsAtividades() {
return prisma.rDOS_Atividade.findMany();
}

async updateAtividade(rdosId: string, atividadeId: string, data: any) {
  return prisma.rDOS_Atividade.update({ where: { rdosId_atividadeId :
    {
    rdosId,
    atividadeId},
  },
    data 
  });
}


// RDOS_Servico_Atividade --------------------------------------------
async associarRDOSServicoComAtividades(rdosId: string, servicoId: string) {
  // 1. Buscar todas as atividades ativas associadas ao serviço
  const atividadesAssociadas = await prisma.servico_Atividade.findMany({
    where: {
      servicoId: servicoId,
      ativo: true
    },
    select: {
      atividadeId: true
    }
  });

  const atividadeIds = atividadesAssociadas.map(a => a.atividadeId);

  if (atividadeIds.length === 0) {
    return { message: 'Nenhuma atividade ativa associada ao serviço.' };
  }

  // 2. Buscar atividades já associadas ao RDO
  const atividadesExistentes = await prisma.rDOS_ServicoAtividade.findMany({
    where: {
      rdosId: rdosId,
      atividadeId: { in: atividadeIds }
    },
    select: {
      atividadeId: true
    }
  });

  const atividadesExistentesIds = atividadesExistentes.map(a => a.atividadeId);

  // 3. Filtrar atividades que ainda não foram associadas ao RDO
  const novasAtividades = atividadeIds.filter(id => !atividadesExistentesIds.includes(id));

  // 4. Inserir apenas as novas atividades na tabela `rdos_atividade`
  if (novasAtividades.length > 0) {
    await prisma.rDOS_ServicoAtividade.createMany({
      data: novasAtividades.map(atividadeId => ({
        rdosId,
        servicoId,
        atividadeId
      }))
    });
  }

  // 5. Retornar quais atividades foram inseridas e quais já existiam
  return {
    adicionadas: novasAtividades.length > 0 ? novasAtividades : 'Nenhuma nova atividade foi adicionada.',
    jaExistiam: atividadesExistentesIds.length > 0 ? atividadesExistentesIds.map(id => `${id} ...já existe...`) : 'Nenhuma atividade já existente.'
  };
}

async desassociarRDOSServicoComAtividades(rdosId: string, servicoId: string) {
  const resultado = await prisma.rDOS_ServicoAtividade.deleteMany({
    where: {
      rdosId: rdosId,
      servicoId: servicoId
    }
  });

  return {
    message: resultado.count > 0
      ? `Foram removidas ${resultado.count} atividades associadas ao serviço.`
      : 'Nenhuma atividade foi removida.'
  }

}

// RDOS_Equipamentos --------------------------------------------

async criarAssociacaoEquipamento(rdosId: string, equipamentoId: string, quantidade: number) {
  return await prisma.rDOS_Equipamento.create({
      data: { rdosId, equipamentoId , quantidade}
  });
}

async excluirAssociacaoEquipamento(rdosId: string, equipamentoId: string) {
  return await prisma.rDOS_Equipamento.delete({
      where: {rdosId_equipamentoId: { rdosId, equipamentoId }}
  });
}

async findByRDOSAndEquipamento(rdosId: string, equipamentoId: string) {
  return prisma.rDOS_Equipamento.findUnique({
    where: {
      rdosId_equipamentoId: {
        rdosId,
        equipamentoId
      }
    }
  });
}

async findEquipamentoByRDOS(rdosId: string) {
    return prisma.rDOS_Equipamento.findMany({
      where: {
          rdosId      }
    });
}
  
async findAssociationsEquipamento() {
  return prisma.rDOS_Equipamento.findMany();
}
      
async updateEquipment(rdosId: string, equipamentoId: string, data: any) {
    return prisma.rDOS_Equipamento.update({ where: { rdosId_equipamentoId :
      {
      rdosId,
      equipamentoId},
    },
      data 
    });
}

// RDOS_MaodeObra --------------------------------------------

async criarAssociacaoMaodeObra(rdosId: string, maoDeObraId: string, quantidade: number) {
  return await prisma.rDOS_MaoDeObra.create({
      data: { rdosId, maoDeObraId, quantidade }
  });
}
  
async excluirAssociacaoMaodeObra(rdosId: string, maoDeObraId: string) {
  return await prisma.rDOS_MaoDeObra.delete({
      where: {rdosId_maoDeObraId: { rdosId, maoDeObraId }}
  });
}
  
async findByRDOSAndMaodeObra(rdosId: string, maoDeObraId: string) {
  return prisma.rDOS_MaoDeObra.findUnique({
    where: {
      rdosId_maoDeObraId: {
        rdosId,
        maoDeObraId
      }
    }
  });
}
  
async findMaodeObraByRDOS(rdosId: string) {
  return prisma.rDOS_MaoDeObra.findMany({
    where: {
        rdosId      }
  });
}
    
async findAssociationsMaodeObra() {
  return prisma.rDOS_MaoDeObra.findMany();
}
        
async updateMaodeObra(rdosId: string, maoDeObraId: string, data: any) {
  return prisma.rDOS_MaoDeObra.update({ where: { rdosId_maoDeObraId :
    {
      rdosId,
      maoDeObraId},
    },
      data 
    });
}

// RDOS_Motivos --------------------------------------------

async criarAssociacaoMotivo(rdosId: string, motivoPausaId: string,
  dataHoraInicio:Date, dataHoraFim:Date
) {
  return await prisma.rDOS_MotivoDePausa.create({
      data: { rdosId, motivoPausaId, dataHoraInicio, dataHoraFim }
  });
}

async excluirAssociacaoMotivo(rdosId: string, motivoPausaId: string) {
  return await prisma.rDOS_MotivoDePausa.delete({
      where: {rdosId_motivoPausaId: { rdosId, motivoPausaId }}
  });
}

async findByRDOSAndMotivo(rdosId: string, motivoPausaId: string) {
  return prisma.rDOS_MotivoDePausa.findUnique({
    where: {
      rdosId_motivoPausaId: {
        rdosId,
        motivoPausaId
      }
    }
  });
}

async findMotivoByRDOS(rdosId: string) {
  return prisma.rDOS_MotivoDePausa.findMany({
    where: {
      rdosId      }
    });
}
  
async findAssociationsMotivo() {
  return prisma.rDOS_MotivoDePausa.findMany();
}
      
async updateMotivo(rdosId: string, motivoPausaId: string, dataHoraInicio:Date, dataHoraFim:Date) {
    return prisma.rDOS_MotivoDePausa.update({ where: { rdosId_motivoPausaId :
      {
      rdosId,
      motivoPausaId},
    },
      data: {
        dataHoraInicio: dataHoraInicio,
      dataHoraFim: dataHoraFim} 
    });
}

// RDOS - Listagem --------------------------------------------

async findRDOSListagem(rdosId: string) {
  return prisma.rDOS.findUnique({
      where: { id: rdosId },
      select: {
          id: true,
          data: true,
          numero: true,
          status: true,
          tipo: true,
          encarregado: {
              select: { nome: true }
          },
          empresaContrato: {
              select: { numeroDoContrato: true }
          },
          servicos: {
              select: {
                  servico: {
                      select: { nome: true }
                  }
              }
          }
      }
  });
}

async findRDOSListagemGeral() {
  return prisma.rDOS.findMany({
      select: {
          id: true,
          data: true,
          numero: true,
          status: true,
          tipo: true,
          encarregado: {
              select: { nome: true }
          },
          empresaContrato: {
              select: { numeroDoContrato: true }
          },
          servicos: {
              select: {
                  servico: {
                      select: { nome: true }
                  }
              }
          }
      }
  });
}

async findRDOSCompleto(rdosId: string) {
  const rdos = await prisma.rDOS.findUnique({
    where: { id: rdosId },
    select: {
        id: true,
        data: true,
        numero: true,
        status: true,
        tipo: true,
        encarregado: {
            select: { nome: true }
        },
        empresaContrato: {
            select: { numeroDoContrato: true }
        },
        servicos: {
            select: {
                servico: {
                    select: { nome: true }
                }
            }
        },
      maoDeObra: {
        select:  { 
          maoDeObra: {
            select: {nome:true                
            }
          }, quantidade: true }
      },
      motivosDePausa: {
        select: {
          motivoPausa: {
            select: {nome:true                
            }
          },
          dataHoraInicio: true,
          dataHoraFim: true
        }
      },
      equipamentos: {
        select: { 
          equipamento: {
            select: {nome: true }
      }, quantidade:true}
    },
        servicosAtividades: {
        select: {
          servico: {
            select: {nome: true}
          },
          atividade: { 
            select: { nome: true
            }
          },
          dataHoraInicio: true,
          dataHoraFim: true
        }
      }
    }
  });

  // Agrupar as atividades por serviço
  const servicosAtividades: { [key: string]: { nome: string, inicio: Date, fim: Date }[] } = (rdos?.servicosAtividades ?? []).reduce((acc, item) => {
    const servicoNome = item.servico.nome.toString();  // Garantir que o ID é uma string
    const atividade = {
      nome: item.atividade.nome,
      inicio: item.dataHoraInicio ?? new Date("00:00"),
      fim: item.dataHoraFim ?? new Date("00:00")
    };

    if (!acc[servicoNome]) {
      acc[servicoNome] = [];
    }

    acc[servicoNome].push(atividade);
    return acc;
  }, {} as { [key: string]: { nome: string, inicio: Date, fim: Date }[] });  // Definindo explicitamente o tipo de acc

  // Agora montando o resultado final mantendo a estrutura original
  const resultado = {
    ...rdos,  // Mantém os outros atributos do rdos
    servicosAtividades: Object.keys(servicosAtividades).map(servicoId => {
      const servico = rdos?.servicos.find(s => s.servico.nome === servicoId); // Comparação corrigida para ID
      return {
        servico: servico ? servico.servico.nome : 'Desconhecido',
        atividades: servicosAtividades[servicoId]
      };
    }) 
  };

  return resultado; 
}
  
}



