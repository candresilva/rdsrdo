import { AtividadeRepository } from '../repositories/atividadeRepository.js';
import { Atividade } from '@prisma/client';

export class AtividadeService {
  private atividadeRepository: AtividadeRepository;

  constructor() {
    this.atividadeRepository = new AtividadeRepository();
  }

  async listar() {
    try {
      const atividades = await this.atividadeRepository.findAll();
      console.log('Atividades encontradas:', atividades); // Verifique o retorno do banco de dados
      return atividades;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar as atividades
         throw new Error('Erro ao listar atividades: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const atividade = await this.atividadeRepository.findById(id);
      if (!atividade) {
        throw new Error('Atividade não encontrada');
      }
      return atividade;
    } catch (error:any) {
      // Lançando erro caso a atividade não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter atividade por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Atividade>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const atividade = await this.atividadeRepository.create(dados);
      return atividade;
  } catch(error:any) {
    throw new Error('Erro ao criar atividade: ' + error.message);

  }
    } */

    async criar(dados: Partial<Atividade> | Partial<Atividade>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplas atividades uma por uma
          const atividadesCriadas = [];
          for (const atividade of dados) {
            atividadesCriadas.push(await this.atividadeRepository.create(atividade));
          }
          return atividadesCriadas; // Retorna um array de atividades criadas
        }
    
        // Criando uma única atividade
        return await this.atividadeRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar atividade: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Atividade>) {
    return await this.atividadeRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.atividadeRepository.delete(id);
  }
}

export default new AtividadeService();