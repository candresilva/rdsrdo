import RDSRepository from '../repositories/RDSRepository';

class RDSService {
  async listarTodas() {
    try {
      return await RDSRepository.findAll();
    } catch (error) {
      throw new Error('Erro ao listar todas as RDS');
    }
  }

  async buscarPorId(id: string) {
    try {
      return await RDSRepository.findById(id);
    } catch (error) {
      throw new Error(`Erro ao buscar RDS com ID: ${id}`);
    }
  }
}

export default new RDSService();
