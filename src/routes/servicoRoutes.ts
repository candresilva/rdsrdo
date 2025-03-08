import express from 'express';
import {ServicoController} from '../controllers/servicoController';  // Importando a instância do controlador

const router = express.Router();
const servicocontroller = ServicoController.getInstance();
console.log('ServicoController foi instanciado:', servicocontroller);


// Rotas para serviços
router.get('/v1/listar/servicos', servicocontroller.getAll.bind(servicocontroller));  // Rota para listar todos os serviços
router.get('/v1/listar/servicos/:id', servicocontroller.getById.bind(servicocontroller));  // Rota para buscar um serviço por ID
router.post('/v1/criar/servicos', servicocontroller.create.bind(servicocontroller));  // Rota para criar um novo serviço
router.put('/v1/editar/servicos/:id', servicocontroller.update.bind(servicocontroller));  // Rota para atualizar um serviço
router.delete('/v1/excluir/servicos/:id', servicocontroller.delete.bind(servicocontroller));  // Rota para excluir um serviço
// Rota para associar uma atividade a um serviço
router.post('/v1/associar/servicos/:servicoId/atividades/:atividadeId', (req, res, next) => {
    console.log('Rota de associação de atividade acessada');
    next();  // Chama o próximo middleware (o controlador)
}, servicocontroller.assignActivity.bind(servicocontroller));
// Rota para alternar status da associação entre uma atividade e um serviço
router.patch('/v1/associar/servicos/:servicoId/atividades/:atividadeId/alterar-status', 
    servicocontroller.toggleStatusAtividade.bind(servicocontroller));


export default router;
