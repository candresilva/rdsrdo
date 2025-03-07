import { Request, Response } from 'express';
import { AtividadeService } from '../services/AtividadeService';

export class AtividadeController {
  private readonly atividadeService: AtividadeService;

  constructor() {
    this.atividadeService = new AtividadeService();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const atividades =  await this.atividadeService.listar();
    return res.json(atividades);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const atividade = await this.atividadeService.obterPorId(id);
    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }
    return res.json(atividade);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const atividade = await this.atividadeService.criar(req.body);
    return res.status(201).json(atividade);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const atividade = await this.atividadeService.atualizar(id, req.body);
    if (!atividade) {
      return res.status(404).json({ message: 'Atividade não encontrada' });
    }
    return res.json(atividade);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.atividadeService.remover(id);
    return res.status(204).send();
  }
}

//export default new AtividadeController();
