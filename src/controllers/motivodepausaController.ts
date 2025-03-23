import { Request, Response, NextFunction } from 'express';
import { MotivoDePausaService } from '../services/motivodepausaService.js';

export class MotivoDePausaController {
  private static instance: MotivoDePausaController;
  private motivodepausaService: MotivoDePausaService;

  private constructor() {
    console.log('Inicializando MotivoDePausaService...');
    this.motivodepausaService = new MotivoDePausaService();
    console.log('MotivoDePausaService inicializado:', this.motivodepausaService);
  }

  public static getInstance(): MotivoDePausaController {
    if (!MotivoDePausaController.instance) {
      console.log('Instanciando MotivoDePausaController...');
      MotivoDePausaController.instance = new MotivoDePausaController();
    }
    else {
      console.log('Instância já criada');
    }
    return MotivoDePausaController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do MotivoDePausaController:', this);
      console.log('MotivoDePausaService:', this.motivodepausaService);
  
      if (!this.motivodepausaService) {
        throw new Error('MotivoDePausaService não foi inicializado corretamente.');
      }
    const motivodepausas =  await this.motivodepausaService.listar();
    res.json(motivodepausas);
  } catch (err:any) {
    console.error('Erro ao listar motivos de pausa:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const motivodepausa = await this.motivodepausaService.obterPorId(id);
    if (!motivodepausa) {
      res.status(404).json({ message: 'Motivo não encontrado' });
    }
    res.json(motivodepausa);
  } catch (err:any) {
    console.error('Erro ao buscar motivo por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar motivo por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar motivo por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('MotivoDePausaService antes de criar:', this.motivodepausaService);
    const motivodepausa = await this.motivodepausaService.criar(req.body);
    res.status(201).json(motivodepausa);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const motivodepausa = await this.motivodepausaService.atualizar(id, req.body);
    if (!motivodepausa) {
      res.status(404).json({ message: 'Motivo não encontrado' });
    }
    res.json(motivodepausa);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.motivodepausaService.remover(id);
    res.status(204).send();
  }
}

//export default new MotivoDePausaController();
