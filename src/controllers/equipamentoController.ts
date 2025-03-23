import { Request, Response, NextFunction } from 'express';
import { EquipamentoService } from '../services/equipamentoService.js';

export class EquipamentoController {
  private static instance: EquipamentoController;
  private equipamentoService: EquipamentoService;

  private constructor() {
    console.log('Inicializando EquipamentoService...');
    this.equipamentoService = new EquipamentoService();
    console.log('EquipamentoService inicializado:', this.equipamentoService);
  }

  public static getInstance(): EquipamentoController {
    if (!EquipamentoController.instance) {
      console.log('Instanciando EquipamentoController...');
      EquipamentoController.instance = new EquipamentoController();
    }
    else {
      console.log('Instância já criada');
    }
    return EquipamentoController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do EquipamentoController:', this);
      console.log('EquipamentoService:', this.equipamentoService);
  
      if (!this.equipamentoService) {
        throw new Error('EquipamentoService não foi inicializado corretamente.');
      }
    const equipamentos =  await this.equipamentoService.listar();
    res.json(equipamentos);
  } catch (err:any) {
    console.error('Erro ao listar equipamentos:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const equipamento = await this.equipamentoService.obterPorId(id);
    if (!equipamento) {
      res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.json(equipamento);
  } catch (err:any) {
    console.error('Erro ao buscar equipamento por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar equipamento por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar equipamento por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('EquipamentoService antes de criar:', this.equipamentoService);
    const equipamento = await this.equipamentoService.criar(req.body);
    res.status(201).json(equipamento);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const equipamento = await this.equipamentoService.atualizar(id, req.body);
    if (!equipamento) {
      res.status(404).json({ message: 'Equipamento não encontrado' });
    }
    res.json(equipamento);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.equipamentoService.remover(id);
    res.status(204).send();
  }
}

//export default new EquipamentoController();
