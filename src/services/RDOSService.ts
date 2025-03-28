import prisma from '../database/prismaClient.js';
import { RDOSRepository } from '../repositories/RDOSRepository.js';
import { RDOS } from '@prisma/client';

export class RDOSService {
  private rdosRepository: RDOSRepository;

  constructor() {
    this.rdosRepository = new RDOSRepository();
  }

  private async gerarNumeroSequencial(ano: number, tipo: string): Promise<string> {
    // Tenta encontrar o registro de sequencial para o ano e tipo
    let sequencial = await prisma.sequencial.findUnique({
      where: { ano_tipo: { ano, tipo } },
    });

    if (!sequencial) {
      // Se não existe, cria um novo registro com ultimoNumero = 1
      sequencial = await prisma.sequencial.create({
        data: { ano, tipo, ultimoNumero: 1 },
      });
      return `1/${ano}`;
    } else {
      // Se já existe, incrementa o ultimoNumero
      const novoSequencial = sequencial.ultimoNumero + 1;
      await prisma.sequencial.update({
        where: { ano_tipo: { ano, tipo } },
        data: { ultimoNumero: novoSequencial },
      });
      return `${novoSequencial}/${ano}`;
    }
  }

  async listar() {
    try {
      const rdoss = await this.rdosRepository.findAll();
      console.log('RDOSs encontradas:', rdoss); // Verifique o retorno do banco de dados
      return rdoss;
      } catch (error: any) {
         // Lançando erro em caso de falha ao listar as RDOS
         throw new Error('Erro ao listar RDOS: ' + error.message);
        }
  }

  async obterPorId(id: string) {
    try {
      const rdos = await this.rdosRepository.findById(id);
      if (!rdos) {
        throw new Error('RDOS não encontrada');
      }
      return rdos;
    } catch (error:any) {
      // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
      throw new Error('Erro ao obter RDOS por ID: ' + error.message);
    }
  }

  async criar(dados: Partial<RDOS> | Partial<RDOS>[]) {
      try {
        console.log('Dados recebidos para criação:', dados);
    
        if (Array.isArray(dados)) {
          // Criando múltiplas RDOS uma por uma
          const rdossCriadas = [];
          for (const rdos of dados) {
            const ano = new Date().getFullYear();
            const tipoSemDados = rdos.tipo || "";
            const numeroSequencial = await this.gerarNumeroSequencial(ano, tipoSemDados);
            rdos.numero = numeroSequencial;
            rdossCriadas.push(await this.rdosRepository.create(rdos));
          }
          return rdossCriadas; // Retorna um array de RDOS criadas
        }
    
        // Criando uma única rdos
        const ano = new Date().getFullYear();
        const tipoSemDados = dados.tipo || "";
        const numeroSequencial = await this.gerarNumeroSequencial(ano, tipoSemDados);
        dados.numero = numeroSequencial;
        const adjustedStatus = dados.status ==="Pendente"? "Aberto":dados.status
        const adjustedDados = {...dados, status: adjustedStatus }
        
        return await this.rdosRepository.create(adjustedDados);
      } catch (error: any) {
        throw new Error('Erro ao criar RDOS: ' + error.message);
      }
  }
    
  async atualizar(id: string, dados: Partial<RDOS>) {
    return await this.rdosRepository.update(id, dados);
  }

