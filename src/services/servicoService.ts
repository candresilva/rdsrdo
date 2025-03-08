import { ServicoRepository } from '../repositories/servicoRepository';
import { Servico } from '@prisma/client';

export class ServicoService {
  private servicoRepository: ServicoRepository;

  constructor() {
    this.servicoRepository = new ServicoRepository();
  }

  async listar() {
    try {
      const servicos = await this.servicoRepository.findAll();
      console.log('Serviços encontrados:', servicos); // Verifique o retorno do banco de dados
      return servicos;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar os serviços
         throw new Error('Erro ao listar servicos: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const servico = await this.servicoRepository.findById(id);
      if (!servico) {
        throw new Error('Serviço não encontrado');
      }
      return servico;
    } catch (error:any) {
      // Lançando erro caso o serviço não seja encontrado ou outro erro ocorra
      throw new Error('Erro ao obter servico por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Servico>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const servico = await this.servicoRepository.create(dados);
      return servico;
  } catch(error:any) {
    throw new Error('Erro ao criar serviço: ' + error.message);

  }
    } */

    async criar(dados: Partial<Servico> | Partial<Servico>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplos serviços um por um
          const servicosCriados = [];
          for (const servico of dados) {
            servicosCriados.push(await this.servicoRepository.create(servico));
          }
          return servicosCriados; // Retorna um array de serviços criados
        }
    
        // Criando um único serviço
        return await this.servicoRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar serviço: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Servico>) {
    return await this.servicoRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.servicoRepository.delete(id);
  }
}

export default new ServicoService();