import express from 'express';
import AtividadeController from '../controllers/atividadeController';  // Importando a instância do controlador

const router = express.Router();
//const atividadecontroller = new AtividadeController();

// Rotas para atividades
router.get('/atividades', AtividadeController.getAll);  // Rota para listar todas as atividades
router.get('/atividades/:id', AtividadeController.getById);  // Rota para buscar uma atividade por ID
router.post('/atividades', AtividadeController.create);  // Rota para criar uma nova atividade
router.put('/atividades/:id', AtividadeController.update);  // Rota para atualizar uma atividade
router.delete('/atividades/:id', AtividadeController.delete);  // Rota para excluir uma atividade

export default router;
