import { EncarregadoRepository } from '../repositories/encarregadoRepository';
import { Encarregado } from '@prisma/client';

export class EncarregadoService {
  private encarregadoRepository: EncarregadoRepository;

  constructor() {
    this.encarregadoRepository = new EncarregadoRepository();
  }

  async listar() {
    try {
      const encarregados = await this.encarregadoRepository.findAll();
      console.log('Encarregados encontrados:', encarregados); // Verifique o retorno do banco de dados
      return encarregados;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar os encarregados
         throw new Error('Erro ao listar encarregados: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const encarregado = await this.encarregadoRepository.findById(id);
      if (!encarregado) {
        throw new Error('Encarregado não encontrado');
      }
      return encarregado;
    } catch (error:any) {
      // Lançando erro caso o encarregado não seja encontrado ou outro erro ocorra
      throw new Error('Erro ao obter encarregado por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Encarregado>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const encarregado = await this.encarregadoRepository.create(dados);
      return encarregado;
  } catch(error:any) {
    throw new Error('Erro ao criar encarregado: ' + error.message);

  }
    } */

    async criar(dados: Partial<Encarregado> | Partial<Encarregado>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplos encarregados um por um
          const encarregadosCriados = [];
          for (const encarregado of dados) {
            encarregadosCriados.push(await this.encarregadoRepository.create(encarregado));
          }
          return encarregadosCriados; // Retorna um array de encarregados criados
        }
    
        // Criando um único encarregado
        return await this.encarregadoRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar encarregado: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Encarregado>) {
    return await this.encarregadoRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.encarregadoRepository.delete(id);
  }
}

export default new EncarregadoService();