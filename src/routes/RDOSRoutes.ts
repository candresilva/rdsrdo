import express from 'express';
import {RDOSController} from '../controllers/RDOSController';  // Importando a instância do controlador

const router = express.Router();
const rdoscontroller = RDOSController.getInstance();
console.log('RDOSController foi instanciado:', rdoscontroller);


// Rotas para rdoss
router.get('/v1/listar/rdos', rdoscontroller.getAll.bind(rdoscontroller));  // Rota para listar todas as RDOS's
router.get('/v1/listar/rdos/:id', rdoscontroller.getById.bind(rdoscontroller));  // Rota para buscar uma RDOS por ID
router.post('/v1/criar/rdos', rdoscontroller.create.bind(rdoscontroller));  // Rota para criar uma nova RDOS
router.put('/v1/editar/rdos/:id', rdoscontroller.update.bind(rdoscontroller));  // Rota para atualizar uma RDOS
router.delete('/v1/excluir/rdos/:id', rdoscontroller.delete.bind(rdoscontroller));  // Rota para excluir uma RDOS

// Rotas de RDOS_serviços
// Associar serviço a RDOS
router.post('/v1/associar/rdos/:rdosId/servicos/:servicoId', (req, res, next) => {
    console.log('Rota de associação de atividade acessada');
    next();  // Chama o próximo middleware (o controlador)
}, rdoscontroller.assignService.bind(rdoscontroller));
// Buscar serviços de um RDOS
router.get('/v1/associar/rdos/:rdosId/servicos/',rdoscontroller.getServicesByRDOSId.bind(rdoscontroller))
// Buscar associações serviço x RDOS
router.get('/v1/associar/rdos/servicos/',rdoscontroller.getAssociations.bind(rdoscontroller))
// Remover associação entre um serviço e um RDOS
router.delete('/v1/associar/rdos/:rdosId/servicos/:servicoId/excluir',rdoscontroller.unassignService.bind(rdoscontroller))


// Rotas de RDOS_atividades
// Associar atividade a RDOS
router.post('/v1/associar/rdos/:rdosId/atividades/:atividadeId', (req, res, next) => {
    console.log('Rota de associação de atividade acessada');
    next();  // Chama o próximo middleware (o controlador)
}, rdoscontroller.assignAtividade.bind(rdoscontroller));
// Buscar atividades de um RDOS
router.get('/v1/associar/rdos/:rdosId/atividades/',rdoscontroller.getActivitiesByRDOSId.bind(rdoscontroller))
// Buscar associações atividade x RDOS
router.get('/v1/associar/rdos/atividades/',rdoscontroller.getAssociationsAtividade.bind(rdoscontroller))
// Remover associação entre uma atividade e um RDOS
router.delete('/v1/associar/rdos/:rdosId/atividades/:atividadeId/excluir',rdoscontroller.unassignAtividade.bind(rdoscontroller))
// Editar data-hora dos equipamentos de um RDOS
router.put('/v1/associar/rdos/:rdosId/atividades/:atividadeId/editar',rdoscontroller.updateAtividade.bind(rdoscontroller))

// Rotas de RDOS_equipamentos
// Associar equipamento a RDOS
router.post('/v1/associar/rdos/:rdosId/equipamentos/:equipamentoId', rdoscontroller.assignEquipment.bind(rdoscontroller));
// Buscar equipamentos de um RDOS
router.get('/v1/associar/rdos/:rdosId/equipamentos/',rdoscontroller.getEquipmentsByRDOSId.bind(rdoscontroller))
// Buscar associações equipamento x RDOS
router.get('/v1/associar/rdos/equipamentos/',rdoscontroller.getAssociationsEquipment.bind(rdoscontroller))
// Remover associação entre um equipamento e um RDOS
router.delete('/v1/associar/rdos/:rdosId/equipamentos/:equipamentoId/excluir',rdoscontroller.unassignEquipment.bind(rdoscontroller))
// Editar quantidades dos equipamentos de um RDOS
router.put('/v1/associar/rdos/:rdosId/equipamentos/:equipamentoId/editar',rdoscontroller.updateEquipment.bind(rdoscontroller))

// Rotas de RDOS_maodeobra
// Associar mão de obra a RDOS
router.post('/v1/associar/rdos/:rdosId/maos-de-obra/:maoDeObraId', rdoscontroller.assignWorkforce.bind(rdoscontroller));
// Buscar mãos de obra de um RDOS
router.get('/v1/associar/rdos/:rdosId/maos-de-obra/',rdoscontroller.getWorkforceByRDOSId.bind(rdoscontroller))
// Buscar associações mãos de obra x RDOS
router.get('/v1/associar/rdos/maos-de-obra/',rdoscontroller.getAssociationsWorkforce.bind(rdoscontroller))
// Remover associação entre uma mão de obra e um RDOS
router.delete('/v1/associar/rdos/:rdosId/maos-de-obra/:maoDeObraId/excluir',rdoscontroller.unassignWorkforce.bind(rdoscontroller))
// Editar quantidades das mãos de obra de um RDOS
router.put('/v1/associar/rdos/:rdosId/maos-de-obra/:maoDeObraId/editar',rdoscontroller.updateWorforce.bind(rdoscontroller))

// Rotas de RDOS_motivosdePausa
// Associar pausa a RDOS
router.post('/v1/associar/rdos/:rdosId/motivos-de-pausa/:motivoDePausaId', rdoscontroller.assignBreak.bind(rdoscontroller));
// Buscar pausas de um RDOS
router.get('/v1/associar/rdos/:rdosId/motivos-de-pausa/',rdoscontroller.getBreaksByRDOSId.bind(rdoscontroller))
// Buscar associações pausa x RDOS
router.get('/v1/associar/rdos/motivos-de-pausa/',rdoscontroller.getAssociationsBreak.bind(rdoscontroller))
// Remover associação entre uma pausa e um RDOS
router.delete('/v1/associar/rdos/:rdosId/motivos-de-pausa/:motivoDePausaId/excluir',rdoscontroller.unassignBreak.bind(rdoscontroller))
// Editar datas de início e fim das pausas de um RDOS
router.put('/v1/associar/rdos/:rdosId/motivos-de-pausa/:motivoDePausaId/editar',rdoscontroller.updateBreaks.bind(rdoscontroller))

export default router;
