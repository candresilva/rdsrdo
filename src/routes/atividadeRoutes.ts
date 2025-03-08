import express from 'express';
import {AtividadeController} from '../controllers/atividadeController';  // Importando a instância do controlador

const router = express.Router();
const atividadecontroller = AtividadeController.getInstance();
console.log('AtividadeController foi instanciado:', atividadecontroller);


// Rotas para atividades
router.get('/v1/listar/atividades', atividadecontroller.getAll.bind(atividadecontroller));  // Rota para listar todas as atividades
router.get('/v1/listar/atividades/:id', atividadecontroller.getById.bind(atividadecontroller));  // Rota para buscar uma atividade por ID
router.post('/v1/criar/atividades', atividadecontroller.create.bind(atividadecontroller));  // Rota para criar uma nova atividade
router.put('/v1/editar/atividades/:id', atividadecontroller.update.bind(atividadecontroller));  // Rota para atualizar uma atividade
router.delete('/v1/excluir/atividades/:id', atividadecontroller.delete.bind(atividadecontroller));  // Rota para excluir uma atividade

export default router;
