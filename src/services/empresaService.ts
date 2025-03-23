import { EmpresaRepository } from '../repositories/empresaRepository.js';
import { Empresa} from '@prisma/client';


export class EmpresaService {
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }

  async listar() {
    try {
      const empresas = await this.empresaRepository.findAll();
      console.log('Empresas encontradas:', empresas); // Verifique o retorno do banco de dados
      return empresas;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar as empresas
         throw new Error('Erro ao listar empresas: ' + error.message);
        }
  }


  async obterPorId(id: string) {
    try {
      const empresa = await this.empresaRepository.findById(id);
      if (!empresa) {
        throw new Error('Empresa não encontrada');
      }
      return empresa;
    } catch (error:any) {
      // Lançando erro caso a empresa não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter empresa por ID: ' + error.message);
    }
  }

  /* async criar(dados: Partial<Empresa>) {
    try{
      console.log('Dados recebidos para criação:', dados);
      const empresa = await this.empresaRepository.create(dados);
      return empresa;
  } catch(error:any) {
    throw new Error('Erro ao criar empresa: ' + error.message);

  }
    } */

    async criar(dados: Partial<Empresa> | Partial<Empresa>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplas empresas uma por uma
          const empresasCriadas = [];
          for (const empresa of dados) {
            empresasCriadas.push(await this.empresaRepository.create(empresa));
          }
          return empresasCriadas; // Retorna um array de empresas criadas
        }
    
        // Criando uma única empresa
        return await this.empresaRepository.create(dados);
      } catch (error: any) {
        throw new Error('Erro ao criar empresa: ' + error.message);
      }
    }
    
  

  async atualizar(id: string, dados: Partial<Empresa>) {
    return await this.empresaRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.empresaRepository.delete(id);
  }
}

export default new EmpresaService();