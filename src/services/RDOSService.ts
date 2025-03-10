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

  /* async criar(dados: Partial<RDOS>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const rdos = await this.rdosRepository.create(dados);
      return rdos;
  } catch(error:any) {
    throw new Error('Erro ao criar RDOS: ' + error.message);

  }
    } */

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


}

export default new RDOSService();