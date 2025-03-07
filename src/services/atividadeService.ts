import { AtividadeRepository } from '../repositories/atividadeRepository';
import { Atividade } from '@prisma/client';

export class AtividadeService {
  private readonly atividadeRepository: AtividadeRepository;

  constructor() {
    this.atividadeRepository = new AtividadeRepository();
  }

  async listar(): Promise<Atividade[]> {
    return this.atividadeRepository.findAll();
  }

  async obterPorId(id: string): Promise<Atividade | null> {
    return this.atividadeRepository.findById(id);
  }

  async criar(dados: Partial<Atividade>): Promise<Atividade> {
    return this.atividadeRepository.create(dados);
  }

  async atualizar(id: string, dados: Partial<Atividade>): Promise<Atividade | null> {
    return this.atividadeRepository.update(id, dados);
  }

  async remover(id: string): Promise<void> {
    await this.atividadeRepository.delete(id);
  }
}
