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


  // RDOS_Servico --------------------------------------------

  async assignService(req: Request, res: Response) {
    try {
      console.log("params",req.params);
        const { rdosId, servicoId } = req.params;

        const resultado = await this.rdosService.associarServico(rdosId,servicoId);

        res.status(200).json({ message: resultado });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

async unassignService(req: Request, res: Response) {
  const {rdosId,servicoId } = req.params;
  await this.rdosService.removerServico(rdosId,servicoId);
  res.status(204).send();
}


async getServicesByRDOSId(req: Request, res: Response) {
  try {
    const { rdosId } = req.params;
    const associacao = await this.rdosService.buscarServicos(rdosId);

    if (!associacao) {
      res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(associacao);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
async getAssociations(req: Request, res: Response) {
  try{
  const servicos =  await this.rdosService.buscarAssociacoes();
  res.json(servicos);
} catch (err:any) {
    console.error('Erro ao listar servicos:', err);
    res.status(500).json({ message: err.message });
//    next(err);
}
}

// RDOS_Atividade --------------------------------------------
async assignAtividade(req: Request, res: Response) {
  try {
    console.log("params",req.params);
      const { rdosId, atividadeId } = req.params;

      const resultado = await this.rdosService.associarAtividade(rdosId, atividadeId);

      res.status(200).json({ message: resultado });
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};

async unassignAtividade(req: Request, res: Response) {
const {rdosId, atividadeId } = req.params;
await this.rdosService.removerAtividade(rdosId, atividadeId);
res.status(204).send();
}


async getActivitiesByRDOSId(req: Request, res: Response) {
try {
  const { rdosId } = req.params;
  const associacao = await this.rdosService.buscarAtividades(rdosId);

  if (!associacao) {
    res.status(404).json({ message: 'Associação não encontrada' });
  }

  res.json(associacao);
} catch (error: any) {
  res.status(500).json({ error: error.message });
}
}
async getAssociationsAtividade(req: Request, res: Response) {
try{
const servicos =  await this.rdosService.buscarAssociacoesAtividades();
res.json(servicos);
} catch (err:any) {
  console.error('Erro ao listar servicos:', err);
  res.status(500).json({ message: err.message });
//    next(err);
}
}

}

//export default new RDOSController();
