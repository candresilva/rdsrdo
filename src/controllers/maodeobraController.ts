import { Request, Response, NextFunction } from 'express';
import { MaoDeObraService } from '../services/maodeobraService.js';

export class MaoDeObraController {
  private static instance: MaoDeObraController;
  private maodeobraService: MaoDeObraService;

  private constructor() {
    console.log('Inicializando MaoDeObraService...');
    this.maodeobraService = new MaoDeObraService();
    console.log('MaoDeObraService inicializado:', this.maodeobraService);
  }

  public static getInstance(): MaoDeObraController {
    if (!MaoDeObraController.instance) {
      console.log('Instanciando MaoDeObraController...');
      MaoDeObraController.instance = new MaoDeObraController();
    }
    else {
      console.log('Instância já criada');
    }
    return MaoDeObraController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do MaoDeObraController:', this);
      console.log('MaoDeObraService:', this.maodeobraService);
  
      if (!this.maodeobraService) {
        throw new Error('MaoDeObraService não foi inicializado corretamente.');
      }
    const maodeobras =  await this.maodeobraService.listar();
    res.json(maodeobras);
  } catch (err:any) {
    console.error('Erro ao listar mãos de obra:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const maodeobra = await this.maodeobraService.obterPorId(id);
    if (!maodeobra) {
      res.status(404).json({ message: 'Mão de obra não encontrada' });
    }
    res.json(maodeobra);
  } catch (err:any) {
    console.error('Erro ao buscar mão de obra por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar mão de obra por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar mão de obra por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('MaoDeObraService antes de criar:', this.maodeobraService);
    const maodeobra = await this.maodeobraService.criar(req.body);
    res.status(201).json(maodeobra);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const maodeobra = await this.maodeobraService.atualizar(id, req.body);
    if (!maodeobra) {
      res.status(404).json({ message: 'Mão de obra não encontrada' });
    }
    res.json(maodeobra);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.maodeobraService.remover(id);
    res.status(204).send();
  }
}

//export default new MaoDeObraController();
