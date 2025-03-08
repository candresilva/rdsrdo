import { EquipamentoRepository } from '../repositories/equipamentoRepository';
import { Equipamento } from '@prisma/client';

export class EquipamentoService {
  private equipamentoRepository: EquipamentoRepository;

  constructor() {
    this.equipamentoRepository = new EquipamentoRepository();
  }

  async listar() {
    try {
      const equipamentos = await this.equipamentoRepository.findAll();
      console.log('Equipamentos encontrados:', equipamentos); // Verifique o retorno do banco de dados
      return equipamentos;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar os equipamentos
         throw new Error('Erro ao listar equipamentos: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const equipamento = await this.equipamentoRepository.findById(id);
      if (!equipamento) {
        throw new Error('Equipamento não encontrado');
      }
      return equipamento;
    } catch (error:any) {
      // Lançando erro caso o equipamento não seja encontrado ou outro erro ocorra
      throw new Error('Erro ao obter equipamento por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Equipamento>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const equipamento = await this.equipamentoRepository.create(dados);
      return equipamento;
  } catch(error:any) {
    throw new Error('Erro ao criar equipamento: ' + error.message);

  }
    } */

    async criar(dados: Partial<Equipamento> | Partial<Equipamento>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplos equipamentos um por um
          const equipamentosCriados = [];
          for (const equipamento of dados) {
            equipamentosCriados.push(await this.equipamentoRepository.create(equipamento));
          }
          return equipamentosCriados; // Retorna um array de equipamentos criados
        }
    
        // Criando um único equipamento
        return await this.equipamentoRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar equipamento: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Equipamento>) {
    return await this.equipamentoRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.equipamentoRepository.delete(id);
  }
}

export default new EquipamentoService();