import { Request, Response, NextFunction } from 'express';
import { EmpresaService } from '../services/empresaService';

export class EmpresaController {
  private static instance: EmpresaController;
  private empresaService: EmpresaService;

  private constructor() {
    console.log('Inicializando EmpresaService...');
    this.empresaService = new EmpresaService();
    console.log('EmpresaService inicializado:', this.empresaService);
  }

  public static getInstance(): EmpresaController {
    if (!EmpresaController.instance) {
      console.log('Instanciando EmpresaController...');
      EmpresaController.instance = new EmpresaController();
    }
    else {
      console.log('Instância já criada');
    }
    return EmpresaController.instance;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Instância do EmpresaController:', this);
      console.log('EmpresaService:', this.empresaService);
  
      if (!this.empresaService) {
        throw new Error('EmpresaService não foi inicializado corretamente.');
      }
    const empresas =  await this.empresaService.listar();
    res.json(empresas);
  } catch (err:any) {
    console.error('Erro ao listar empresas:', err);
    res.status(500).json({ message: err.message });
    next(err);
  }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
    const empresa = await this.empresaService.obterPorId(id);
    if (!empresa) {
      res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.json(empresa);
  } catch (err:any) {
    console.error('Erro ao buscar empresa por ID:', err);
    if (err instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar empresa por ID', error: err.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar empresa por ID' });
    }
  }
}


  async create(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Corpo da requisição recebido:', req.body);
      console.log('EmpresaService antes de criar:', this.empresaService);
    const empresa = await this.empresaService.criar(req.body);
    res.status(201).json(empresa);
  } catch(err:any) {
    next(err);
  }
}

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const empresa = await this.empresaService.atualizar(id, req.body);
    if (!empresa) {
      res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.json(empresa);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.empresaService.remover(id);
    res.status(204).send();
  }
}

//export default new EmpresaController();
