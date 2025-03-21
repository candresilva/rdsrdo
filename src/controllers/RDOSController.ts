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

async updateAtividade(req: Request, res: Response) {
  const { rdosId, atividadeId } = req.params;
  const rdos = await this.rdosService.atualizarAtividades(rdosId, atividadeId, req.body);
  if (!rdos) {
    res.status(404).json({ message: 'RDOS não encontrada' });
  }
  res.json(rdos);
}

// RDOS_Equipamento  --------------------------------------------

async assignEquipment(req: Request, res: Response) {
  try {
    console.log("params",req.params);
      const { rdosId, equipamentoId } = req.params;
      const { quantidade = 1 } = req.body || {};

      const resultado = await this.rdosService.associarEquipamento(rdosId, equipamentoId, quantidade);

      res.status(200).json({ message: resultado });
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};

async unassignEquipment(req: Request, res: Response) {
  const {rdosId, equipamentoId } = req.params;
  await this.rdosService.removerEquipamento(rdosId, equipamentoId);
  res.status(204).send();
}

async getEquipmentsByRDOSId(req: Request, res: Response) {
  try {
    const { rdosId } = req.params;
    const associacao = await this.rdosService.buscarEquipamentos(rdosId);

    if (!associacao) {
      res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(associacao);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async getAssociationsEquipment(req: Request, res: Response) {
  try{
  const equipamentos =  await this.rdosService.buscarAssociacoesEquipamentos();
  res.json(equipamentos);
} catch (err:any) {
    console.error('Erro ao listar servicos:', err);
    res.status(500).json({ message: err.message });
//    next(err);
}
}

async updateEquipment(req: Request, res: Response) {
  const { rdosId, equipamentoId } = req.params;
  const rdos = await this.rdosService.atualizarEquipamentos(rdosId, equipamentoId, req.body);
  if (!rdos) {
    res.status(404).json({ message: 'RDOS não encontrada' });
  }
  res.json(rdos);
}

// RDOS_MãodeObra  --------------------------------------------

async assignWorkforce(req: Request, res: Response) {
  try {
    console.log("params",req.params);
      const { rdosId, maoDeObraId } = req.params;
      const { quantidade = 1 } = req.body || {};

      const resultado = await this.rdosService.associarMaodeObra(rdosId, maoDeObraId, quantidade);

      res.status(200).json({ message: resultado });
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};

async unassignWorkforce(req: Request, res: Response) {
  const {rdosId, maoDeObraId } = req.params;
  await this.rdosService.removerMaodeObra(rdosId, maoDeObraId);
  res.status(204).send();
}

async getWorkforceByRDOSId(req: Request, res: Response) {
  try {
    const { rdosId } = req.params;
    const associacao = await this.rdosService.buscarMaodeObra(rdosId);

    if (!associacao) {
      res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(associacao);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async getAssociationsWorkforce(req: Request, res: Response) {
  try{
  const workforce =  await this.rdosService.buscarAssociacoesMaodeObra();
  res.json(workforce);
} catch (err:any) {
    console.error('Erro ao listar servicos:', err);
    res.status(500).json({ message: err.message });
//    next(err);
}
}

async updateWorforce(req: Request, res: Response) {
  const { rdosId, maoDeObraId } = req.params;
  const rdos = await this.rdosService.atualizarMaodeObra(rdosId, maoDeObraId, req.body);
  if (!rdos) {
    res.status(404).json({ message: 'RDOS não encontrada' });
  }
  res.json(rdos);
}

// RDOS_Motivo  --------------------------------------------

async assignBreak(req: Request, res: Response) {
  try {
    console.log("params",req.params);
    console.log("body",req.body);
      const { rdosId, motivoPausaId } = req.params;
      const { dataHoraInicio = "00:00", dataHoraFim = "00:00" } = 
      Array.isArray(req.body) ? req.body[0] : req.body || {};
    
      const pausa = await this.rdosService.associarMotivos(
        rdosId, motivoPausaId, dataHoraInicio, dataHoraFim);

      res.status(200).json({ message: pausa });
  } catch (error: any) {
      res.status(500).json({ error: error.message });
  }
};

async unassignBreak(req: Request, res: Response) {
  const {rdosId, motivoPausaId } = req.params;
  await this.rdosService.removerMotivo(rdosId, motivoPausaId);
  res.status(204).send();
}

async getBreaksByRDOSId(req: Request, res: Response) {
  try {
    const { rdosId } = req.params;
    const associacao = await this.rdosService.buscarMotivo(rdosId);

    if (!associacao) {
      res.status(404).json({ message: 'Associação não encontrada' });
    }

    res.json(associacao);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async getAssociationsBreak(req: Request, res: Response) {
  try{
  const pausa =  await this.rdosService.buscarAssociacoesMotivo();
  res.json(pausa);
} catch (err:any) {
    console.error('Erro ao listar pausas:', err);
    res.status(500).json({ message: err.message });
//    next(err);
}
}

async updateBreaks(req: Request, res: Response) {
  const { rdosId, motivoPausaId } = req.params;
  const { dataHoraInicio = "00:00", dataHoraFim = "00:00" } = 
  Array.isArray(req.body) ? req.body[0] : req.body || {};
  console.log("data",dataHoraInicio)
  console.log("data2",dataHoraFim)
      
  const rdos = await this.rdosService.atualizarMotivo(rdosId, motivoPausaId, dataHoraInicio,dataHoraFim);
  if (!rdos) {
    res.status(404).json({ message: 'RDOS não encontrada' });
  }
  res.json(rdos);
}

async getSummaryById(req: Request, res: Response) {
  const { id } = req.params;
  try {
  const rdos = await this.rdosService.obterResumoPorId(id);
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

async getSummary(req: Request, res: Response) {
//  const { id } = req.params;
  try {
  const rdos = await this.rdosService.obterResumo();
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

async getCompleteById(req: Request, res: Response) {
  const { id } = req.params;
  console.log("cont")
  try {
  const rdos = await this.rdosService.obterCompletoPorId(id);
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


}

//export default new RDOSController();
