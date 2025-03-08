import { Request, Response, NextFunction } from 'express';
import { ServicoService } from '../services/servicoService';

export class ServicoController {
  private static instance: ServicoController;
  private servicoService: ServicoService;

  private constructor() {
    console.log('Inicializando ServicoService...');
    this.servicoService = new ServicoService();
    console.log('ServicoService inicializado:', this.servicoService);
  }

  public static getInstance(): ServicoController {
    if (!ServicoController.instance) {
      console.log('Instanciando ServicoController...');
      ServicoController.instance = new ServicoController();
    }
    else {
      console.log('Instância já criada');
    }
    return ServicoController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do ServicoController:', this);
      console.log('ServicoService:', this.servicoService);
  
      if (!this.servicoService) {
        throw new Error('ServicoService não foi inicializado corretamente.');
      }
    const servicos =  await this.servicoService.listar();
    res.json(servicos);
  } catch (err:any) {
    console.error('Erro ao listar servicos:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const servico = await this.servicoService.obterPorId(id);
    if (!servico) {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json(servico);
  } catch (err:any) {
    console.error('Erro ao buscar serviço por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar serviço por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar serviço por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('ServiçoService antes de criar:', this.servicoService);
    const servico = await this.servicoService.criar(req.body);
    res.status(201).json(servico);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const servico = await this.servicoService.atualizar(id, req.body);
    if (!servico) {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json(servico);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.servicoService.remover(id);
    res.status(204).send();
  }
}

//export default new ServicoController();
