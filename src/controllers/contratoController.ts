import { Request, Response, NextFunction } from 'express';
import { ContratoService } from '../services/contratoService.js';

export class ContratoController {
  private static instance: ContratoController;
  private contratoService: ContratoService;

  private constructor() {
    console.log('Inicializando ContratoService...');
    this.contratoService = new ContratoService();
    console.log('ContratoService inicializado:', this.contratoService);
  }

  public static getInstance(): ContratoController {
    if (!ContratoController.instance) {
      console.log('Instanciando ContratoController...');
      ContratoController.instance = new ContratoController();
    }
    else {
      console.log('Instância já criada');
    }
    return ContratoController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do ContratoController:', this);
      console.log('ContratoService:', this.contratoService);
  
      if (!this.contratoService) {
        throw new Error('ContratoService não foi inicializado corretamente.');
      }
    const contratos =  await this.contratoService.listar();
    res.json(contratos);
  } catch (err:any) {
    console.error('Erro ao listar contratos:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const contrato = await this.contratoService.obterPorId(id);
    if (!contrato) {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
    res.json(contrato);
  } catch (err:any) {
    console.error('Erro ao buscar contrato por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar contrato por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar contrato por ID' });
    }
  }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('ContratoService antes de criar:', this.contratoService);
    const contrato = await this.contratoService.criar(req.body);
    res.status(201).json(contrato);
  } catch(err:any) {
    next(err);
  }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const contrato = await this.contratoService.atualizar(id, req.body);
    if (!contrato) {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
    res.json(contrato);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.contratoService.remover(id);
    res.status(204).send();
  }

  async getByEmpresaId(req: Request, res: Response) {
    const { empresaId } = req.params;
    try {
    const contrato = await this.contratoService.obterPorEmpresa(empresaId);
    if (!contrato) {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
    res.json(contrato);
  } catch (err:any) {
    console.error('Erro ao buscar contratos por empresa:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar contratos por empresa', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar contratos por empresa' });
    }
  }
  }

  async getSummaryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const contratos = await this.contratoService.obterResumoPorId(id);
    if (!contratos) {
      res.status(404).json({ message: 'Contrato não encontrado' });
    }
    res.json(contratos);
  } catch (err:any) {
    console.error('Erro ao buscar Contrato por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar Contrato por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar Contrato por ID' });
    }
  }
  }

  async getSummary(req: Request, res: Response) {
    try {
    const contratos = await this.contratoService.obterResumo();
    if (!contratos) {
      res.status(404).json({ message: 'Contratos não encontrados' });
    }
    res.json(contratos);
  } catch (err:any) {
    console.error('Erro ao buscar Contratos:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar Contratos', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar Contratos' });
    }
  }
  }

}

//export default new ContratoController();
