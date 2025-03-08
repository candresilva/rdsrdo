import { Request, Response, NextFunction } from 'express';
import { EncarregadoService } from '../services/encarregadoService';

export class EncarregadoController {
  private static instance: EncarregadoController;
  private encarregadoService: EncarregadoService;

  private constructor() {
    console.log('Inicializando EncarregadoService...');
    this.encarregadoService = new EncarregadoService();
    console.log('EncarregadoService inicializado:', this.encarregadoService);
  }

  public static getInstance(): EncarregadoController {
    if (!EncarregadoController.instance) {
      console.log('Instanciando EncarregadoController...');
      EncarregadoController.instance = new EncarregadoController();
    }
    else {
      console.log('Instância já criada');
    }
    return EncarregadoController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do EncarregadoController:', this);
      console.log('EncarregadoService:', this.encarregadoService);
  
      if (!this.encarregadoService) {
        throw new Error('EncarregadoService não foi inicializado corretamente.');
      }
    const encarregados =  await this.encarregadoService.listar();
    res.json(encarregados);
  } catch (err:any) {
    console.error('Erro ao listar encarregados:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const encarregado = await this.encarregadoService.obterPorId(id);
    if (!encarregado) {
      res.status(404).json({ message: 'Encarregado não encontrado' });
    }
    res.json(encarregado);
  } catch (err:any) {
    console.error('Erro ao buscar encarregado por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar encarregado por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar encarregado por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('EncarregadoService antes de criar:', this.encarregadoService);
    const encarregado = await this.encarregadoService.criar(req.body);
    res.status(201).json(encarregado);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const encarregado = await this.encarregadoService.atualizar(id, req.body);
    if (!encarregado) {
      res.status(404).json({ message: 'Encarregado não encontrado' });
    }
    res.json(encarregado);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.encarregadoService.remover(id);
    res.status(204).send();
  }
}

//export default new EncarregadoController();
