import { ContratoRepository } from '../repositories/contratoRepository.js';
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

  async obterPorEmpresa(empresaId: string) {
    return this.contratoRepository.findByEmpresa(empresaId);
  }

  async obterResumoPorId(id: string) {
    try {
      const contratos = await this.contratoRepository.findListagem(id);
      if (!contratos) {
        throw new Error('Contratos não encontrados');
      }
      return contratos;
    } catch (error:any) {
      throw new Error('Erro ao obter Contratos por ID: ' + error.message);
    }
  }
  
  async obterResumo() {
    try {
      const contratos = await this.contratoRepository.findListagemGeral();
      if (!contratos) {
        throw new Error('Contratos não encontrados');
      }
      return contratos;
    } catch (error:any) {
      // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter Contratos: ' + error.message);
    }
  }
  

}

export default new ContratoService();