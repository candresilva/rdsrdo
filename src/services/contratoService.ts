import { ContratoRepository } from '../repositories/contratoRepository';
import { Contrato } from '@prisma/client';

export class ContratoService {
  private contratoRepository: ContratoRepository;

  constructor() {
    this.contratoRepository = new ContratoRepository();
  }

  async listar() {
    try {
      const contratos = await this.contratoRepository.findAll();
      console.log('Contratos encontrados:', contratos); // Verifique o retorno do banco de dados
      return contratos;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar os contratos
         throw new Error('Erro ao listar contratos: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const contrato = await this.contratoRepository.findById(id);
      if (!contrato) {
        throw new Error('Contrato não encontrado');
      }
      return contrato;
    } catch (error:any) {
      // Lançando erro caso o contrato não seja encontrado ou outro erro ocorra
      throw new Error('Erro ao obter contrato por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Contrato>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const contrato = await this.contratoRepository.create(dados);
      return contrato;
  } catch(error:any) {
    throw new Error('Erro ao criar contrato: ' + error.message);

  }
    } */

    async criar(dados: Partial<Contrato> | Partial<Contrato>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplos contratos um por um
          const contratosCriados = [];
          for (const contrato of dados) {
            contratosCriados.push(await this.contratoRepository.create(contrato));
          }
          return contratosCriados; // Retorna um array de contratos criados
        }
    
        // Criando um único contrato
        return await this.contratoRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar contrato: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Contrato>) {
    return await this.contratoRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.contratoRepository.delete(id);
  }
}

export default new ContratoService();