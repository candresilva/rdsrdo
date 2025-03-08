import { Request, Response, NextFunction } from 'express';
import { RDOSService } from '../services/RDOSService';

export class RDOSController {
  private static instance: RDOSController;
  private rdosService: RDOSService;

  private constructor() {
    console.log('Inicializando RDOSService...');
    this.rdosService = new RDOSService();
    console.log('RDOSService inicializado:', this.rdosService);
  }

  public static getInstance(): RDOSController {
    if (!RDOSController.instance) {
      console.log('Instanciando RDOSController...');
      RDOSController.instance = new RDOSController();
    }
    else {
      console.log('Instância já criada');
    }
    return RDOSController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do RDOSController:', this);
      console.log('RDOSService:', this.rdosService);
  
      if (!this.rdosService) {
        throw new Error('RDOSService não foi inicializado corretamente.');
      }
    const rdoss =  await this.rdosService.listar();
    res.json(rdoss);
  } catch (err:any) {
    console.error('Erro ao listar RDOS:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const rdos = await this.rdosService.obterPorId(id);
    if (!rdos) {
      res.status(404).json({ message: 'RDOS não encontrada' });
    }
    res.json(rdos);
  } catch (err:any) {
    console.error('Erro ao buscar RDOS por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar RDOS por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar RDOS por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('RDOSService antes de criar:', this.rdosService);
    const rdos = await this.rdosService.criar(req.body);
    res.status(201).json(rdos);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const rdos = await this.rdosService.atualizar(id, req.body);
    if (!rdos) {
      res.status(404).json({ message: 'RDOS não encontrada' });
    }
    res.json(rdos);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.rdosService.remover(id);
    res.status(204).send();
  }
}

//export default new RDOSController();
