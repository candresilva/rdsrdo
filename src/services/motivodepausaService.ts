import { MotivoDePausaRepository } from '../repositories/motivodepausaRepository.js';
import { MotivoDePausa } from '@prisma/client';

export class MotivoDePausaService {
  private motivodepausaRepository: MotivoDePausaRepository;

  constructor() {
    this.motivodepausaRepository = new MotivoDePausaRepository();
  }

  async listar() {
    try {
      const motivodepausas = await this.motivodepausaRepository.findAll();
      console.log('Motivos encontrados:', motivodepausas); // Verifique o retorno do banco de dados
      return motivodepausas;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar os motivos
         throw new Error('Erro ao listar motivos de pausas: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const motivodepausa = await this.motivodepausaRepository.findById(id);
      if (!motivodepausa) {
        throw new Error('Motivo não encontrado');
      }
      return motivodepausa;
    } catch (error:any) {
      // Lançando erro caso o motivo não seja encontrado ou outro erro ocorra
      throw new Error('Erro ao obter motivo de pausa por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<MotivoDePausa>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const motivodepausa = await this.motivodepausaRepository.create(dados);
      return motivodepausa;
  } catch(error:any) {
    throw new Error('Erro ao criar motivo: ' + error.message);

  }
    } */

    async criar(dados: Partial<MotivoDePausa> | Partial<MotivoDePausa>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplos motivos um por um
          const motivodepausasCriados = [];
          for (const motivodepausa of dados) {
            motivodepausasCriados.push(await this.motivodepausaRepository.create(motivodepausa));
          }
          return motivodepausasCriados; // Retorna um array de motivos criados
        }
    
        // Criando um único motivo
        return await this.motivodepausaRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar motivo: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<MotivoDePausa>) {
    return await this.motivodepausaRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.motivodepausaRepository.delete(id);
  }
}

export default new MotivoDePausaService();