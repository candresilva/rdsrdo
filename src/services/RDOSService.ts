import { RDOSRepository } from '../repositories/RDOSRepository';
import { RDOS } from '@prisma/client';

export class RDOSService {
  private rdosRepository: RDOSRepository;

  constructor() {
    this.rdosRepository = new RDOSRepository();
  }

  async listar() {
    try {
      const rdoss = await this.rdosRepository.findAll();
      console.log('RDOSs encontradas:', rdoss); // Verifique o retorno do banco de dados
      return rdoss;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar as RDOS
         throw new Error('Erro ao listar RDOS: ' + error.message);
        }
  }

  async obterPorId(id: string) {
    try {
      const rdos = await this.rdosRepository.findById(id);
      if (!rdos) {
        throw new Error('RDOS não encontrada');
      }
      return rdos;
    } catch (error:any) {
      // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter RDOS por ID: ' + error.message);
    }
  }

  async criar(dados: Partial<RDOS> | Partial<RDOS>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplas RDOS uma por uma
          const rdossCriadas = [];
          for (const rdos of dados) {
            rdossCriadas.push(await this.rdosRepository.create(rdos));
          }
          return rdossCriadas; // Retorna um array de RDOS criadas
        }
    
        // Criando uma única rdos
        return await this.rdosRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar RDOS: ' + error.message);
      }
  }
    
  async atualizar(id: string, dados: Partial<RDOS>) {
    return await this.rdosRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.rdosRepository.delete(id);
  }

// RDOS_Servico --------------------------------------------

async associarServico(rdosId:string, servicoId: string) {
  // Verifica se o serviço já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndServico(rdosId,servicoId);

  if (existente) {
      throw new Error('O serviço já está associado a este RDOS.');
  }

  // Associa o serviço à RDOS
  await this.rdosRepository.criarAssociacao(rdosId,servicoId);
  // Chama a função que associa as atividades do serviço ao RDO
  const resultadoAtividades = await this.rdosRepository.associarRDOSServicoComAtividades(rdosId, servicoId);

  return {      
    message: 'Serviço associado com sucesso!',
    atividades: resultadoAtividades
  };
}

async removerServico(rdosId: string, servicoId: string) {
  await this.rdosRepository.excluirAssociacao(rdosId,servicoId);
  const resultadoAtividades = await this.rdosRepository.desassociarRDOSServicoComAtividades(rdosId, servicoId);
  return {      
    message: 'Serviço removido com sucesso!',
    atividades: resultadoAtividades
  };

}

async buscarServicos(rdosId: string) {
  return this.rdosRepository.findByRDOS(rdosId);
}

async buscarAssociacoes() {
  return this.rdosRepository.findAssociations();
}

// RDOS_Atividade --------------------------------------------

async associarAtividade(rdosId:string, atividadeId: string) {
  // Verifica se o serviço já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndAtividade(rdosId,atividadeId);

  if (existente) {
      throw new Error('A atividade já está associada a este RDOS.');
  }

  // Associa a atividade ao serviço
  await this.rdosRepository.criarAssociacaoAtividade(rdosId,atividadeId);

  return 'Atividade associada com sucesso!';
};

async removerAtividade(rdosId: string, atividadeId: string) {
await this.rdosRepository.excluirAssociacaoAtividade(rdosId, atividadeId);
}

async buscarAtividades(rdosId: string) {
return this.rdosRepository.findAtividadeByRDOS(rdosId);
}

async buscarAssociacoesAtividades() {
return this.rdosRepository.findAssociationsAtividades();
}

async atualizarAtividades(rdosId: string, atividadeId: string, data:any) {
  return this.rdosRepository.updateAtividade(rdosId, atividadeId, data);
}

// RDOS_Equipamento --------------------------------------------

async associarEquipamento(rdosId:string, equipamentoId: string) {
  // Verifica se o equipamento já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndEquipamento(rdosId,equipamentoId);

  if (existente) {
      throw new Error('O equipamento já está associado a este RDOS.');
  }

  // Associa o equipamento à RDOS
  await this.rdosRepository.criarAssociacaoEquipamento(rdosId, equipamentoId);
  
  return 'Equipamento associado com sucesso!';
}

async removerEquipamento(rdosId: string, equipamentoId: string) {
await this.rdosRepository.excluirAssociacaoEquipamento(rdosId, equipamentoId);
return  'Equipamento removido com sucesso!';

}

async buscarEquipamentos(rdosId: string) {
return this.rdosRepository.findEquipamentoByRDOS(rdosId);
}

async buscarAssociacoesEquipamentos() {
return this.rdosRepository.findAssociationsEquipamento();
}

async atualizarEquipamentos(rdosId: string, equipamentoId: string, data:any) {
  return this.rdosRepository.updateEquipment(rdosId, equipamentoId, data);
}

// RDOS_MãodeObra --------------------------------------------

async associarMaodeObra(rdosId:string, maoDeObraId: string) {
  // Verifica se mão de obra já está associada à RDOS
  const existente = await this.rdosRepository.findByRDOSAndMaodeObra(rdosId,maoDeObraId);

  if (existente) {
      throw new Error('Mão de obra já está associada a este RDOS.');
  }

  // Associa mão de obra à RDOS
  await this.rdosRepository.criarAssociacaoMaodeObra(rdosId, maoDeObraId);
  
  return 'Mão de obra associada com sucesso!';
}

async removerMaodeObra(rdosId: string, maoDeObraId: string) {
  await this.rdosRepository.excluirAssociacaoMaodeObra(rdosId, maoDeObraId);
  return  'Mão de obra removida com sucesso!';
}

async buscarMaodeObra(rdosId: string) {
  return this.rdosRepository.findMaodeObraByRDOS(rdosId);
}

async buscarAssociacoesMaodeObra() {
  return this.rdosRepository.findAssociationsMaodeObra();
}

async atualizarMaodeObra(rdosId: string, maoDeObraId: string, data:any) {
  return this.rdosRepository.updateMaodeObra(rdosId, maoDeObraId, data);
} 

// RDOS_Motivos --------------------------------------------

async associarMotivos(rdosId:string, motivoPausaId: string) {
  // Verifica se pausa já está associada à RDOS
  const existente = await this.rdosRepository.findByRDOSAndMotivo(rdosId,motivoPausaId);

  if (existente) {
      throw new Error('Pausa já está associada a este RDOS.');
  }

  // Associa pausa à RDOS
  await this.rdosRepository.criarAssociacaoMotivo(rdosId, motivoPausaId);
  
  return 'Pausa associada com sucesso!';
}

async removerMotivo(rdosId: string, motivoPausaId: string) {
  await this.rdosRepository.excluirAssociacaoMotivo(rdosId, motivoPausaId);
  return  'Pausa removida com sucesso!';
}

async buscarMotivo(rdosId: string) {
  return this.rdosRepository.findMotivoByRDOS(rdosId);
}

async buscarAssociacoesMotivo() {
  return this.rdosRepository.findAssociationsMotivo();
}

async atualizarMotivo(rdosId: string, motivoPausaId: string, data:any) {
  return this.rdosRepository.updateMotivo(rdosId, motivoPausaId, data);
} 


}

export default new RDOSService();