  async remover(id: string) {
    await this.rdosRepository.delete(id);
  }

// RDOS_Servico --------------------------------------------

async associarServico(rdosId:string, servicoId: string, atividades: any) {
  // Verifica se o serviço já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndServico(rdosId,servicoId);
  console.log("ex",existente)

  if (existente) {
      throw new Error('O serviço já está associado a este RDOS.');
  }

  //Tratamento de datas
  const registro = await this.rdosRepository.findById(rdosId);
  const somenteDia = registro.data
  const ajustarData = (dataBase: Date, horaMinuto: string) => {
    const [hora, minuto] = horaMinuto.split(":").map(Number);
    const dataAjustada = new Date(dataBase);
    dataAjustada.setUTCHours(hora, minuto, 0, 0); 
    return dataAjustada;
  };

  const atividadesAjustadas = atividades.map((atividade: any)=>{
    const dataInicioAjustada = atividade.dataHoraInicio ?
    ajustarData(somenteDia, atividade.dataHoraInicio) : 
    ajustarData(somenteDia, "00:01");
    const dataFimAjustada = atividade.dataHoraFim ? 
    ajustarData(somenteDia, atividade.dataHoraFim) : 
    ajustarData(somenteDia, "00:02");
    return {
      ...atividade,
      dataHoraInicio: dataInicioAjustada,
      dataHoraFim: dataFimAjustada,
    };
  });


  // Associa o serviço à RDOS
  await this.rdosRepository.criarAssociacao(rdosId,servicoId);
  // Chama a função que associa as atividades do serviço ao RDO
  const resultadoAtividades = await this.rdosRepository.associarRDOSServicoComAtividades(rdosId, servicoId, atividadesAjustadas);

  return {      
    message: 'Serviço associado com sucesso!',
    atividades: resultadoAtividades
  };
}

async removerServico(rdosId: string, servicoId: string) {
  await this.rdosRepository.excluirAssociacao(rdosId,servicoId);
  const resultadoAtividades = await this.rdosRepository.desassociarRDOSServicoComAtividades(rdosId, servicoId);
  return {      
    message: 'Serviço removido com sucesso!',
    atividades: resultadoAtividades
  };

}

async buscarServicos(rdosId: string) {
  return this.rdosRepository.findByRDOS(rdosId);
}

async buscarAssociacoes() {
  return this.rdosRepository.findAssociations();
}


// RDOS_Atividade --------------------------------------------

async associarAtividade(rdosId:string, atividadeId: string) {
  // Verifica se o serviço já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndAtividade(rdosId,atividadeId);

  if (existente) {
      throw new Error('A atividade já está associada a este RDOS.');
  }

  // Associa a atividade ao serviço
  await this.rdosRepository.criarAssociacaoAtividade(rdosId,atividadeId);

  return 'Atividade associada com sucesso!';
};

async removerAtividade(rdosId: string, atividadeId: string, servicoId: string) {
await this.rdosRepository.excluirAssociacaoAtividade(rdosId, atividadeId, servicoId);
}

async buscarAtividades(rdosId: string) {
return this.rdosRepository.findAtividadeByRDOS(rdosId);
}

async buscarAssociacoesAtividades() {
return this.rdosRepository.findAssociationsAtividades();
}

async atualizarAtividades(rdosId:string, 
  servicoId: string, atividadeId:string,
  dataHoraInicio: string, dataHoraFim: string) {

  //Tratamento de datas
  const registro = await this.rdosRepository.findById(rdosId);
  const somenteDia = registro.data
  const ajustarData = (dataBase: Date, horaMinuto: string) => {
    const [hora, minuto] = horaMinuto.split(":").map(Number);
    const dataAjustada = new Date(dataBase);
    dataAjustada.setUTCHours(hora, minuto, 0, 0); 
    return dataAjustada;
  };
  
  const dataInicioAjustada = ajustarData(somenteDia, dataHoraInicio);
  const dataFimAjustada = ajustarData(somenteDia, dataHoraFim);
  console.log("data",registro.data)
  console.log("data2",dataHoraInicio)
  console.log("data3",dataHoraFim)
  console.log("data4",dataInicioAjustada)
  console.log("data5",dataFimAjustada)


  // Associa pausa à RDOS
  await this.rdosRepository.updateAtividade(rdosId,
    servicoId, atividadeId,
    dataInicioAjustada, dataFimAjustada);
  
  return 'Atividade associada com sucesso!';
}

// RDOS_Equipamento --------------------------------------------

async associarEquipamento(rdosId:string, equipamentoId: string, quantidade:number) {
  // Verifica se o equipamento já está associado à RDOS
  const existente = await this.rdosRepository.findByRDOSAndEquipamento(rdosId,equipamentoId);

  if (existente) {
      throw new Error('O equipamento já está associado a este RDOS.');
  }

  // Associa o equipamento à RDOS
  await this.rdosRepository.criarAssociacaoEquipamento(rdosId, equipamentoId, quantidade);
  
  return 'Equipamento associado com sucesso!';
}

async removerEquipamento(rdosId: string, equipamentoId: string) {
await this.rdosRepository.excluirAssociacaoEquipamento(rdosId, equipamentoId);
return  'Equipamento removido com sucesso!';

}

async buscarEquipamentos(rdosId: string) {
return this.rdosRepository.findEquipamentoByRDOS(rdosId);
}

async buscarAssociacoesEquipamentos() {
return this.rdosRepository.findAssociationsEquipamento();
}

async atualizarEquipamentos(rdosId: string, equipamentoId: string, data:any) {
  return this.rdosRepository.updateEquipment(rdosId, equipamentoId, data);
}

// RDOS_MãodeObra --------------------------------------------

async associarMaodeObra(rdosId:string, maoDeObraId: string, quantidade:number) {
  // Verifica se mão de obra já está associada à RDOS
  const existente = await this.rdosRepository.findByRDOSAndMaodeObra(rdosId,maoDeObraId);

  if (existente) {
      throw new Error('Mão de obra já está associada a este RDOS.');
  }

  // Associa mão de obra à RDOS
  await this.rdosRepository.criarAssociacaoMaodeObra(rdosId, maoDeObraId, quantidade);
  
  return 'Mão de obra associada com sucesso!';
}

async removerMaodeObra(rdosId: string, maoDeObraId: string) {
  await this.rdosRepository.excluirAssociacaoMaodeObra(rdosId, maoDeObraId);
  return  'Mão de obra removida com sucesso!';
}

async buscarMaodeObra(rdosId: string) {
  return this.rdosRepository.findMaodeObraByRDOS(rdosId);
}

async buscarAssociacoesMaodeObra() {
  return this.rdosRepository.findAssociationsMaodeObra();
}

async atualizarMaodeObra(rdosId: string, maoDeObraId: string, data:any) {
  return this.rdosRepository.updateMaodeObra(rdosId, maoDeObraId, data);
} 

// RDOS_Motivos --------------------------------------------

async associarMotivos(rdosId:string, motivoPausaId: string,
  dataHoraInicio: string, dataHoraFim: string) {
  // Verifica se pausa já está associada à RDOS
  const existente = await this.rdosRepository.findByRDOSAndMotivo(rdosId,motivoPausaId);
  if (existente) {
      throw new Error('Pausa já está associada a este RDOS.');
  }

  //Tratamento de datas
  const registro = await this.rdosRepository.findById(rdosId);
  const somenteDia = registro.data
  const ajustarData = (dataBase: Date, horaMinuto: string) => {
    const dataFormatada = dataBase.toISOString().split("T")[0]; // Garante "YYYY-MM-DD"
    return new Date(`${dataFormatada}T${horaMinuto}:00.000Z`);
  };
  const dataInicioAjustada = ajustarData(somenteDia, dataHoraInicio);
  const dataFimAjustada = ajustarData(somenteDia, dataHoraFim);
  console.log("data",registro.data)
  console.log("data2",dataHoraInicio)
  console.log("data3",dataHoraFim)
  console.log("data4",dataInicioAjustada)
  console.log("data5",dataFimAjustada)


  // Associa pausa à RDOS
  await this.rdosRepository.criarAssociacaoMotivo(rdosId, motivoPausaId, dataInicioAjustada, dataFimAjustada);
  
  return 'Pausa associada com sucesso!';
}

async removerMotivo(rdosId: string, motivoPausaId: string) {
  await this.rdosRepository.excluirAssociacaoMotivo(rdosId, motivoPausaId);
  return  'Pausa removida com sucesso!';
}

async buscarMotivo(rdosId: string) {
  return this.rdosRepository.findMotivoByRDOS(rdosId);
}

async buscarAssociacoesMotivo() {
  return this.rdosRepository.findAssociationsMotivo();
}

async atualizarMotivo(rdosId: string, motivoPausaId: string,
  dataHoraInicio:string, dataHoraFim: string) {

  //Tratamento de datas
  const registro = await this.rdosRepository.findById(rdosId);
  const somenteDia = registro.data
  const ajustarData = (dataBase: Date, horaMinuto: string) => {
  const dataFormatada = dataBase.toISOString().split("T")[0]; // Garante "YYYY-MM-DD"
    return new Date(`${dataFormatada}T${horaMinuto}:00.000Z`);
  };
  const dataInicioAjustada = ajustarData(somenteDia, dataHoraInicio);
  const dataFimAjustada = ajustarData(somenteDia, dataHoraFim);

  return this.rdosRepository.updateMotivo(rdosId, motivoPausaId, dataInicioAjustada, dataFimAjustada);
} 

async obterResumoPorId(id: string) {
  try {
    const rdos = await this.rdosRepository.findRDOSListagem(id);
    if (!rdos) {
      throw new Error('RDOS não encontrada');
    }
    return rdos;
  } catch (error:any) {
    // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
    throw new Error('Erro ao obter RDOS por ID: ' + error.message);
  }
}

async obterResumo() {
  try {
    const rdos = await this.rdosRepository.findRDOSListagemGeral();
    if (!rdos) {
      throw new Error('RDOS não encontradas');
    }
    return rdos;
  } catch (error:any) {
    // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
    throw new Error('Erro ao obter RDOS: ' + error.message);
  }
}

async obterCompletoPorId(id: string) {
  try {
    console.log("cont")
    const rdos = await this.rdosRepository.findRDOSCompleto(id);
    if (!rdos) {
      throw new Error('RDOS não encontrada');
    }
    return rdos;
  } catch (error:any) {
    // Lançando erro caso a RDOS não seja encontrada ou outro erro ocorra
    throw new Error('Erro ao obter RDOS por ID: ' + error.message);
  }
}

async buscarAssociacoesComNome(id: string) {
  return this.rdosRepository.getAssociationsComNome(id);
}

}

export default new RDOSService();