import { Request, Response, NextFunction } from 'express';
import { AtividadeService } from '../services/atividadeService';

export class AtividadeController {
  private static instance: AtividadeController;
  private atividadeService: AtividadeService;

  private constructor() {
    console.log('Inicializando AtividadeService...');
    this.atividadeService = new AtividadeService();
    console.log('AtividadeService inicializado:', this.atividadeService);
  }

  public static getInstance(): AtividadeController {
    if (!AtividadeController.instance) {
      console.log('Instanciando AtividadeController...');
      AtividadeController.instance = new AtividadeController();
    }
    else {
      console.log('Instância já criada');
    }
    return AtividadeController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do AtividadeController:', this);
      console.log('AtividadeService:', this.atividadeService);
  
      if (!this.atividadeService) {
        throw new Error('AtividadeService não foi inicializado corretamente.');
      }
    const atividades =  await this.atividadeService.listar();
    res.json(atividades);
  } catch (err:any) {
    console.error('Erro ao listar atividades:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const atividade = await this.atividadeService.obterPorId(id);
    if (!atividade) {
      res.status(404).json({ message: 'Atividade não encontrada' });
    }
    res.json(atividade);
  } catch (err:any) {
    console.error('Erro ao buscar atividade por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar atividade por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar atividade por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('AtividadeService antes de criar:', this.atividadeService);
    const atividade = await this.atividadeService.criar(req.body);
    res.status(201).json(atividade);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const atividade = await this.atividadeService.atualizar(id, req.body);
    if (!atividade) {
      res.status(404).json({ message: 'Atividade não encontrada' });
    }
    res.json(atividade);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.atividadeService.remover(id);
    res.status(204).send();
  }
}

//export default new AtividadeController();
