import { MaoDeObraRepository } from '../repositories/maodeobraRepository';
import { MaoDeObra } from '@prisma/client';

export class MaoDeObraService {
  private maodeobraRepository: MaoDeObraRepository;

  constructor() {
    this.maodeobraRepository = new MaoDeObraRepository();
  }

  async listar() {
    try {
      const maodeobras = await this.maodeobraRepository.findAll();
      console.log('Mãos de obra encontradas:', maodeobras); // Verifique o retorno do banco de dados
      return maodeobras;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar as mãos de obra
         throw new Error('Erro ao listar mãos de obra: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const maodeobra = await this.maodeobraRepository.findById(id);
      if (!maodeobra) {
        throw new Error('Mão de obra não encontrada');
      }
      return maodeobra;
    } catch (error:any) {
      // Lançando erro caso a mão de obra não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter mão de obra por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<MaoDeObra>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const maodeobra = await this.maodeobraRepository.create(dados);
      return maodeobra;
  } catch(error:any) {
    throw new Error('Erro ao criar mão de obra: ' + error.message);

  }
    } */

    async criar(dados: Partial<MaoDeObra> | Partial<MaoDeObra>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplas mãos de obra uma por uma
          const maodeobrasCriadas = [];
          for (const maodeobra of dados) {
            maodeobrasCriadas.push(await this.maodeobraRepository.create(maodeobra));
          }
          return maodeobrasCriadas; // Retorna um array de mãos de obra criadas
        }
    
        // Criando uma única mão de obra
        return await this.maodeobraRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar mão de obra: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<MaoDeObra>) {
    return await this.maodeobraRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.maodeobraRepository.delete(id);
  }
}

export default new MaoDeObraService();